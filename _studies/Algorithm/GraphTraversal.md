---
title: "그래프 순회 (DFS & BFS)"
In: Algorithm
---

그래프 순회는 그래프의 모든 정점을 한 번씩 방문하는 체계적인 방법입니다. 대표적으로 깊이 우선 탐색(DFS)과 너비 우선 탐색(BFS)이 있습니다.

### 깊이 우선 탐색 (DFS, Depth-First Search)

루트 노드에서 시작하여 다음 분기로 넘어가기 전에 해당 분기를 완벽하게 탐색하는 방법입니다. 스택(Stack) 또는 재귀 함수로 구현하며, '한 놈만 파는' 방식으로 비유할 수 있습니다.

### 너비 우선 탐색 (BFS, Breadth-First Search)

루트 노드에서 시작하여 인접한 노드를 먼저 모두 탐색하는 방법입니다. 큐(Queue)를 사용하여 구현하며, '가까운 놈들부터 챙기는' 방식으로 비유할 수 있습니다. 특히 가중치가 없는 그래프에서 최단 경로를 찾는 데 유용합니다.

---

### 예제 문제 및 풀이

<br>

<details markdown="1">
<summary>🏝️ 문제 1: 섬의 개수 (Number of Islands) - DFS 활용</summary>

**문제 설명:**

'1'(땅)과 '0'(물)으로 이루어진 2D 그리드 맵이 주어졌을 때, 섬의 개수를 세는 문제입니다. 섬은 수평 또는 수직으로 인접한 '1'들의 집합으로 정의됩니다.

**예시:**

```
[
  ["1","1","0","0","0"],
  ["1","1","0","0","0"],
  ["0","0","1","0","0"],
  ["0","0","0","1","1"]
]
```

위 예시의 정답은 `3`입니다.

<br>

<details markdown="1">
<summary><strong>Python 풀이 보기</strong></summary>

```python
def numIslands(grid):
    if not grid:
        return 0

    rows, cols = len(grid), len(grid[0])
    island_count = 0

    def dfs(r, c):
        # 그리드 범위를 벗어나거나 물이면 탐색 종료
        if r < 0 or r >= rows or c < 0 or c >= cols or grid[r][c] == '0':
            return

        # 현재 땅을 방문 처리 (물로 바꿔서 중복 방지)
        grid[r][c] = '0'

        # 동서남북 네 방향으로 계속 탐색
        dfs(r + 1, c)
        dfs(r - 1, c)
        dfs(r, c + 1)
        dfs(r, c - 1)

    # 그리드의 모든 셀을 순회
    for r in range(rows):
        for c in range(cols):
            # 만약 현재 위치가 땅('1')이라면
            if grid[r][c] == '1':
                # 섬의 개수를 하나 늘리고
                island_count += 1
                # 연결된 모든 땅을 DFS로 탐색하여 방문 처리
                dfs(r, c)

    return island_count

# 테스트
grid = [
  ["1","1","0","0","0"],
  ["1","1","0","0","0"],
  ["0","0","1","0","0"],
  ["0","0","0","1","1"]
]
print(f"섬의 개수: {numIslands(grid)}")
```

</details>
</details>

<br>

<details markdown="1">
<summary>🗺️ 문제 2: 이진 행렬의 최단 경로 (Shortest Path in Binary Matrix) - BFS 활용</summary>

**문제 설명:**

`N x N` 크기의 이진 행렬(grid)에서 (0, 0)에서 (N-1, N-1)까지 가는 가장 짧은 경로의 길이를 찾는 문제입니다. 경로는 '0'으로만 구성되어야 하며, 대각선을 포함한 8방향으로 이동할 수 있습니다. 경로가 없으면 -1을 반환합니다.

**예시:**

```
[[0, 0, 0],
 [1, 1, 0],
 [1, 1, 0]]
```

위 예시의 정답은 `4`입니다.

<br>

<details markdown="1">
<summary><strong>Python 풀이 보기</strong></summary>

```python
from collections import deque

def shortestPathBinaryMatrix(grid):
    n = len(grid)
    # 시작점이나 도착점이 막혀있으면 경로 없음
    if grid[0][0] == 1 or grid[n-1][n-1] == 1:
        return -1

    # 8방향 이동 (동, 서, 남, 북, 대각선)
    directions = [(-1, 0), (1, 0), (0, -1), (0, 1), (-1, -1), (-1, 1), (1, -1), (1, 1)]
    
    # 큐에는 (행, 열, 현재까지의 거리)를 저장
    queue = deque([(0, 0, 1)])
    # 방문한 노드를 기록하여 중복 방지
    visited = set([(0, 0)])

    while queue:
        r, c, distance = queue.popleft()

        # 목적지에 도착하면 현재까지의 거리를 반환
        if r == n - 1 and c == n - 1:
            return distance

        # 8방향으로 탐색
        for dr, dc in directions:
            nr, nc = r + dr, c + dc

            # 그리드 범위 안에 있고, 길이 '0'이며, 아직 방문하지 않았다면
            if 0 <= nr < n and 0 <= nc < n and grid[nr][nc] == 0 and (nr, nc) not in visited:
                visited.add((nr, nc))
                queue.append((nr, nc, distance + 1))

    # 큐가 비었는데 목적지에 도달하지 못했다면 경로 없음
    return -1

# 테스트
grid = [[0,0,0],[1,1,0],[1,1,0]]
print(f"최단 경로 길이: {shortestPathBinaryMatrix(grid)}")
```
</details>
</details>
