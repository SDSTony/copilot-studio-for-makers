# HILT(Human-in-the-Loop) 프로세스 구축 방법

## Human-in-the-Loop(HILT)란?

> 에이전트가 특정 작업을 수행하기 전에 **사람의 확인(승인)을 받는 프로세스**를 구축하는 방법을 소개합니다.

## 방법 1: 자체 커넥터(Built-in Connector) 활용

### Copilot Studio에서 제공되는 승인 커넥터 소개
### 승인 흐름 설계
### 장단점

## 방법 2: Adaptive Card로 커스텀 확인 UI 구현 (Sync)

### Adaptive Card 소개
### 기존 실습 흐름을 Adaptive Card 기반으로 변경
### 사용자에게 확인 요청 → 승인/거절 처리
### 장단점

## 방법 3: Agent Flow를 활용한 비동기(Async) HILT

### Sync 방식의 한계
### Agent Flow로 비동기 승인 프로세스 구현
### 승인 완료 후 에이전트에 결과 전달
### 장단점

## Sync vs Async 비교

| 구분 | Sync (동기) | Async (비동기) |
|---|---|---|
| 대기 방식 | 사용자가 대화 내에서 즉시 응답 | 별도 채널(이메일, Teams 등)로 승인 |
| 적합한 케이스 | 즉각적인 확인이 필요한 경우 | 승인에 시간이 걸리는 경우 |
| 구현 방법 | Adaptive Card | Agent Flow |

## 실습

### 실습 목표
### 실습 단계
### 실습 결과 확인

## 참고문헌


