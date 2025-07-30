/* 드롭다운 메뉴 */
document.querySelector('.dropbtn').onclick = () => {
  document.getElementById('dropdownMenu').classList.toggle('show');
};
window.onclick = e => {
  if (!e.target.matches('.dropbtn')) {
    document.getElementById('dropdownMenu').classList.remove('show');
  }
};

/* 스무스 스크롤 */
document.querySelectorAll('.menu a').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    document.querySelector(a.getAttribute('href'))
            .scrollIntoView({ behavior: 'smooth' });
  });
});

/* 사진 업로드 & 미리보기 */
fileInput.onchange = e => {
  thumbs.innerHTML = '';
  [...e.target.files].forEach(f => {
    const img = document.createElement('img');
    img.src = URL.createObjectURL(f);
    thumbs.appendChild(img);
  });
};

/* 공지사항 (LocalStorage) */
const noticeList = document.getElementById('noticeList');
function loadNotices() {
  noticeList.innerHTML = '';
  const data = JSON.parse(localStorage.getItem('notices') || '[]');
  data.forEach(({ title, body, date }) => {
    const div = document.createElement('div');
    div.className = 'post';
    div.innerHTML = `<strong>${title}</strong> <small>${date}</small><br/>${body}`;
    noticeList.prepend(div);
  });
}
function addNotice() {
  const title = nTitle.value.trim();
  const body = nBody.value.trim();
  if (!title || !body) return alert('제목과 내용을 입력하세요');
  const data = JSON.parse(localStorage.getItem('notices') || '[]');
  data.push({ title, body, date: new Date().toLocaleString() });
  localStorage.setItem('notices', JSON.stringify(data));
  nTitle.value = '';
  nBody.value = '';
  loadNotices();
}
loadNotices();

/* 댓글 (LocalStorage) */
const commentList = document.getElementById('commentList');
function loadComments() {
  commentList.innerHTML = '';
  const data = JSON.parse(localStorage.getItem('comments') || '[]');
  data.forEach(({ name, body, date }) => {
    const div = document.createElement('div');
    div.className = 'post';
    div.innerHTML = `<strong>${name}</strong> <small>${date}</small><br/>${body}`;
    commentList.prepend(div);
  });
}
function addComment() {
  const name = cName.value.trim() || '익명';
  const body = cBody.value.trim();
  if (!body) return alert('내용을 입력하세요');
  const data = JSON.parse(localStorage.getItem('comments') || '[]');
  data.push({ name, body, date: new Date().toLocaleString() });
  localStorage.setItem('comments', JSON.stringify(data));
  cName.value = '';
  cBody.value = '';
  loadComments();
}
loadComments();

/* 간단 온라인 체크 (15초 이내 활동) */
const STATUS_KEY = 'lastActive';
function updateStatus() {
  localStorage.setItem(STATUS_KEY, Date.now());
}
setInterval(updateStatus, 5000); // 5초마다 저장
function renderStatus() {
  const last = parseInt(localStorage.getItem(STATUS_KEY) || 0);
  const online = (Date.now() - last) < 15000;
  statusDot.className = `dot ${online ? 'online' : 'offline'}`;
  statusText.textContent = online ? 'Online' : 'Offline';
}
setInterval(renderStatus, 3000);
updateStatus();
renderStatus();
window.addEventListener('focus', updateStatus);
