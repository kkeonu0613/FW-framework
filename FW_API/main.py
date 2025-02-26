from fastapi import FastAPI, Depends, File, UploadFile, HTTPException, Query
from sqlalchemy import create_engine, Column, String, Integer, ForeignKey, Text, Boolean
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from fastapi.responses import JSONResponse 
from sqlalchemy.orm import sessionmaker
from sqlalchemy.orm import Session
from sqlalchemy import DateTime
from typing import List, Optional
from pydantic import BaseModel
from datetime import datetime
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import LargeBinary
from sqlalchemy import create_engine
from pathlib import Path  # Path 임포트
import shutil  # shutil 임포트


#데이터 베이스 연결 // 서버이름:비밀번호@아이피:포트:데이터베이스이름
DATABASE_URL = "postgresql://postgres:interx%40504@10.10.54.99:25432/kkw"
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # "*"는 모든 도메인에서 요청을 허용
    allow_credentials=True,
    allow_methods=["*"],  # 모든 HTTP 메서드 허용
    allow_headers=["*"],  # 모든 헤더 허용
)
# SQLAlchemy 설정
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# 데이터베이스 세션을 얻는 함수
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# 사업부 데이터 조회하는 함수들
class Department(Base):
    __tablename__ = 'Department'
    DEPARTMENT_NAME = Column("DEPARTMENT_NAME",Integer, primary_key=True, index=True)

    product_categories = relationship("product_category", back_populates="department")
    product_tbls = relationship("product_tbl", back_populates="department")
# 사업부 데이터 조회 모델
class DepartmentOut(BaseModel):
    DEPARTMENT_NAME: str

    class Config:
        from_attributes = True
# Department 테이블에서 모든 사업부 정보 데이터를 조회하는 API
@app.get("/departments", response_model=List[DepartmentOut])
def get_departments(db: Session = Depends(get_db)):
    return db.query(Department).all()

# 품목분류정보 조회하는 함수들 
class product_category(Base):
    __tablename__ = 'product_category'
    category_name = Column(String, primary_key=True, index=True)
    category_path = Column(String, nullable=False)
    parent_id = Column(Integer, nullable=True)
    DEPARTMENT_NAME = Column(String, ForeignKey("Department.DEPARTMENT_NAME"))
    description = Column(Text, nullable=True)

    department = relationship("Department", back_populates="product_categories")

# 품목분류정보 조회하는 함수들
class product_categoryOut(BaseModel):
    category_name: str
    category_path: str
    parent_id: Optional[int]
    DEPARTMENT_NAME: str
    description: Optional[str]

    class Config:
        from_attributes = True
#product_category 테이블에서 모든 품목분류정보 데이터를 조회하는 API
@app.get("/product_categories", response_model=List[product_categoryOut])
def get_product_categories(db: Session = Depends(get_db)):
    return db.query(product_category).all()

#제품군 데이터 조회하는 함수들
class product_tbl(Base):
    __tablename__ = 'product_tbl'
    pd_code = Column(String, primary_key=True, index=True)
    pd_name = Column(String, nullable=False)
    DEPARTMENT_NAME = Column(String, ForeignKey("Department.DEPARTMENT_NAME"))
    description = Column(Text, nullable=True)
    pd_status = Column(Boolean, nullable=False)
    pd_maketime = Column(DateTime(timezone=True), default=datetime.utcnow)
    pd_moditime = Column(DateTime(timezone=True), default=datetime.utcnow)
    pd_maker = Column(Integer, nullable=False)
    pd_modi = Column(Integer, nullable=False)
    
    # back_populates 추가 및 overlaps 사용
    department = relationship("Department", back_populates="product_tbls", overlaps="department,product_tbls")
    department = relationship("Department", viewonly=True)
#제품군 데이터 조회 모델
class product_tblOut(BaseModel):
    pd_code: str
    pd_name: str
    DEPARTMENT_NAME: str
    description: Optional[str]
    pd_status: bool

    class Config:
        from_attributes = True

#product_tbl 테이블에서 모든 제품군 데이터를 조회하는 API
@app.get("/product_tbls", response_model=List[product_tblOut])
def get_product_tbls(DEPARTMENT_NAME: str = Query(None), db: Session = Depends(get_db)):
    print(DEPARTMENT_NAME)
    if DEPARTMENT_NAME:
        return db.query(product_tbl).filter(product_tbl.DEPARTMENT_NAME == DEPARTMENT_NAME).all()
    return db.query(product_tbl).all()

class Product(BaseModel):
    pd_code: str
    pd_name: str
    description: str
    pd_status: bool
    DEPARTMENT_NAME: str = "제1사업부"
    pd_maketime: datetime = datetime.utcnow()  # 기본값으로 현재 시간
    pd_moditime: datetime = datetime.utcnow()  # 기본값으로 현재 시간
    pd_maker: Optional[int] = 1  # 기본값 1
    pd_modi: Optional[int] = 1   # 기본값 1

class ProductModel(Base):
    __tablename__ = 'product_tbl'
    __table_args__ = {'extend_existing': True} 
    pd_code = Column(String, primary_key=True, index=True)
    pd_name = Column(String, nullable=False)
    DEPARTMENT_NAME = Column(String, ForeignKey("Department.DEPARTMENT_NAME"), default="제1사업부")  # 기본값 설정
    description = Column(Text, nullable=True)
    pd_status = Column(Boolean, nullable=False)
    pd_maketime = Column(DateTime(timezone=True), default=datetime.utcnow)
    pd_moditime = Column(DateTime(timezone=True), default=datetime.utcnow)
    pd_maker = Column(Integer, nullable=False, default=1)
    pd_modi = Column(Integer, nullable=False, default=1)
    
    department = relationship("Department")

# 응답 모델 (Pydantic)
class ProductOut(BaseModel):
    pd_code: str
    pd_name: str
    DEPARTMENT_NAME: str
    description: Optional[str]
    pd_status: bool

    class Config:
        from_attributes = True

@app.post("/product_tbls")
def create_product(product: Product, db: Session = Depends(get_db)):
    db_product = ProductModel(
        pd_code=product.pd_code,
        pd_name=product.pd_name,
        description=product.description,
        pd_status=product.pd_status,
        DEPARTMENT_NAME=product.DEPARTMENT_NAME,  # 여기서 기본값 사용
        pd_maker=product.pd_maker,
        pd_modi=product.pd_modi,
    )
    db.add(db_product)
    db.commit()
    db.refresh(db_product)
    return db_product

class ProductDeleteRequest(BaseModel):
    pd_codes: List[str]



@app.delete("/delete_products")
async def delete_products(request: ProductDeleteRequest, db: Session = Depends(get_db)):
    try:
        print("삭제 요청 제품 코드:", request.pd_codes)

        # 요청이 올바르게 받아졌는지 확인
        if not request.pd_codes or not isinstance(request.pd_codes, list):
            print("요청 데이터 형식 오류")
            raise HTTPException(status_code=400, detail="잘못된 요청 형식")

        # 존재하는 제품 찾기
        products_to_delete = db.query(ProductModel).filter(ProductModel.pd_code.in_(request.pd_codes)).all()
        print("삭제 대상 제품:", products_to_delete)

        if not products_to_delete:
            print("해당 제품이 존재하지 않음:", request.pd_codes)
            raise HTTPException(status_code=404, detail="삭제할 제품을 찾을 수 없습니다.")

        # 제품 삭제
        for product in products_to_delete:
            db.delete(product)

        db.commit()
        print("삭제 완료")
        return {"message": "제품이 성공적으로 삭제되었습니다."}
    
    except Exception as e:
        db.rollback()
        print("삭제 중 오류 발생:", str(e))
        raise HTTPException(status_code=500, detail=str(e))


#품목 데이터 조회하는 함수들
class item_tbl(Base):
    __tablename__ = 'item_tbl'
    
    item_code = Column(String, primary_key=True, index=True)
    item_name = Column(String, nullable=False)
    category_name = Column(String, nullable=False)
    pd_code = Column(String, nullable=True)
    eo_number = Column(String, nullable=True)
    eo_date = Column(DateTime(timezone=True), default=datetime.utcnow)
    client = Column(String, nullable=True)
    item_material = Column(String, nullable=True)
    item_dimensions = Column(String, nullable=True)
    item_weight = Column(String, nullable=True)
    item_images = Column(String, nullable=True)
    description = Column(Text, nullable=True)
    item_status = Column(Boolean, nullable=True)
    item_maketime = Column(DateTime(timezone=True), default=datetime.utcnow)
    item_moditime = Column(DateTime(timezone=True), default=datetime.utcnow)
    item_maker = Column(Integer, nullable=False)
    item_modi = Column(Integer, nullable=False)

class item_tblOut(BaseModel):
    item_code: str
    item_name: str
    category_name: str
    pd_code: Optional[str] = None
    pd_name: Optional[str] = None
    eo_number: Optional[str] = None
    eo_date: Optional[datetime] = None
    client: Optional[str] = None
    item_material: Optional[str] = None
    item_dimensions: Optional[str] = None
    item_weight: Optional[str] = None
    item_images: Optional[str] = None
    description: Optional[str] = None
    item_status: bool

@app.get("/item_tbls", response_model=List[item_tblOut])
def get_item_tbls(db: Session = Depends(get_db)):
    result = db.query(item_tbl, product_tbl).join(product_tbl, item_tbl.pd_code == product_tbl.pd_code).all()
    
    items = [
        item_tblOut(
            item_code=row[0].item_code,  # item_tbl에서 item_code
            item_name=row[0].item_name,  # item_tbl에서 item_name
            category_name=row[0].category_name,  # item_tbl에서 category_name
            pd_code=row[0].pd_code,  # item_tbl에서 pd_code
            pd_name=row[1].pd_name,  # product_tbl에서 pd_name
            eo_number=row[0].eo_number,  # item_tbl에서 eo_number
            eo_date=row[0].eo_date,  # item_tbl에서 eo_date
            client=row[0].client,  # item_tbl에서 client
            item_material=row[0].item_material,  # item_tbl에서 item_material
            item_dimensions=row[0].item_dimensions,  # item_tbl에서 item_dimensions
            item_weight=row[0].item_weight,  # item_tbl에서 item_weight
            item_images=row[0].item_images, 
            description=row[0].description,  # item_tbl에서 description
            item_status=row[0].item_status,  # item_tbl에서 item_status
        )
        for row in result
    ]

    return items

class ItemCreateRequest(BaseModel):
    item_code: str
    item_name: str
    category_name: str
    pd_code: str
    eo_number: str
    eo_date: str  # 날짜 문자열을 그대로 받음
    client: str
    item_material: str
    item_dimensions: str
    item_weight: str
    description: str
    item_status: bool
    item_images: Optional[str] = None  # 이미지 경로로 받기

    class Config:
        from_attributes = True
        


# 이미지 업로드 엔드포인트
@app.post("/upload_image")
async def upload_image(file: UploadFile = File(...)):
    # 서버 내 저장 경로 설정 (절대 경로로 설정)
    upload_dir = Path("C:/Users/USER/OneDrive/Desktop/김건우/react_test/FW_test/public/assets/uploads")
    upload_dir.mkdir(parents=True, exist_ok=True)  # 디렉토리가 없으면 생성

    # 파일 저장 경로
    file_path = upload_dir / file.filename

    # 파일 저장
    with file_path.open("wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    
    return {"filename": file.filename, "filePath": str(file_path)}


@app.post("/item_tbls", response_model=item_tblOut)
async def create_item_tbl(
    item: ItemCreateRequest, db: Session = Depends(get_db)
):
    current_time = datetime.utcnow()

    # 이미지 경로를 처리하고 item_tbl에 데이터 추가
    item_data = item_tbl(
        item_code=item.item_code,
        item_name=item.item_name,
        category_name=item.category_name,
        pd_code=item.pd_code,
        eo_number=item.eo_number,
        eo_date=item.eo_date,  # 문자열로 받은 날짜를 처리할 때 변환 필요
        client=item.client,
        item_material=item.item_material,
        item_dimensions=item.item_dimensions,
        item_weight=item.item_weight,
        description=item.description,
        item_status=item.item_status,
        item_maketime=current_time,
        item_moditime=current_time,
        item_maker=1,  # 임시로 공장장 ID
        item_modi=1,   # 임시로 수정자 ID
        item_images=item.item_images,  # 이미지 경로 저장
    )

    db.add(item_data)
    db.commit()
    db.refresh(item_data)

    return item_data

# 삭제 요청을 받을 모델
class ItemDeleteRequest(BaseModel):
    item_codes: List[str]

# 삭제 API 엔드포인트
@app.delete("/delete_items")
async def delete_items(request: ItemDeleteRequest, db: Session = Depends(get_db)):
    try:
        print("삭제 요청 품목 코드:", request.item_codes)

        # 요청이 올바르게 받아졌는지 확인
        if not request.item_codes or not isinstance(request.item_codes, list):
            print("요청 데이터 형식 오류")
            raise HTTPException(status_code=400, detail="잘못된 요청 형식")

        # 존재하는 품목 찾기
        items_to_delete = db.query(item_tbl).filter(item_tbl.item_code.in_(request.item_codes)).all()
        print("삭제 대상 품목:", items_to_delete)

        if not items_to_delete:
            print("해당 품목이 존재하지 않음:", request.item_codes)
            raise HTTPException(status_code=404, detail="삭제할 품목을 찾을 수 없습니다.")

        # 품목 삭제
        for item in items_to_delete:
            db.delete(item)

        db.commit()
        print("삭제 완료")
        return {"message": "품목이 성공적으로 삭제되었습니다."}
    
    except Exception as e:
        db.rollback()
        print("삭제 중 오류 발생:", str(e))
        raise HTTPException(status_code=500, detail=str(e))

#공장 데이터 조회하는 함수들
class factory_tbl(Base):
    __tablename__ = 'factory_tbl'
    ft_code = Column(String, primary_key=True, index=True)
    DEPARTMENT_NAME = Column(String, ForeignKey("Department.DEPARTMENT_NAME"))
    ft_name = Column(String, nullable=False)
    description = Column(Text, nullable=True)
    ft_status = Column(Boolean, nullable=False)
    ft_maketime = Column(DateTime(timezone=False), default=datetime.utcnow)
    ft_moditime = Column(DateTime(timezone=False), default=datetime.utcnow)
    ft_maker = Column(Integer, nullable=False)
    ft_modi = Column(Integer, nullable=False)
    

    department = relationship("Department")
#공장장 데이터 조회 모델
class factory_tblOut(BaseModel):
    ft_code: str
    ft_name: str
    DEPARTMENT_NAME: str
    description: Optional[str]
    ft_status: bool

    class Config:
        from_attributes = True
#factory_tbl 테이블에서 모든 제품군 데이터를 조회하는 API
@app.get("/factory_tbls", response_model=List[factory_tblOut])
def get_factory_tbls(db: Session = Depends(get_db)):
    return db.query(factory_tbl).all()


@app.post("/factory_tbls", response_model=factory_tblOut)
def create_factory_tbl(factory: factory_tblOut, db: Session = Depends(get_db)):
    current_time = datetime.utcnow()
    new_factory = factory_tbl(
        ft_code=factory.ft_code,
        ft_name=factory.ft_name,
        description=factory.description,
        ft_status=factory.ft_status,
        DEPARTMENT_NAME=factory.DEPARTMENT_NAME,
        ft_maker=1,
        ft_modi=1,
        ft_maketime=current_time,
        ft_moditime=current_time
    )

    db.add(new_factory)
    db.commit()
    db.refresh(new_factory)

    return new_factory

#라인 데이터 조회하는 함수들
class line_tbl(Base):
    __tablename__ = 'line_tbl'
    li_code = Column(String, primary_key=True, index=True)
    ft_code = Column(String, index=True)
    DEPARTMENT_NAME = Column(String, ForeignKey("Department.DEPARTMENT_NAME"))
    li_name = Column(String, nullable=False)
    description = Column(Text, nullable=True)
    li_status = Column(Boolean, nullable=False)
    li_maketime = Column(DateTime(timezone=False), default=datetime.utcnow)
    li_moditime = Column(DateTime(timezone=False), default=datetime.utcnow)
    li_maker = Column(Integer, nullable=False)
    li_modi = Column(Integer, nullable=False)
    pc_code = Column(String, index=True)
    

    department = relationship("Department")
#라인 데이터 조회 모델
class line_tblOut(BaseModel):
    li_code: str
    ft_code: str
    li_name: str
    DEPARTMENT_NAME: str
    description: Optional[str]
    li_status: bool
    pc_code: str

    class Config:
        from_attributes = True
class process_with_line_tblOut(line_tblOut):
    pc_name: Optional[str]  # process_tbl에서 가져올 pc_name 필드 추가
    process_department_name: Optional[str]  # process_tbl에서 가져올 DEPARTMENT_NAME 필드 추가

    class Config:
        from_attributes = True


#line_tbl 테이블에서 모든 제품군 데이터를 조회하는 API
@app.get("/line_tbls", response_model=List[process_with_line_tblOut])
def get_line_tbls(db: Session = Depends(get_db)):
    results = (
        db.query(line_tbl, process_tbl)  # line_tbl과 process_tbl을 조인
        .join(process_tbl, line_tbl.pc_code == process_tbl.pc_code)  # pc_code로 조인
        .all()
    )

    return [
        process_with_line_tblOut(
            li_code=l.li_code,
            ft_code=l.ft_code,
            li_name=l.li_name,
            DEPARTMENT_NAME=l.DEPARTMENT_NAME,
            description=l.description,
            li_status=l.li_status,
            pc_code=l.pc_code,
            pc_name=p.pc_name,  # process_tbl에서 pc_name을 가져옴
            process_department_name=p.DEPARTMENT_NAME  # process_tbl에서 DEPARTMENT_NAME을 가져옴
        )
        for l, p in results  # JOIN 결과를 언팩킹하여 각 테이블의 데이터를 매핑
    ]


#공정 테이블 데이터 조회회
class process_tbl(Base):
    __tablename__ = 'process_tbl'
    pc_code = Column(String, primary_key=True, index=True)
    pc_name = Column(String, nullable=True)
    DEPARTMENT_NAME = Column(String, ForeignKey("Department.DEPARTMENT_NAME"))
    eq_code = Column(String, nullable=False)
    description = Column(Text, nullable=True)
    pc_status = Column(Boolean, nullable=False)
    pc_maketime = Column(DateTime(timezone=True), default=datetime.utcnow)
    pc_moditime = Column(DateTime(timezone=True), default=datetime.utcnow)
    pc_maker = Column(Integer, nullable=False)
    pc_modi = Column(Integer, nullable=False)
    

    department = relationship("Department")

#공정 데이터 조회 모델
class process_tblOut(BaseModel):
    pc_code: str
    pc_name: str
    DEPARTMENT_NAME: str
    eq_code: str
    description: Optional[str]
    pc_status: bool

    class Config:
        from_attributes = True
class process_with_equipment_tblOut(process_tblOut):
    eq_type: Optional[str]
    eq_name: Optional[str]
    ft_code: Optional[str]
    eq_images: Optional[str]

    class Config:
        from_attributes = True
        
#process_tbl 테이블에서 모든 제품군 데이터를 조회하는 API
@app.get("/process_tbls", response_model=List[process_with_equipment_tblOut])
def get_process_tbls(db: Session = Depends(get_db)):
    # process_tbl을 equipment_tbl, factory_tbl과 JOIN하여 조회
    results = (
        db.query(process_tbl, equipment_tbl, factory_tbl)
        .join(equipment_tbl, process_tbl.eq_code == equipment_tbl.eq_code)  # 설비 테이블 조인
        .join(factory_tbl, equipment_tbl.ft_code == factory_tbl.ft_code)  # 공장 테이블 조인
        .all()
    )

    return [
        process_with_equipment_tblOut(
            pc_code=p.pc_code,
            pc_name=p.pc_name,
            DEPARTMENT_NAME=p.DEPARTMENT_NAME,
            eq_code=p.eq_code,
            description=p.description,
            pc_status=p.pc_status,
            eq_type=e.eq_type,
            eq_name=e.eq_name,
            ft_code=e.ft_code,
            eq_images=e.eq_images
        )
        for p, e, f in results  # JOIN 결과를 언패킹하여 각 테이블의 데이터를 매핑
    ]

#설비 데이터 조회하는 함수들
class equipment_tbl(Base):
    __tablename__ = 'equipment_tbl'
    eq_code = Column(String, primary_key=True, index=True)
    ft_code = Column(String, nullable=False)
    md_code = Column(String, nullable=False)
    eq_type = Column(String, nullable=True)
    eq_name = Column(String, nullable=True)
    eq_make = Column(String, nullable=True)
    eq_supplier = Column(String, nullable=True)
    eq_model = Column(String, nullable=True)
    eq_date = Column(DateTime(timezone=True), default=datetime.utcnow)
    eq_images = Column(LargeBinary, nullable=True)
    ass_file = Column(LargeBinary, nullable=True)
    description = Column(Text, nullable=True)
    eq_status = Column(Boolean, nullable=True)
    eq_maketime = Column(DateTime(timezone=False), default=datetime.utcnow)
    eq_moditime = Column(DateTime(timezone=False), default=datetime.utcnow)
    eq_maker = Column(Integer, nullable=False)
    eq_modi = Column(Integer, nullable=False)
    
#설비 데이터 조회 모델
class equipment_tblOut(BaseModel):
    eq_code: str
    ft_code: str
    md_code: str
    eq_type: str
    eq_name: Optional[str]
    eq_make: Optional[str]
    eq_model: Optional[str]
    eq_supplier: Optional[str]
    eq_date: Optional[datetime] = None
    eq_images: Optional[str]
    ass_file: Optional[str]
    description: Optional[str]
    eq_status: bool

    class Config:
        from_attributes = True
class equipment_with_mold_tblOut(equipment_tblOut):
    md_tool_name: Optional[str]
    md_tool_number: Optional[str]
    md_images: Optional[str]

    class Config:
        from_attributes = True

@app.get("/equipment_tbls", response_model=List[equipment_with_mold_tblOut])
def get_equipment_tbls_with_mold(db: Session = Depends(get_db)):
    # LEFT OUTER JOIN을 사용하여 mold_tbl 데이터가 없더라도 equipment_tbl 데이터 조회 가능
    results = db.query(equipment_tbl, mold_tbl).outerjoin(mold_tbl, equipment_tbl.md_code == mold_tbl.md_code).all()

    return [
        equipment_with_mold_tblOut(
            eq_code=e.eq_code,
            ft_code=e.ft_code,
            md_code=e.md_code if e.md_code else None,
            eq_type=e.eq_type,
            eq_name=e.eq_name,
            eq_make=e.eq_make,
            eq_model=e.eq_model,
            eq_supplier=e.eq_supplier,
            eq_date=e.eq_date,
            eq_images=e.eq_images,
            ass_file=e.ass_file,
            description=e.description,
            eq_status=e.eq_status,
            md_tool_name=m.md_tool_name if m else None,
            md_tool_number=m.md_tool_number if m else None,
            md_images=m.md_images if m else None,
        )
        for e, m in results  # 결과가 (equipment_tbl, mold_tbl) 튜플 형태이므로 unpacking
    ]

#금형 데이터 조회하는 함수들
class mold_tbl(Base):
    __tablename__ = 'mold_tbl'
    md_code = Column(String, primary_key=True, index=True)
    ft_code = Column(String, index=True)
    item_code = Column(String, nullable=False)
    md_tool_name = Column(String, nullable=True)
    md_tool_number = Column(String, nullable=True)
    md_depart = Column(String, nullable=True)
    md_images = Column(LargeBinary, nullable=True)
    description = Column(Text, nullable=True)
    md_status = Column(Boolean, nullable=True)
    md_maketime = Column(DateTime(timezone=False), default=datetime.utcnow)
    md_moditime = Column(DateTime(timezone=False), default=datetime.utcnow)
    md_maker = Column(Integer, nullable=False)
    md_modi = Column(Integer, nullable=False)
    

#금형 데이터 조회 모델
class mold_tblOut(BaseModel):
    md_code: str
    ft_code: str
    item_code: Optional[str] = None
    md_tool_name: Optional[str]
    md_tool_number: Optional[str] = None
    md_depart: Optional[str] = None
    md_images: Optional[str] = None
    description: Optional[str] = None
    md_status: bool
    class Config:
        from_attributes = True
class mold_with_item_tblOut(mold_tblOut):
    item: item_tblOut  # item_tbl에서 가져온 데이터를 포함
    pd_name: str
    class Config:
        from_attributes = True

@app.get("/mold_tbls", response_model=List[mold_with_item_tblOut])
def get_mold_tbls(db: Session = Depends(get_db)):
    # mold_tbl, item_tbl, product_tbl을 조인하여 필요한 데이터 가져오기
    try:
        result = db.query(mold_tbl, item_tbl, product_tbl).\
            join(item_tbl, mold_tbl.item_code == item_tbl.item_code).\
            join(product_tbl, item_tbl.pd_code == product_tbl.pd_code).all()
        
        molds = [
            mold_with_item_tblOut(
                md_code=row[0].md_code,
                ft_code=row[0].ft_code,
                item_code=row[0].item_code,
                md_tool_name=row[0].md_tool_name,
                md_tool_number=row[0].md_tool_number,
                md_depart=row[0].md_depart,
                md_images=row[0].md_images,
                description=row[0].description,
                md_status=row[0].md_status,
                item=item_tblOut(
                    item_code=row[1].item_code,
                    item_name=row[1].item_name,
                    category_name=row[1].category_name,
                    pd_code=row[1].pd_code,
                    item_images=row[1].item_images,
                    item_status=row[1].item_status
                ),
                pd_name=row[2].pd_name  # product_tbl에서 가져온 pd_name
            )
            for row in result
        ]

        return molds
    
    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail=str(e))

    # result = db.query(mold_tbl, item_tbl, product_tbl).\
    #     join(item_tbl, mold_tbl.item_code == item_tbl.item_code).\
    #     join(product_tbl, item_tbl.pd_code == product_tbl.pd_code).all()

    # molds = [
    #     mold_with_item_tblOut(
    #         md_code=row[0].md_code,
    #         ft_code=row[0].ft_code,
    #         item_code=row[0].item_code,
    #         md_tool_name=row[0].md_tool_name,
    #         md_tool_number=row[0].md_tool_number,
    #         md_depart=row[0].md_depart,
    #         md_images=row[0].md_images,
    #         description=row[0].description,
    #         md_status=row[0].md_status,
    #         item=item_tblOut(
    #             item_code=row[1].item_code,
    #             item_name=row[1].item_name,
    #             category_name=row[1].category_name,
    #             pd_code=row[1].pd_code,
    #             item_images=row[1].item_images,
    #             item_status=row[1].item_status
    #         ),
    #         pd_name=row[2].pd_name  # product_tbl에서 가져온 pd_name
    #     )
    #     for row in result
    # ]

    # return molds

    