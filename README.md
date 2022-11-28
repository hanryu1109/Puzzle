# 🧩 Slider Puzzle

최단 경로 알고리즘을 시각화한 3\*3 Puzzle 웹게임입니다.

(\* 3\*3 Puzzle 은 그림맞추기 퍼즐입니다. 빈칸이 하나있고, 퍼즐을 하나씩 옮겨가며 완성된 그림으로 맞추는 게임입니다.)

배포 링크: https://slider-puzzle.co
(시연영상)

<br />

## ❓ Motivation

특정 알고리즘을 이해하고 해당 알고리즘에 관한 문제를 푸는 것은 제게 너무 어려운 과제였습니다. 문제 해결 능력을 키우고자 알고리즘 공부를 시작했으나 알고리즘이 이해가 되지 않았고 재미없었습니다. 알고리즘을 좀 더 쉽게 배울 수 없을까 재미있게 공부할 수 없을까 고민하다가 알고리즘 문제를 게임처럼 풀어내는 프로젝트를 진행하면 좋겠다 싶어 이번 프로젝트를 기획하게 되었습니다.

<br />

## 🔥 Challenges

### 1. 3\*3 퍼즐 해결 가능 여부 로직

3\*3 퍼즐에서 풀 수 없는 경우가 존재합니다. 따라서 해결 유무를 판단하는 solvable 조건을 이해한 후 해당 로직을 구현했습니다.

<br>

**문제 상황**

완성된 상태를 [1, 2, 3, 4, 5, 6, 7, 8, 0] 이라고 가정할 때,

처음 상태 [1, 2, 3, 4, 5, 6, 8, 7, 0] 와 같은 경우는 ➡️ 완성된 상태인 [1, 2, 3, 4, 5, 6, 7, 8, 0] 으로 절대 이동할 수 없습니다.

따라서 [1, 2, 3, 4, 5, 6, 8, 7, 0] 상태는 3\*3 퍼즐의 풀 수 없는 경우입니다. (이와 같이 풀 수 없는 경우는 매우 많습니다.)

<br>

**해결 방법**

3\*3 퍼즐에서 빈 칸(0)이 아닌 숫자들을 일렬로 나열했을 때 **역전 카운트**가 **짝수**이면 해당 상태는 완성된 상태([1, 2, 3, 4, 5, 6, 7, 8, 0])로 이동 가능합니다.

- 퍼즐을 셔플 ➡️ 셔플된 상태에서 0을 제외한 나머지 숫자를 일렬로 나열 ➡️ 역전 카운트 측정 ➡️ 역전 카운트가 짝수면 true 반환
- 역전 카운트가 홀수면 다시 퍼즐을 셔플하여 true 반환할 때까지 위의 단계 반복

- 역전 카운트 계산 방법

  - (3\*3 퍼즐(총 9개 퍼즐)에서 1개의 퍼즐을 타일이라고 부릅니다.)
  - 하나의 타일을 기준으로 오른쪽에 자신보다 작은 수가 하나씩 있을 때마다 역전 카운트는 1씩 올라갑니다.

<details>
<summary><b>예시 1(풀 수 없는 경우)</b></summary>

- 3\*3 퍼즐 상태: [1, 2, 3, 4, 5, 6, 8, 7](0은 역전 카운트를 셀 때 제외 합니다)
  - 1 타일은 자신을 기준으로 오른쪽에 자신(1)보다 작은 수가 없습니다. (총 역전 카운트: 0)
  - 2 타일은 자신을 기준으로 오른쪽에 자신(2)보다 작은 수가 없습니다. (총 역전 카운트: 0)
  - 3 타일은 자신을 기준으로 오른쪽에 자신(3)보다 작은 수가 없습니다. (총 역전 카운트: 0)
  - 4 타일은 자신을 기준으로 오른쪽에 자신(4)보다 작은 수가 없습니다. (총 역전 카운트: 0)
  - 5 타일은 자신을 기준으로 오른쪽에 자신(5)보다 작은 수가 없습니다. (총 역전 카운트: 0)
  - 6 타일은 자신을 기준으로 오른쪽에 자신(6)보다 작은 수가 없습니다. (총 역전 카운트: 0)
  - 8 타일은 자신을 기준으로 오른쪽에 자신(8)보다 작은 수인 7로, 총 1개가 있습니다. (총 역전 카운트: 1)
  - 7 타일은 자신을 기준으로 오른쪽에 자신(7)보다 큰 수가 없습니다. (총 역전 카운트: 1)
- 따라서, [1, 2, 3, 4, 5, 6, 8, 7] 상태는 역전 카운트가 1, 홀수 이므로 이 상태는 **풀 수 없는 경우**입니다.

</details>

<br>

<details>
<summary><b>예시 2(풀 수 없는 경우)</b></summary>

- 3\*3 퍼즐 상태: [8, 1, 2, 4, 3, 7, 6, 5](0은 역전 카운트를 셀 때 제외 합니다)
  - 8 타일은 자신을 기준으로 오른쪽에 자신(8)보다 작은 수인 1, 2, 4, 3, 7, 6, 5로 총 7개가 있습니다. (총 역전 카운트: 7)
  - 1 타일은 자신을 기준으로 오른쪽에 자신(1)보다 작은 수가 없습니다. (총 역전 카운트: 7)
  - 2 타일은 자신을 기준으로 오른쪽에 자신(2)보다 작은 수가 없습니다. (총 역전 카운트: 7)
  - 4 타일은 자신을 기준으로 오른쪽에 자신(4)보다 작은 수가 3으로 총 1개가 있습니다. (총 역전 카운트: 7 + 1)
  - 3 타일은 자신을 기준으로 오른쪽에 자신(3)보다 작은 수가 없습니다. (총 역전 카운트: 8)
  - 7 타일은 자신을 기준으로 오른쪽에 자신(7)보다 작은 수가 6, 5로 총 2개가 있습니다. (총 역전 카운트: 8 + 2)
  - 6 타일은 자신을 기준으로 오른쪽에 자신(6)보다 작은 수인 5로 총 1개가 있습니다. (총 역전 카운트: 10 + 1)
  - 5 타일은 자신을 기준으로 오른쪽에 자신(5)보다 큰 수가 없습니다. (총 역전 카운트: 11)
- [8, 1, 2, 4, 3, 7, 6, 5] 상태는 역전 카운트가 11, 홀수 이므로 이 상태는 **풀 수 없는 경우**입니다.

</details>

<br>

<details>
<summary><b>예시 3(풀 수 있는 경우)</b></summary>

- 3\*3 퍼즐 상태: [1, 8, 2, 4, 3, 7, 6, 5](0은 역전 카운트를 셀 때 제외 합니다)
  - 1 타일은 자신을 기준으로 오른쪽에 자신(1)보다 작은 수가 없습니다. (총 역전 카운트: 0)
  - 8 타일은 자신을 기준으로 오른쪽에 자신(8)보다 작은 수가 2, 4, 3, 7, 6, 5로 총 6개가 있습니다. (총 역전 카운트: 6)
  - 2 타일은 자신을 기준으로 오른쪽에 자신(2)보다 작은 수가 없습니다. (총 역전 카운트: 6)
  - 4 타일은 자신을 기준으로 오른쪽에 자신(4)보다 작은 수가 3으로 총 1개가 있습니다. (총 역전 카운트: 6 + 1)
  - 3 타일은 자신을 기준으로 오른쪽에 자신(3)보다 작은 수가 없습니다. (총 역전 카운트: 7)
  - 7 타일은 자신을 기준으로 오른쪽에 자신(7)보다 작은 수가 6, 5로 총 2개가 있습니다. (총 역전 카운트: 7 + 2)
  - 6 타일은 자신을 기준으로 오른쪽에 자신(6)보다 작은 수인 5로 총 1개가 있습니다. (총 역전 카운트: 9 + 1)
  - 5 타일은 자신을 기준으로 오른쪽에 자신(5)보다 큰 수가 없습니다. (총 역전 카운트: 10)
- [1, 8, 2, 4, 3, 7, 6, 5] 상태는 역전 카운트가 10, 짝수 이므로 이 상태는 **풀 수 있는 경우**입니다.

</details>

<br>

### 2. 최단 경로 알고리즘 구현 및 알고리즘 시각화

**최단 경로 알고리즘 구현**

왜 이 알고리즘을 선택했나요?

**최단 경로 시각화 로직**

1. 타일을 클릭합니다.
2. 타일이 swap 가능한지 판별합니다(클릭한 타일의 맞닿아 있는 곳에 빈칸(0)이 있어야 합니다).
3. 타일이 swap 가능하다면 빈칸과 타일의 위치를 전환합니다.
4. 타일 위치가 전환이 반영된 전체 타일의 상태를 업데이트 합니다.
5. 각 타일의 인덱스를 통해 row, column 정보를 얻습니다.
6. 5단계에서 얻은 row, column 활용해 Board 내 타일의 위치값을 translateX, translateY에 할당합니다.
7. 타일의 transform 속성에 translateX, translateY 설정합니다.
8. swap 되기 전 타일과 swap된 타일의 위치를 비교하여 transform 속성에 의해 타일이 이동합니다.

<br />

## ✍️ Need to Improvement

### 1. 재사용성

재사용될 가능성이 있는 컴포넌트를 미리 구별하지 않고 작업한 것이 아쉽습니다. 작업이 어느 정도 마무리된 후 리팩토링 하면서 반복되는 코드들은 컴포넌트화 할 가능성이 있는지 판단하고 버튼(`<Button>`)이나, 배경(`<GridBackground>`) 같이 단순한 UI는 컴포넌트화 시켰는데요. 제 프로젝트에서 퍼즐 렌더를 담당하고 있는 `<Board>` UI가 여러 군데 쓰임에도 불구하고 컴포넌트화 시키지 못했습니다. `<Board>` 컴포넌트 내부가 복잡해 여러 군데 사용하기에 어려움이 있었기 때문입니다. 처음 `<Board>` 컴포넌트를 구현할 때, 컴포넌트 내부 함수나 속성을 재사용성을 고려해 작성했더라면 반복되는 코드를 상당히 줄 일 수 있었을텐데 아쉬움이 남습니다. 컴포넌트를 작성하기 전에 비슷한 UI가 있는지 생각해보고 작성하는 습관이 필요합니다.

### 2. 최단 경로 알고리즘 개선

출발 상태(퍼즐이 셔플된 상태)에서 목표 상태(퍼즐 완성 상태)까지 최단 경로를 구할 때, 1000번 이상 iteration을 진행했음에도 불구하고 최단 경로를 구하지 못했으면 퍼즐 상태를 다시 셔플하도록 구현했습니다. 즉, 1000번 안에 최단 경로를 찾으면 사용자가 퍼즐을 푸는 것을 시작할 수 있도록 구현했습니다. 그런데 최단 경로를 찾는데 시간이 많이 소요될 경우 약 1분(셔플 6회) 이상 걸렸습니다. 알고리즘을 개선시키는데 시간이 부족해 현재 상황까지만 구현을 했습니다만 heap, priority queue 를 통해서 시간복잡도 개선이 가능하다는 것을 알게되었습니다. 실제로 개선이 얼마만큼 빨라질지는 직접 구현을 해봐야 알겠지만 알고리즘을 개선하여 사용자 경험을 좀 더 수월하게 만들고 싶습니다.

<br />

## 🧐 Self Feedback

<details>
<summary><b>👍 Good</b></summary>
<br>

<b>1. 주어진 기간 안에 프로젝트를 완수한 점</b>

3주라는 기간 안에(11월 7일 ~ 11월 27일, 총 21일) 구현하고자 했던 기능들을 끝까지 완수한 것에 스스로를 칭찬해주고 싶습니다. 충분한 자료조사와 POC(Proof of Concept)를 통해 기능 구현 실현 가능성부터 먼저 파악한 것이 끝까지 해낼 수 있었던 가장 큰 요인으로 작용했습니다. 또한 산정한 일정을 기반으로 매일 스크럼을 작성한 것이 큰 도움이 되었습니다. 매일 매일 어떤 이슈가 터졌는지 그 이슈로 인해 얼마만큼의 딜레이가 발생하는지, 딜레이가 발생한다면 일정을 어떻게 다시 조율하면 좋을지 고민하고 결정했던 시간들 덕분에 주어진 일정 안에 프로젝트를 끝마칠 수 있었습니다.

<br>

<b>2. 에러를 바라보는 관점이 변화하기 시작한 점</b>

이번 프로젝트를 통해 에러를 바라보는 저의 관점이 긍정적으로 변화하기 시작했습니다. 예전에는 에러가 무섭고 짜증났습니다. 그러나 많은 에러와 마주하면서 에러에 점차 무뎌졌고 오히려 에러가 친절한 존재로 다가왔습니다. 어디서 에러가 났는지 알려주지만 실제로는 에러가 발생한 원인은 더 파고 들어야 하는 경우가 많았는데요. 그럴때마다 에러가 난 원인이 무엇인지 파악하기 위해서 debugger와 console을 사용했습니다. 에러의 원인이 되는 지점에 가까워질 때마다 제가 debugger라는 도구를 가지고 범인을 찾는 탐정이 된 것 마냥 재밌다는 기분을 느꼈습니다. 오류를 해결하면서 재밌다는 기분은 처음 느껴봐서 이번 오류 해결 경험은 스스로 신기하게 다가왔습니다.

</details>

<br>

<details>
<summary><b>👏 Bad</b></summary>
<br>

<b>1. 공식 깃헙 문서를 꼼꼼히 읽지 못한 점</b>

Animation 구현에 어려움을 겪고 있을 때, 공식 문서를 가장 먼저 읽지 않았습니다. 메인 화면 타이틀에 animation 을 주고 싶었습니다. 이미 react-motion 라이브러리를 쓰기로 결정하고 난 후라 css 코드를 작성하기보다는 라이브러리를 활용하고자 했습니다. 그런데 제가 하고싶은 애니메이션에 대한 레퍼런스가 부족했고 검색을 해도 잘 못 찾았습니다. 몇 시간을 끙끙대다가 다시 react-motion 깃헙문서를 살펴봤는데 자세히 보니 한 줄짜리 설명과 예시코드가 있었습니다. 공식 문서를 꼼꼼하게 살펴봤더라면 시간을 허비하지 않았을 것을 생각하니 시간이 너무 아까웠습니다. 어떤 것을 구현하고 싶다면 일단 첫번 째로 공식문서, 공식 깃헙문서를 잘 살펴봐야겠다는 생각을 다시금 했습니다.

<br>

<b>2. 컨디션 관리에 소홀했던 점</b>

컨디션 관리를 잘 못한 것이 아쉽습니다. 이틀 이상 딜레이 되는 task가 생기면 조급함이 심해져 특정 task가 3일 이상 지연되지 않도록 하기 위해 몸에 무리가 될 때까지 몰아붙였습니다. 제 역량이 부족하여 날 밤을 새워야만 겨우 구현이 가능한 경우도 많았는데요. 일정을 끝마치기 위해서 잠을 줄이는 것과 vs 내일의 컨디션을 위해서 일단 자는 것 사이에서 고민을 많이 했습니다. 이번 프로젝트에서는 3주라는 기간동안 꼭 구현을 완성하자라는 목표가 너무 강해서 밤을 지새우는데 손을 들었지만 3주라는 시간동안에도 몸이 꽤 힘들었습니다. 컨디션 관리를 소홀히 하는 것은 장기적인 입장에서 절대 유리하지 않다는 것을 상기하며 앞으로는 컨디션 관리도 꾸준히 해야겠습니다.

</details>

<br>

<details>
<summary><b>💪 After(Action Items)</b></summary>
<br>

<b>1. 일정 관리</b>

구현하고자 하는 것을 1) <b>명확하게 정의</b>하고 기능 구현을 위한 2) <b>충분한 자료조사</b>와 3) <b>POC</b>를 거쳐 4) <b>스스로 얼마만큼 할 수 있는지 최대한 객관적으로 파악</b>하여 일정 관리에 소홀함이 없도록 하겠습니다.

<br>

<b>2. 타입스크립트 공부</b>

가장 많이 마주했던 에러는 데이터 타입의 문제로 인한 것이었습니다. 자바스크립트라는 언어가 데이터 타입에 자유로운 한 편, 예상하지 못한 에러를 내뿜을 수도 있다는 말이 이해가 되었습니다. 타입을 명시하는 것의 장점을 직접 경험해보고 싶습니다. 따라서 타입스크립트를 공부해보고자 합니다.

<br>

<b>3. 공식 문서, 공식 깃헙 문서 꼼꼼하게 읽기</b>

특정 라이브러리에 의존하는 기능을 구현할 때 공식문서를 가장 먼저 읽겠습니다.

<br>

<b>4. 컨디션 관리</b>

스스로의 rule을 만들어 평소에도 컨디션 관리를 하여 코드를 작성해야할 때 집중이 잘 될 수있도록 습관을 만들고자 합니다.

<br>

<b>5. 알고리즘 공부</b>

이번 프로젝트를 진행하면서 알고리즘에 대한 부족함을 많이 느꼈습니다. 생각하는 연습을 위하여 꾸준한 알고리즘 공부가 필요합니다.

</details>

<br />

## 🗂 ETC

1. 프로젝트 기간: 22.11.07 ~ 22.11.27 (총 21일)
2. 기술스택: React, React-Motion, Styled Components, Netlify
