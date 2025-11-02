
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = 1000;
canvas.height = 600;

const tileSize = 50;
const mapWidth = 20;
const mapHeight = 12;

// 0: 바닥, 1: 벽, 2: 출구, 3: 색상 반전 타일
const maps = {
  "startMap": {
    name: "startMap",
    target: "secondMap",
    toggleTiles: [],
    locked: false,
    data: [
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,1,1,0,0,0,0,0,0,0,1,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,1], // 중앙 타일(3)
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,1], // 중앙 타일(3)
        [1,0,1,1,1,1,1,0,0,0,0,0,1,1,1,1,1,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    ]
  },

  "secondMap": {
    name: "secondMap",
    target: "startMap",
    toggleTiles: [],
    data: [
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,3,3,3,3,3,3,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,3,3,3,3,3,3,0,0,0,0,0,0,1],
        [1,2,0,0,0,0,0,3,3,3,3,3,3,0,0,0,0,0,0,1],
        [1,2,0,0,0,0,0,3,3,3,3,3,3,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,3,3,3,3,3,3,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,3,3,3,3,3,3,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    ]
  },
  "thirdMap": {
    name: "thirdMap",
    target: "secondMap", // ✅ 초록 출구 타일을 밟으면 2번 맵으로 이동
    toggleTiles: [],
    locked: false,
    data: [
      [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
      [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
      [1,0,5,0,0,0,3,3,3,3,3,3,3,3,0,0,0,0,0,1],
      [1,0,0,0,0,0,3,3,3,3,3,3,3,3,0,0,0,0,0,1],
      [1,0,0,0,0,0,3,3,3,3,3,3,3,3,0,0,0,0,0,1],
      [1,2,0,0,0,0,3,3,3,3,3,3,3,3,0,0,0,0,0,1],
      [1,2,0,0,0,0,3,3,3,3,3,3,3,3,0,0,0,0,0,1],
      [1,0,0,0,0,0,3,3,3,3,3,3,3,3,0,0,0,0,0,1],
      [1,0,0,0,0,0,3,3,3,3,3,3,3,3,0,0,0,0,0,1],
      [1,0,0,0,0,0,3,3,3,3,3,3,3,3,0,0,0,0,0,1],
      [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
      [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  ]
  },
  "fourthMap": {
  name: "fourthMap",
  target: "thirdMap", // 4 → 3 이동
  toggleTiles: [],
  locked: false,
  data: [
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  ]
},
};

let currentMapName = "startMap";
let map = maps[currentMapName].data;

let fade = { active: false, opacity: 0, direction: "in", nextMap: null };

// ===== 이미지 로드 =====
const imgDinoList = [];
let answerImg = new Image(); 
answerImg.src = "img/answer1.png"; 
let answerImg2 = new Image();
answerImg2.src = "img/answer2.png";
let tutorialVisible = false;
const tutorialImg = new Image();
tutorialImg.src = "img/Tutorial.png";
let loadedImages = 0;
for (let i = 1; i <= 10; i++) {
  const img = new Image();
  img.src = 'img/kirby' + i + '.png';
  img.onload = () => {
    loadedImages++;
    if (loadedImages === 10) startGame();
  };
  imgDinoList.push(img);
}

// ===== 플레이어 =====
const player = {
  x: 100, y: 100, width: 40, height: 40,
  vx: 0, vy: 0, speed: 3,
  frame: 0, moving: false, facing: 'right',
  draw() {
    const img = this.moving
      ? imgDinoList[Math.floor(this.frame / 5) % 9]
      : imgDinoList[9];
    ctx.save();
    if (this.facing === 'left') {
      ctx.scale(-1, 1);
      ctx.drawImage(img, -this.x - this.width, this.y, this.width, this.height);
    } else {
      ctx.drawImage(img, this.x, this.y, this.width, this.height);
    }
    ctx.restore();
  }
};

const keys = {};
document.addEventListener('keydown', e => keys[e.key] = true);
document.addEventListener('keyup', e => keys[e.key] = false);
document.addEventListener('keydown', e => {
keys[e.key] = true;

  // 🔹 T키를 누르면 Tutorial 이미지 토글
  if (e.key === 't' || e.key === 'T') {
    tutorialVisible = !tutorialVisible;
  }
});

function drawMap() {
  for (let y = 0; y < mapHeight; y++) {
    for (let x = 0; x < mapWidth; x++) {
      const tile = map[y][x];
      if (tile === 1) ctx.fillStyle = 'darkslategray';
      else if (tile === 2) ctx.fillStyle = '#88e0a5';
      else if (tile === 3) {
        const toggled = maps[currentMapName].toggleTiles.find(t => t.x === x && t.y === y);
        ctx.fillStyle = toggled?.black ? 'black' : 'white';
      }
      else if (tile === 4) ctx.fillStyle = '#b57fe3'; // 보라색 출구 (third map)
      else if (tile === 5) {
        // 🟡 플레이어가 5번 타일 위에 있을 때 살짝 어둡게
        const playerTileX = Math.floor((player.x + player.width / 2) / tileSize);
        const playerTileY = Math.floor((player.y + player.height / 2) / tileSize);
      
        if (playerTileX === x && playerTileY === y) {
          ctx.fillStyle = '#c69200'; // 어두운 노란색 (#ffca28보다 살짝 낮은 톤)
        } else {
          ctx.fillStyle = '#ffca28'; // 기본 노란색
        }
      }
      else ctx.fillStyle = 'lightgrey';

      ctx.fillRect(x * tileSize, y * tileSize, tileSize, tileSize);

      ctx.save();
      ctx.globalAlpha = 0.5;
      ctx.strokeStyle = 'black';
      ctx.lineWidth = 0.5;
      ctx.strokeRect(x * tileSize, y * tileSize, tileSize, tileSize);
      ctx.restore();
    }
  }
}

// 패턴 정의 (1 = 검정, 0 = 흰색)
const unlockPattern = [
    [0,1,1,1,1,0],
    [1,1,0,0,1,1],
    [1,0,0,0,0,1],
    [1,0,0,0,0,1],
    [1,1,0,0,1,1],
    [0,1,1,1,1,0]
  ];
  
function isWallAt(x, y) {
  const tileX = Math.floor((x + player.width / 2) / tileSize);
  const tileY = Math.floor((y + player.height / 2) / tileSize);
  if (tileX < 0 || tileY < 0 || tileX >= mapWidth || tileY >= mapHeight) return true;
  return map[tileY][tileX] === 1;
}

// 🧩 이전 타일 좌표 저장
let lastTile = { x: -1, y: -1 };

function checkMapTransition() {
  const tileX = Math.floor((player.x + player.width / 2) / tileSize);
  const tileY = Math.floor((player.y + player.height / 2) / tileSize);
  const tile = map[tileY][tileX];

  // 🔹 같은 타일에 머무르는 중이면 아무 일도 안 함
  if (tileX === lastTile.x && tileY === lastTile.y) return;

  // 🔹 새로운 타일로 옮겼다면 기록 갱신
  lastTile = { x: tileX, y: tileY };
  if (tile === 5) {
    const toggles = maps[currentMapName].toggleTiles;
    for (const t of toggles) t.black = false; // 모두 흰색으로 초기화
  }

  // 🔸 출구 타일 → 맵 전환
  if ((tile === 2 || tile === 4) && !fade.active) {
    fade.active = true;
    fade.direction = "out";
  
    // 🟣 보라색 출구는 맵에 따라 이동 대상이 다름
    if (tile === 4) {
      if (currentMapName === "secondMap") {
        fade.nextMap = "thirdMap";   // 2번째 맵 → 3번째 맵
      } else if (currentMapName === "thirdMap") {
        fade.nextMap = "fourthMap";  // 3번째 맵 → 4번째 맵
      } else {
        fade.nextMap = maps[currentMapName].target; // 혹시 다른 맵에서 4가 있다면 기본 target
      }
    } else {
      // 초록색(2) 출구는 기본 target 이동
      fade.nextMap = maps[currentMapName].target;
    }
  }
  // 🔸 색상 반전 타일 (3)
  if (tile === 3) {
    if (maps[currentMapName].locked) return;
    const currentToggles = maps[currentMapName].toggleTiles;
    const tileState = currentToggles.find(t => t.x === tileX && t.y === tileY);
    if (tileState) {
      tileState.black = !tileState.black; // 색 반전
    } else {
      currentToggles.push({ x: tileX, y: tileY, black: true });
    }
  }
}
function checkUnlockPattern() {
    if (currentMapName !== "secondMap") return;
  
    const startX = 7;
    const startY = 3;
    let matches = true;
  
    for (let y = 0; y < 6; y++) {
      for (let x = 0; x < 6; x++) {
        const expected = unlockPattern[y][x];
        const tile = map[startY + y][startX + x];
  
        // 색상변환 타일(3)인 경우 실제 색상 상태 확인
        if (tile === 3) {
          const toggled = maps[currentMapName].toggleTiles.find(t => t.x === startX + x && t.y === startY + y);
          const colorState = toggled?.black ? 1 : 0;
          if (colorState !== expected) { matches = false; break; }
        } else if (tile !== expected) {
          matches = false;
          break;
        }
      }
      if (!matches) break;
    }
  
    // 패턴 일치 시 출구 생성 (보라색 4)
    if (matches) {
      map[5][18] = 4;
      map[6][18] = 4;
      maps["secondMap"].locked = true; //
    }
  }
  function checkUnlockPatternThird() {
    if (currentMapName !== "thirdMap") return;
  
    const startX = 6; // 중앙 8×8 시작 좌표
    const startY = 2;
    let matches = true;
  
    // 🔹 목표 패턴 (1=검정, 0=흰색)
    const unlockPattern8 = [
      [0,0,1,1,1,1,0,0],
      [0,1,1,0,0,1,1,0],
      [1,1,0,0,0,0,1,1],
      [1,0,1,0,0,1,0,1],
      [1,0,0,0,0,0,0,1],
      [1,0,0,1,1,0,0,1],
      [1,1,0,0,0,0,1,1],
      [0,1,1,1,1,1,1,0]
    ];
  
    for (let y = 0; y < 8; y++) {
      for (let x = 0; x < 8; x++) {
        const tile = map[startY + y][startX + x];
        const expected = unlockPattern8[y][x];
  
        // 색상변환 타일(3)인 경우 toggle 상태로 판단
        if (tile === 3) {
          const toggled = maps[currentMapName].toggleTiles.find(
            t => t.x === startX + x && t.y === startY + y
          );
          const colorState = toggled?.black ? 1 : 0;
          if (colorState !== expected) { matches = false; break; }
        } else if (tile !== expected) {
          matches = false; break;
        }
      }
      if (!matches) break;
    }
  
    // 🔹 패턴 완성 시 보라색 출구 생성 (오른쪽 중앙 두 칸)
    if (matches && !maps["thirdMap"].locked) {
      map[5][18] = 4;
      map[6][18] = 4;
      maps["thirdMap"].locked = true; // 다시 못 열게 잠금
    }
    for (let y = 0; y < 8; y++) {
      for (let x = 0; x < 8; x++) {
        const tile = map[startY + y][startX + x];
        if (tile === 3) {
          const toggled = maps[currentMapName].toggleTiles.find(t => t.x === startX + x && t.y === startY + y);
          const colorState = toggled?.black ? 1 : 0;
          if (colorState !== unlockPattern8[y][x]) { matches = false; break; }
        } else if (tile !== unlockPattern8[y][x]) {
          matches = false; break;
        }
      }
      if (!matches) break;
    }
  
    if (matches && !maps["thirdMap"].locked) {
      map[5][18] = 4; // 보라색 출구 생성
      map[6][18] = 4;
      maps["thirdMap"].locked = true;
    }
  }
  function changeMap(nextMapName) {
    // 1) 어디서 왔는지 저장
    const fromMap = currentMapName;
  
    // 2) 맵 전환
    currentMapName = nextMapName;
    map = maps[currentMapName].data;
    lastTile = { x: -1, y: -1 };
  
    // 3) 기본 등장 위치 (기존 로직 유지)
    if (currentMapName === "secondMap") {
      player.x = 100; player.y = 250;
    } else if (currentMapName === "startMap") {
      player.x = 1000 - player.width - 100; player.y = 250;
    } else if (currentMapName === "thirdMap") {
      player.x = 100; player.y = 250;
    } else if (currentMapName === "fourthMap") {
      player.x = 100; player.y = 250;
    }
  
    // 4) ★ thirdMap → secondMap일 때만: 오른쪽 끝에서 "왼쪽" 바라보게
    if (fromMap === "thirdMap" && currentMapName === "secondMap") {
      const exitCol = 17; // 오른쪽 출구 열(column)
      player.x = exitCol * tileSize + (tileSize - player.width) / 2; // 타일 중앙 정렬
      player.y = 250;               // 필요하면 출구 높이에 맞춰 조정 가능
      player.facing = 'left';       // ← 왼쪽 바라보기
    }
    if (fromMap === "fourthMap" && currentMapName === "thirdMap") {
      const exitCol = 17; // 오른쪽 출구 열(column)
      player.x = exitCol * tileSize + (tileSize - player.width) / 2;
      player.y = 250;
      player.facing = 'left'; // ← 왼쪽 바라보기
    }
    }

function drawFade() {
  if (!fade.active) return;
  if (fade.direction === "out") {
    fade.opacity += 0.05;
    if (fade.opacity >= 1) {
      fade.opacity = 1;
      changeMap(fade.nextMap);
      fade.direction = "in";
    }
  } else if (fade.direction === "in") {
    fade.opacity -= 0.05;
    if (fade.opacity <= 0) {
      fade.opacity = 0;
      fade.active = false;
    }
  }
  ctx.save();
  ctx.globalAlpha = fade.opacity;
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.restore();
}

function updatePlayer() {
  if (fade.active && fade.direction === "out") return;

  player.vx = 0; player.vy = 0; player.moving = false;
  if (keys['ArrowUp']) { player.vy = -player.speed; player.moving = true; }
  if (keys['ArrowDown']) { player.vy = player.speed; player.moving = true; }
  if (keys['ArrowLeft']) { player.vx = -player.speed; player.moving = true; player.facing = 'left'; }
  if (keys['ArrowRight']) { player.vx = player.speed; player.moving = true; player.facing = 'right'; }

  const nextX = player.x + player.vx;
  if (!isWallAt(nextX, player.y)) player.x = nextX;
  const nextY = player.y + player.vy;
  if (!isWallAt(player.x, nextY)) player.y = nextY;

  if (player.moving) player.frame++;
  checkMapTransition();
  checkUnlockPatternThird();
  checkUnlockPattern(); // ✅ 패턴 검사
}
function drawAnswerImage() {
  // ===== 2번째 맵 =====
  if (currentMapName === "secondMap") {
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    const imgWidth = 150;
    const imgHeight = 150;
    const offsetX = 250;
    const offsetY = 0;

    const x = centerX + offsetX - imgWidth / 2;
    const y = centerY + offsetY - imgHeight / 2;

    const safeX = Math.max(0, Math.min(x, canvas.width - imgWidth));
    const safeY = Math.max(0, Math.min(y, canvas.height - imgHeight));

    ctx.drawImage(answerImg, safeX, safeY, imgWidth, imgHeight);
  }

  // ===== 3번째 맵 =====
  else if (currentMapName === "thirdMap") {
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    const imgWidth = 150;
    const imgHeight = 150;
    const offsetX = 300; // ✅ 같은 위치 (오른쪽)
    const offsetY = 0;

    const x = centerX + offsetX - imgWidth / 2;
    const y = centerY + offsetY - imgHeight / 2;

    const safeX = Math.max(0, Math.min(x, canvas.width - imgWidth));
    const safeY = Math.max(0, Math.min(y, canvas.height - imgHeight));

    ctx.drawImage(answerImg2, safeX, safeY, imgWidth, imgHeight);
  }
}
  function drawTutorial() {
    if (!tutorialVisible) return; // 안 보이는 상태면 무시
  
    const imgWidth = canvas.width * 0.8;  // 전체 화면의 80% 크기
    const imgHeight = canvas.height * 0.95;
    const x = (canvas.width - imgWidth) / 2;
    const y = (canvas.height - imgHeight) / 2;
  
    ctx.save();
    ctx.globalAlpha = 0.9; // 살짝 투명하게 표시
    ctx.drawImage(tutorialImg, x, y, imgWidth, imgHeight);
    ctx.restore();
  }
  function drawTutorialHint() {
    if (currentMapName !== "startMap") return; // 1번째 맵에서만 표시
  
    ctx.save();
    ctx.font = "24px Pretendard, sans-serif";  // 글씨 크기 및 폰트
    ctx.fillStyle = "white";                    // 글씨색
    ctx.textAlign = "center";
    ctx.shadowColor = "black";
    ctx.shadowBlur = 6;
    ctx.fillText("T를 눌러 튜토리얼 확인", canvas.width / 2, 40); // 상단 중앙
    ctx.restore();
  }
  function drawEndingMessage() {
    if (currentMapName !== "fourthMap") return; // 4번째 맵에서만 표시
  
    ctx.save();
    ctx.font = "36px Pretendard, sans-serif"; // 조금 더 크게
    ctx.fillStyle = "white";                  // 튜토리얼과 같은 색
    ctx.textAlign = "center";
    ctx.shadowColor = "black";                // 그림자 동일
    ctx.shadowBlur = 6;
    ctx.fillText("thank you for playing", canvas.width / 2, canvas.height / 2);
    ctx.restore();
  }
function startGame() {
    function gameLoop() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawMap();
      updatePlayer();
      drawAnswerImage();
      drawEndingMessage();
      player.draw();
      drawTutorialHint();
      drawTutorial();
      drawFade();
      requestAnimationFrame(gameLoop);
    }
    gameLoop();
  }