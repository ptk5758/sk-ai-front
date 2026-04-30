CREATE TABLE users (
    id BIGSERIAL PRIMARY KEY,              -- 유저 고유 ID
    email VARCHAR(255) NOT NULL UNIQUE,    -- 이메일 (로그인 ID)
    password_hash TEXT NOT NULL,           -- 비밀번호 해시
    username VARCHAR(100) NOT NULL,        -- 사용자 이름

    is_active BOOLEAN DEFAULT TRUE,        -- 활성 여부
    is_admin BOOLEAN DEFAULT FALSE,        -- 관리자 여부

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- 생성일
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP  -- 수정일
);