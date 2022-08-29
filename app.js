const container = document.getElementById("root");
const ajax = new XMLHttpRequest();
const content = document.createElement("div");
const NEWS_URL = "https://api.hnpwa.com/v0/news/1.json";
// 바뀔 가능성이 있는 변수는 뺴주는게 좋다 URL
const CONTENT_URL = "https://api.hnpwa.com/v0/item/@id.json";

function getData(url) {
  ajax.open("GET", url, false);
  ajax.send();

  return JSON.parse(ajax.response);
}

//응답 값을 객체로 바꿔보자 (preview 탭)
// JSON 데이터를 객체로 바꾸는 도구는 'json.parse)이다

const ul = document.createElement("ul");

// 객체화되어 있을 것 (axios에서는 이 기능을 자동으로 처리해줌)

function newsFeed() {
  const newsFeed = getData(NEWS_URL);
  const newsList = [];

  newsList.push("<ul>");

  for (let i = 0; i < 10; i++) {
    `
  `;

    newsList.push(`
      <li>
        <a href="#${newsFeed[i].id}">
        ${newsFeed[i].title} (${newsFeed[i].comments_count}) (comments)
        </a>
      </li>
 `);

    // ** 문자열만을 가지고 UI를 만드는 것, DOM API를 최대한 이용하지 않는 것이
    // 실제 프로젝트가 커지고 코드가 복잡해질 수록 권장된다.
    // 마크업 구조가 잘 보인다는 것이다. 문자열을 사용하면 좋은 점
  }

  newsList.push(`</ul>`);

  container.innerHTML = newsList.join("");

  // join : 배열 요소 안에 문자열들을 하나의 문자열로 합쳐서 반환 (기본 , 구분자가 있음)
  // join('') 빈 문자열을 넣어주면 구분자 없이 하나의 합쳐진 HTML 문자열을 얻을 수 있음

  // 똑같은 코드 반복은 좋지 않다
}

function newsDetail() {
  const id = location.hash.substring(1);

  // 쓰고 싶은 위치값부터 그 이후부터만 나오게
  // 1은 "#"을 제외한 나머지의 문자열만 나오게 되는 것이다.

  const newsContent = getData(CONTENT_URL.replace("@id", id));

  container.innerHTML = `  
      <h1>${newsContent.title}</h1>

      <div>
        <a href="#">목록으로</a>
      </div>
    
    `;

  // title.innerHTML = newsContent.title;

  // content.appendChild(title);

  // 문자열 함수 중에 값을 대체해주는 replace 함수가 있다
}

function router() {
  const routePath = location.hash;
  if (routePath === "") {
    newsFeed();
  } else {
    newsDetail();
  }
}

window.addEventListener("hashchange", router);

router();
