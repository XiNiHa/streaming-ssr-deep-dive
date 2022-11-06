---
theme: ./theme
title: 스트리밍 SSR 딥 다이브
class: "text-center"
highlighter: shiki
lineNumbers: false
css: unocss
---

# 스트리밍 SSR 딥 다이브

## 신의하, 2022/11/09 @ 그린랩스 Dev Dive

<!--
안녕하세요, 오늘 "스트리밍 SSR 딥 다이브"라는 주제로 발표를 맡게 된 신의하입니다.

한번 바로 발표를 시작해보도록 하겠습니다.
-->

---

# 자기소개

<div class="flex w-full mt-10">
<div class="w-72 mr-10 flex flex-col justify-center items-center gap-2">
<img src="/a5g56Yaz_400x400.jpg" class="w-full mb-2" />
<span><bi-twitter /> <a href="https://twitter.com/xiniha_1e88df">@xiniha_1e88df</a></span>
<span><bi-github /> <a href="https://github.com/XiNiHa">@XiNiHa</a></span>
</div>
<div class="flex-1">

## 신의하

- 온라인에선 XiNiHa라고 알려져 있습니다.

- 아임포트에서 프론트엔드 개발자로 일하고 있습니다.

- 새로운 것을 탐험하는 것을 즐깁니다.

</div>
</div>

<!--
먼저 전 온라인에선 씨니하라는 닉네임으로 더 많이 알려져 있고요, 현재는 아임포트라는 회사에서 프론트엔드 개발자로 일하고 있습니다.

기술적으로 새로운 것을 탐험하는 것을 즐기는 편이며,
오늘 발표 역시 이런 탐험의 과정에서 얻게 된 지식들을
소개해 드리는 시간이라고 생각해주시면 될 것 같습니다.
-->

---

# 오늘 알아볼 것

<v-clicks>

- 사전지식: 웹 성능 지표

- CSR vs SSR

- Suspense

- 스트리밍 SSR

</v-clicks>

<!--
먼저 오늘 알아볼 것들에 대해서 간단하게 짚고 넘어가볼 텐데요,

가장 먼저 오늘 발표를 이해하는 데 필수적인 사전지식인
각종 웹 성능 지표에 대해서 알아볼 것입니다.

그 다음으로는 CSR, 클라이언트 사이드 렌더링과 SSR, 서버 사이드 렌더링을 간단하게 알아보고,
이들 간의 웹 성능 지표 경향성의 차이를 살펴볼 것이며,

다음으론 리액트의 Suspense에 대해서 알아보면서,
이것이 어떻게 SSR 성능 개선에 도움을 줄 수 있는지를 살펴볼 것이고,

마지막으로는 이 모든 그림들이 조합되어 완성되는
스트리밍 SSR이라는 기능에 대해서 살펴보는 시간을 가져보도록 할 것입니다.
-->

---

# 사전지식: 웹 성능 지표

<v-clicks>

- Lighthouse 등의 도구를 사용하여 측정할 수 있는 지표들

- 이번 발표에서 살펴볼 지표

  - TTFB (Time to First Byte)

    브라우저에 요청에 서버가 응답을 내려주기까지 걸리는 시간

  - FCP (First Contentful Paint)

    사용자가 볼 수 있는 콘텐츠가 최초로 그려지기까지 걸리는 시간

  - LCP (Largest Contentful Paint)

    페이지 내에서 가장 큰 콘텐츠가 그려지기까지 걸리는 시간

  - TTI (Time to Interactive)

    페이지 로딩이 완료되고 사용자 입력에 응답할 수 있게 되기까지 걸리는 시간

</v-clicks>

<!--
일단 먼저 각종 웹 성능 지표들에 대해서 알아보도록 하겠습니다.

웹 성능 지표들은 주로 Lighthouse와 같은 도구들을 사용하여 측정할 수 있는데요,
다양한 지표들 중 이번 발표의 주제와 연관된 지표들만 간단하게 짚고 넘어가보도록 하겠습니다.

먼저 TTFB, Time To First Byte의 경우,
브라우저의 요청에 서버가 응답을 내려주기까지 걸리는 시간을 의미합니다.

그 다음 FCP, First Contentful Paint 같은 경우,
브라우저 요청 이후 사용자가 볼 수 있는 콘텐츠가 최초로 그려지기까지 걸리는 시간을 의미합니다.

LCP, Largest Contentful Paint의 경우,
페이지 내에서 가장 큰 콘텐츠가 그려지기까지 걸리는 시간을 의미하고,

TTI, Time To Interactive의 경우,
페이지 로딩이 완료되고 사용자 입력에 응답할 수 있게 되기까지 걸리는 시간을 의미합니다.
-->

---

# CSR vs SSR

<v-clicks>

- CSR (Client Side Rendering)

  클라이언트(브라우저)에서 JavaScript 실행을 통해서 DOM 요소들을 추가하고, 화면을 그려나가는 방식

  - 장점: 쉽고 간단하다!

  - 단점: JavaScript가 실행되기 전까지는 화면이 그려지지 않는다.

- SSR (Server Side Rendering)

  서버에서 화면을 HTML의 형태로 그려서 클라이언트(브라우저)로 내려주는 방식

  - 장점: JavaScript 실행 없이도 화면이 그려진다!

  - 단점: CSR에 비해 고려해야 할 것이 많고, 구현이 복잡하다.

</v-clicks>

<!--
이제 이 성능 지표들과 CSR, SSR이 어떻게 연결되어 있는지를 한 번 살펴볼 텐데요,
그 전에 CSR와 SSR에 대해서 먼저 간단하게 짚고 넘어가보겠습니다.

먼저 CSR, Client Side Rendering의 경우, 말 그대로 클라이언트, 즉 브라우저에서
자바스크립트 실행을 통해서 DOM 요소들을 추가하고, 화면을 그려나가는 방식입니다.

일반적으로 리액트 등의 JS 프레임워크를 사용한다고 할 때 가장 일반적으로 접하게 되는 방식으로,
쉽고 간단하다는 장점과, 자바스크립트가 실행되기 전까지는 화면이 그려지지 않는다는 단점이 존재합니다.

다음으로 SSR, Server Side Rendering의 경우, 서버에서 화면을 HTML의 형태로 그리고,
이것을 클라이언트로 내려주는 방식을 의미합니다.

SSR의 경우 자바스크립트 실행 없이도 화면이 그려진다는 장점이 있으나,
CSR 대비 고려해야 할 것이 많고, 구현이 복잡하다는 단점이 존재합니다.

CSR과 SSR에 대해 간단하게 알아 보았으니, 이제 각 방식별로 여러 웹 성능 지표에 있어서
어떻게 다른 경향성을 가지고 있는지 살펴 보도록 하겠습니다.
-->

---

# 데이터 로딩이 포함된 CSR 앱의 성능 지표

<div class="pt-4 pb-8">
  <Timeline
    :timeframes="[
      {
        text: '서버로 요청 전달,\n요청 처리,\n정적 파일 반환',
        boxClass: 'bg-green-300',
        percentage: 25
      },
      {
        text: 'HTML 분석,\nCSS와 JS 등\n리소스 로딩',
        boxClass: 'bg-orange-300',
        percentage: 15,
      },
      {
        text: 'JS 파싱 및 실행',
        boxClass: 'bg-red-300',
        percentage: 20,
      },
      {
        text: 'API 서버에서\n데이터 로딩',
        boxClass: 'bg-yellow-200',
        percentage: 35,
      },
      {
        text: '로딩한\n데이터로\n화면 표시',
        boxClass: 'bg-blue-200',
        percentage: 10,
      },
    ]"
    :events="[
      { text: '브라우저 요청', textClass: '-left-1' },
      { text: 'TTFB', textClass: '-left-1/2', left: '24%' },
      { text: 'FCP, TTI\n(스피너 표시)', textClass: '-left-1/2', left: '57%' },
      { text: 'LCP', textClass: '-right-1', left: 'calc(100% - 3px)' }
    ]" />
</div>

<v-clicks>

- 요청을 처리하고 정적 파일을 반환하는 동작은 빠르며, 따라서 TTFB도 빠르다
- 콘텐츠를 그리려면 JS를 파싱하고 실행해야 하기 때문에, FCP가 느리다
- 콘텐츠를 그린 후 추가적으로 실행할 JS가 없기 때문에 TTI와 FCP가 같다
- 최초 JS 파싱 및 실행 이후에야 데이터 로딩을 시작할 수 있고, 이것이 끝난 후에야 온전한 화면을 그릴 수 있기 때문에 LCP가 매우 늦다.

</v-clicks>

<!--
먼저 CSR의 경우를 살펴볼 텐데요, 데이터 로딩을 포함한 CSR 앱은 일반적으로 보시는 그래프와 같은 흐름을 가지게 됩니다.

브라우저에서 페이지에 접속하면, 서버로 요청이 전달되고, 사전에 빌드해둔 정적 파일이 반환됩니다.
이후 브라우저는 해당 파일을 받아 HTML 분석을 시작하며, 이 과정에서 HTML 내에 포함된
CSS와 JS 등의 리소스 역시 함께 로딩하게 됩니다.

이후 JS 로딩이 끝나면 JS의 파싱과 실행 과정을 거치게 되는데요, 이 과정에서 각종 JS 프레임워크를 사용하여
DOM 트리를 구성하고, 화면을 그리게 됩니다.

그런데 이 앱에는 데이터 로딩이 포함되어 있다고 했었죠? 이 경우 사용자에게는 스피너를 보여주고,
API 요청을 통해 데이터를 로딩하기 시작합니다. react-query 같은 라이브러리를 사용해보셨다면
아마 익숙하신 패턴일 거에요.

데이터 로딩이 완료되면, 받아온 데이터를 활용하여 전체 화면을 그리게 되고, 최초 로딩 절차가 마무리됩니다.

여기서 각 웹 성능 지표에 해당되는 지점을 집어 보면, TTFB는 서버로부터 정적 파일을 받아온 시점일 것이고,
FCP와 TTI는 JS의 실행이 완료되어 스피너가 표시된 시점일 것이며, LCP는 모든 절차가 끝난 시점일 것입니다.

각 수치들을 좀 더 자세히 살펴보도록 하겠습니다. 먼저 CSR 앱의 경우 서버가 할 일은
그저 정적 파일을 반환하는 것이기 때문에 굉장히 빠른 시간 안에 처리되며, 따라서 TTFB도 빠릅니다.

하지만 콘텐츠를 그리려면 JS를 파싱하고 실행하는 절차가 필요하기 때문에 FCP가 느린 편에 속하고요.

콘텐츠를 그린 후 추가적으로 실행할 JS가 없기 때문에 FCP와 TTI는 같습니다.

LCP의 경우 최초 JS 파싱 및 실행 이후에야 데이터 로딩을 시작할 수 있고,
이것이 끝난 후에야 온전한 화면을 그릴 수 있기 때문에 결과적으로 매우 늦은 타이밍에 위치하게 됩니다.

사실 사람들이 일반적으로 웹사이트의 성능에 대해서 가장 크게 느끼는 부분은 바로 LCP이기 때문에,
이를 줄일 방법을 고안해보아야 할 것 같은데요, 여기에서 SSR이 등장하게 됩니다.
-->

---

# SSR의 등장

<v-clicks>

- SSR을 활용하면 다양한 퍼포먼스 이득을 얻을 수 있다.

- SSR의 퍼포먼스 장점

  - 콘텐츠가 HTML 형태로 반환되기에, JS 파싱과 실행 없이도 콘텐츠를 빠르게 그릴 수 있음

  - API를 통한 데이터 로딩을 빠르게 시작할 수 있기 때문에,<br>
    최종적으로 데이터를 포함한 화면을 그리기까지 걸리는 시간을 크게 단축할 수 있음

  - 대체로 SSR이 이뤄지는 서버는 클라이언트 대비 우수한 네트워크망을 가지고 있기 때문에,<br>
    API 서버 호출 역시 상대적으로 빠르게 이뤄짐

- SSR의 퍼포먼스 단점

  - HTML 형태로 반환된 콘텐츠가 사용자와 상호작용할 수 있게 되려면,<br>
    이벤트 핸들러를 붙이고 JS 내부에서 HTML을 불러오는 등의 추가적인 동작이 필요해짐

    - 이를 Hydration이라고 하며, TTI를 늦추는 주범

</v-clicks>

<!--
SSR은 앞서 설명했던 CSR과 대비해 상당히 다른 퍼포먼스 특징을 가지고 있고, 이로부터 다양한 퍼포먼스 이득을 얻을 수 있습니다.

먼저 SSR의 퍼포먼스 장점부터 다뤄보자면, 서버에서 콘텐츠가 HTML 형태로 반환되기 때문에,
자바스크립트의 파싱과 실행 절차 없이도 콘텐츠를 빠르게 그릴 수 있다는 점이 있고,

API를 통한 데이터 로딩을 서버 측에서 빠르게 시작할 수 있기 때문에, 최종적으로 데이터를 포함한 화면을 그리기까지
걸리는 시간을 크게 단축할 수 있다는 점이 있으며,

또한 대체로 SSR이 이뤄지는 서버는 클라이언트 디바이스와 비교하여 우수한 네트워크 망을 가지고 있기 때문에,
API 서버 호출 역시 상대적으로 빠르게 이뤄지게 됩니다.

말씀드린 특징들은 CSR 앱의 단점이었던 데이터 로딩이 완료되고 온전한 화면을 그리기까기 너무나도 오랜 시간이 걸린다는
문제를 해결해주는 특징들이며, 따라서 LCP의 개선에 큰 도움을 주게 됩니다.

반면, SSR 앱에도 퍼포먼스 단점들이 존재하는데요, 대표적으로 HTML 형태로 반환된 콘텐츠가
사용자와 상호작용할 수 있도록 이벤트 핸들러를 붙이고, 자바스크립트 내에서 HTML을 불러오는 등의
추가적인 동작이 필요해진다는 점이 있습니다. 이를 Hydration이라고 하며, 이는 TTI를 늦추는 주범으로 지목됩니다.
Hydration이 끝나기 전까지는 사용자가 아무리 버튼을 눌러 봐야 아무 일도 일어나지 않을 테니까요!
-->

---

# 데이터 로딩이 포함된 SSR 앱의 성능 지표

<div class="py-4">
  <Timeline
    :timeframes="[
      {
        text: '서버로\n요청 전달',
        boxClass: 'bg-green-300',
        percentage: 15
      },
      {
        text: 'API 서버에서\n데이터 로딩',
        boxClass: 'bg-yellow-200',
        percentage: 25,
      },
      {
        text: 'HTML 생성 후\n브라우저로 전송',
        boxClass: 'bg-blue-200',
        percentage: 20
      },
      {
        text: 'HTML 분석,\nCSS와 JS 등\n리소스 로딩',
        boxClass: 'bg-orange-300',
        percentage: 20,
      },
      {
        text: 'JS 파싱 및 실행\n(Hydration)',
        boxClass: 'bg-red-300',
        percentage: 20,
      },
    ]"
    :events="[
      { text: '브라우저 요청', textClass: '-left-1', left: '0%' },
      { text: 'TTFB', textClass: '-left-1/2', left: '60%' },
      { text: 'FCP', textClass: '-left-1/2', left: '70%' },
      { text: 'LCP', textClass: '-left-1/2', left: '75%' },
      { text: 'TTI', textClass: '-left-80%', left: 'calc(100% - 3px)' }
    ]" />
</div>

<v-clicks>

- 브라우저로 응답을 전송하려면 API 서버에서 데이터 로딩이 완료되어야 하고, HTML 생성 과정 자체도 단순 정적 파일을 전송하는 것에 비해 느리기에, TTFB 시점이 많이 늦어짐
- HTML 분석과 리소스 로딩만 끝내면 FCP와 LCP가 동시에 완료됨
- Hydration 과정이 필요하기에 TTI가 뒤로 밀림

</v-clicks>

<!--
앞서 말씀드렸던 특징들을 그래프의 형태로 다시 한 번 살펴보도록 하겠습니다. 먼저 서버로 요청을 전달하면,
이번에는 서버에서 API 서버로 바로 데이터 로딩을 시도하게 되며, 이 결과를 가지고 HTML을 생성한 후,
브라우저로 전송하게 됩니다.

브라우저는 HTML을 분석하고 화면에 그리기 시작하며, 이 과정에서 CSS와 JS 등의 리소스도 로딩하게 됩니다.
HTML 내에 실제 데이터가 들어가 있는 SSR 특성상, HTML이 화면에 그려지면서 자연스레 FCP와 LCP가 발생합니다,

이후 자바스크립트의 파싱과 실행 절차, 즉 Hydration이 끝나면 사이트 내 모든 요소가 상호작용 가능해지며,
해당 시점이 TTI로 기록됩니다.

각 성능 지표들을 다시 한 번 자세히 짚어 보면, 기존에 정적 파일 반환만 해 주면 됐던 CSR 앱과 달리,
SSR 앱은 API 요청이나 HTML 생성 등의 절차가 추가되어 상대적으로 TTFB가 뒤로 밀리게 됩니다.

하지만 HTML 분석과 리소스 로딩만 끝내면 FCP와 LCP가 동시에 완료되기에, 사용자가 체감하는 전반적인 성능은 오히려 향상됩니다. 다만 API 요청이 얼마나 오래 걸리는지에 따라서 FCP는 CSR과 SSR이 엎치락뒤치락하는 모습을 보여줍니다.

이후 JS 파싱과 실행을 통해 Hydration 과정을 진행해야 하기 때문에,
CSR 앱과는 달리 TTI가 약간 뒤로 밀리게 됩니다.

이렇듯 SSR의 경우 CSR 대비 LCP가 상대적으로 빠르다는 점에서 전반적으로 더 뛰어난 성능을 보여 주는데요,
여기서 더 개선할 수 있는 방법은 없을까요?
-->

---

# SSR의 성능을 어떻게 개선할 수 있을까?

<v-clicks>

- TTFB를 당겨야 한다

- TTI를 당겨야 한다

- 해답: **스트리밍 SSR**

</v-clicks>

<!--
SSR의 성능을 개선하기 위해서는, 당연히 SSR의 약점을 보완할 수 있는 방향을 살펴 보아야겠죠?

따라서 자연스레 TTFB를 당겨야 하고, TTI를 당겨야 한다는 결론이 나오게 됩니다.

이것을 가능하게 해 주는 것이 바로 스트리밍 SSR입니다.
-->

---

# 스트리밍 SSR 사전지식: Suspense

<div class="flex">
<div class="flex-1">
<ul>

<v-clicks>

- 비동기적 렌더링을 표현하기 위해 사용하는 컴포넌트

- 하위 요소의 렌더링 중 중단(_Suspend_)이 일어나면 Fallback 요소를 렌더링한다

</v-clicks>

<li v-click="8">

렌더링의 중단은 `use`라는 특별한 Hook에 Promise를 전달하는 방식으로 이뤄진다

<ul>
<li v-click="9">뒤에서 더 자세히 알아보는 걸로...</li>
</ul>
</li>
</ul>
</div>
<div class="flex-1">

```tsx {all|3-5|4,9-17|4,10|3|all} {at:2}
const Page = () => {
  return (
    <Suspense fallback={<Spinner />}>
      <Profile userId={id} />
    </Suspense>
  );
};

const Profile = ({ userId }) => {
  const user = fetchUser(userId);
  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </div>
  );
};
```

</div>
</div>

---

# 그래서 이게 어떻게 SSR에 도움이 된다는 건가요?

<ul>

<v-clicks>

- Suspense는 주로 컴포넌트 렌더링을 위해 네트워크 요청의 결과값을 기다리는 데에 사용된다

- SSR의 TTFB가 느린 가장 큰 이유는 서버에서 네트워크 요청이 끝나기 전까지 아무 데이터도 전송할 수 없기 때문이다

</v-clicks>

<li v-click="3">

네트워크 요청이 끝나기 전에 Suspense의 Fallback 먼저 전송한다면 TTFB를 당길 수 있지 않을까?

<ul><li v-click="4"> = 스트리밍 SSR</li></ul>
</li>
</ul>

---

# 스트리밍 SSR

<ul>
<v-clicks>

- Suspense를 경계로 하여, 서버에서 콘텐츠 렌더링이 완료되는 순서대로 클라이언트로 내려보낸다

- 내려보내지는 컨텐츠는 클라이언트가 수신하는 대로 즉시 화면에 그려지고 Hydrate된다

</v-clicks>

<li v-click="3">
  스트리밍 SSR의 장점

<ul>
<v-clicks at="4">

- 네트워크 요청과 콘텐츠 렌더링 완료를 기다릴 필요 없이 먼저 Fallback 컴포넌트를 내려보내면 되기 때문에, TTFB와 FCP가 크게 개선된다.

- 한 페이지를 로딩하는 데에 여러 가지 데이터가 필요한 경우, 모든 데이터 로딩이 끝날 때까지 기다리는 대신, 개별 데이터 로딩이 끝날 때마다 해당 데이터를 필요로 하는 콘텐츠들이 먼저 렌더링된다

- 전체 페이지를 한 번에 Hydrate하는 것에 비해 개별 단계에서 Hydrate해야 할 영역의 크기가 작기 때문에, 전반적인 Hydration 성능 역시 향상된다.

</v-clicks>
</ul>
</li>
</ul>

---
clicks: 11
---

<div v-click="1" class="grid w-full h-full gap-3 grid-cols-5 grid-rows-3 transition-opacity duration-500">
  <header class="bg-gray-300 col-span-full rounded-lg grid p-3">
    <div class="bg-gray-400 rounded-lg grid items-center justify-center">
      <div v-click-hide="2" class="col-span-full row-span-full rounded-full w-14 h-14 flex items-center justify-center text-3xl transition-opacity duration-400">
        <div class="loader w-full h-full"></div>
      </div>
      <div v-click="2" class="col-span-full row-span-full border-4 border-green rounded-full w-14 h-14 flex items-center justify-center text-3xl transition-opacity duration-400">
        <mdi-check class="color-gray-100" />
      </div>
      <div v-click="3" class="col-span-full row-span-full bg-green rounded-full w-14 h-14 flex items-center justify-center text-3xl transition-opacity duration-400">
        <mdi-check class="color-gray-600" />
      </div>
    </div>
  </header>
  <aside class="bg-gray-300 row-[2/4] rounded-lg grid p-3">
    <div class="bg-gray-400 rounded-lg grid items-center justify-center">
      <div v-click-hide="4" class="col-span-full row-span-full rounded-full w-14 h-14 flex items-center justify-center text-3xl transition-opacity duration-400">
        <div class="loader w-full h-full"></div>
      </div>
      <div v-click="4" class="col-span-full row-span-full border-4 border-green rounded-full w-14 h-14 flex items-center justify-center text-3xl transition-opacity duration-400">
        <mdi-check class="color-gray-100" />
      </div>
      <div v-click="5" class="col-span-full row-span-full bg-green rounded-full w-14 h-14 flex items-center justify-center text-3xl transition-opacity duration-400">
        <mdi-check class="color-gray-600" />
      </div>
    </div>
  </aside>
  <main class="bg-gray-300 col-[2/6] row-[2/4] rounded-lg grid grid-cols-5 grid-rows-3 p-3 gap-3">
    <div class="bg-gray-400 col-[1/3] row-[1/4] rounded-lg grid items-center justify-center">
      <div v-click-hide="8" class="col-span-full row-span-full rounded-full w-14 h-14 flex items-center justify-center text-3xl transition-opacity duration-400">
        <div class="loader w-full h-full"></div>
      </div>
      <div v-click="8" class="col-span-full row-span-full border-4 border-green rounded-full w-14 h-14 flex items-center justify-center text-3xl transition-opacity duration-400">
        <mdi-check class="color-gray-100" />
      </div>
      <div v-click="9" class="col-span-full row-span-full bg-green rounded-full w-14 h-14 flex items-center justify-center text-3xl transition-opacity duration-400">
        <mdi-check class="color-gray-600" />
      </div>
    </div>
    <div class="bg-gray-400 col-[3/6] row-[1/3] rounded-lg grid items-center justify-center">
      <div v-click-hide="6" class="col-span-full row-span-full rounded-full w-14 h-14 flex items-center justify-center text-3xl transition-opacity duration-400">
        <div class="loader w-full h-full"></div>
      </div>
      <div v-click="6" class="col-span-full row-span-full border-4 border-green rounded-full w-14 h-14 flex items-center justify-center text-3xl transition-opacity duration-400">
        <mdi-check class="color-gray-100" />
      </div>
      <div v-click="7" class="col-span-full row-span-full bg-green rounded-full w-14 h-14 flex items-center justify-center text-3xl transition-opacity duration-400">
        <mdi-check class="color-gray-600" />
      </div>
    </div>
    <div class="bg-gray-400 col-[3/6] row-[3/4] rounded-lg grid items-center justify-center">
      <div v-click-hide="10" class="col-span-full row-span-full rounded-full w-14 h-14 flex items-center justify-center text-3xl transition-opacity duration-400">
        <div class="loader w-full h-full"></div>
      </div>
      <div v-click="10" class="col-span-full row-span-full border-4 border-green rounded-full w-14 h-14 flex items-center justify-center text-3xl transition-opacity duration-400">
        <mdi-check class="color-gray-100" />
      </div>
      <div v-click="11" class="col-span-full row-span-full bg-green rounded-full w-14 h-14 flex items-center justify-center text-3xl transition-opacity duration-400">
        <mdi-check class="color-gray-600" />
      </div>
    </div>
  </main>
</div>

---
layout: center
class: 'text-center'
---

# 쇼케이스: 간단한 실전 스트리밍 SSR

## (with NextJS 13 Layouts)

---

# 코드를 읽기 전에

<v-clicks>

- `use`에 관하여

- 어떻게 사용해야 하는가?

- `cache` 사용하기

</v-clicks>

---

# `use`

<v-clicks>

- 리액트 컴포넌트의 렌더링을 중단시키기 위해 사용되는 Hook

- `use`에 넘긴 Promise가 완료되기 전까지 해당 컴포넌트의 렌더링이 중단됨

- 다른 Hook들과는 달리, Rules of Hooks를 적용받지 않음

  - 조건문 내에서 호출 가능, ...

</v-clicks>

---

# 어떻게 사용해야 하는가?

<v-clicks>

- `use`는 호출되는 즉시 컴포넌트의 렌더링을 중단시킴

  - 즉, 별도 조건 없이 `use`를 매 렌더링마다 불렀다간 해당 컴포넌트는 영원히 렌더링되지 않을 것임

- 일반적으로 `use`와 Suspense는 데이터 로딩을 위해서 사용됨

- 데이터가 로딩되지 않은 경우에만 `use`해야 함

</v-clicks>
