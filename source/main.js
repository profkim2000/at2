import './style.css';

// 시험문제: 1번. Open Street Map을 사용하기 위해 import 한다.
// 여기가 답 자리. 이 줄을 지우고 답을 적으세요.

// 팝업창을 위해
import { Overlay} from 'ol';

import {Map, View} from 'ol';
import TileLayer from 'ol/layer/Tile';

// geoserver에서 WFS 방식으로 가져오기 위해
import {Vector as VectorLayer} from 'ol/layer';
import VectorSource from 'ol/source/Vector';
import { GeoJSON } from 'ol/format';
import { Style } from 'ol/style';
import { Circle } from 'ol/style';
import { Stroke } from 'ol/style';
import { Fill } from 'ol/style';

// view와의 상호작용을 위해 
import { Select, defaults } from 'ol/interaction';
import { pointerMove, click } from 'ol/events/condition';



// 테스트 환경과 실제 tomcat 서버에 올렸을 때의 url이 다르니 g_url 변수를 이용한다.
const g_url = "http://localhost:42888";

/**
 * CQL 필터 만들기. 모든 CQL은 이 함수를 통한다.
 */
function getCQL()
{
  let sCQL = "";

  // 시험문제 2번. 전화번호가 063-247-3251 인 업체를 찾도록 CQL_Filter를 설정한다. (가장 마지막에 푸세요)
  // 여기가 답 자리. 이 줄을 지우고 답을 적으세요.

  return sCQL;
}

// geoserver에서 WFS 방식으로 자료를 받아와 openLayers에서 소스로 사용하도록 한다.
let surl = g_url;

// 시험문제 3번. geoserver에서 WFS 방식으로 자료를 받아오도록 URL을 구성한다.
// 여기가 답 자리. 이 줄을 지우고 답을 적으세요.
surl = surl + "&outputFormat=application/json";
surl = surl + "&CQL_FILTER=";
surl += getCQL();
const wfsSource = new VectorSource
(
  {
    format: new GeoJSON(),        
    url: encodeURI(surl)
  }
);


// 위에서 wfs로 받아온 벡터 소스를 openLayers의 vector layer에 올린다.
// 더 잘 보이게 스타일도 고친다.
const wfsLayer = new VectorLayer
(
  {
    source: wfsSource, 
    style: new Style
    (
       {
         image: new Circle
         (
           {
             stroke: new Stroke
             (
               {
                 color: 'rgba(0, 0, 255, 1.0)',
                 width: 3
               }
             ),
             radius: 5, 
             fill: new Fill
             (
               {
                 color: 'rgba(255, 0, 255, 0.5)'
               }
             )

           }
         ), 

         stroke: new Stroke
         (
           {
             color: 'rgba(0, 0, 255, 1.0)',
             width: 5
           }
         ),

         fill: new Fill
         (
           {
             color: 'rgba(0, 0, 255, 0.5)'
           }
         )
       }
    ) 
  }
);


// osm 레이어를 만든다.
const osmLayer = new TileLayer
(
  {
    source: new OSM()
  }
);


// 마우스가 WFS 점 위로 올라갈 때(hover) 처리
const mouseHoverSelect = new Select
(
  {
    condition: pointerMove,
    style: new Style
    (
      {
        image: new Circle
        (
          {
            stroke: new Stroke
            (
              {
                color: 'rgba(255, 0, 0, 1.0)',
                width: 5
              }
            ),
            radius: 8, 
            fill: new Fill
            (
              {
                color: 'rgba(255, 0, 255, 0.5)'
              }
            )

          }
        ), 

        stroke: new Stroke
        (
          {
            color: 'rgba(0, 0, 255, 1.0)',
            width: 5
          }
        ),

        fill: new Fill
        (
          {
            color: 'rgba(0, 0, 255, 0.5)'
          }
        )
      }
   )
  }
);


// 마우스로 점을 클릭하면 흰색 선으로 굵게 표시한다.
const mouseClickSelect = new Select
(
  {
    condition: click,
    style: new Style
    (
      {
        image: new Circle
        (
          {
            stroke: new Stroke
            (
              {                
                // 시험문제 4번. 선을 가장 밝은 흰색으로 표시하도록 색을 설정한다.
                // 여기가 답 자리. 이 줄을 지우고 답을 적으세요.
                width: 8
              }
            ),
            radius: 10, 
            fill: new Fill
            (
              {
                color: 'rgba(255, 0, 0, 1.0)'
              }
            )

          }
        ), 

        stroke: new Stroke
        (
          {
            color: 'rgba(0, 0, 255, 1.0)',
            width: 5
          }
        ),

        fill: new Fill
        (
          {
            color: 'rgba(0, 0, 255, 0.5)'
          }
        )
      }
   )
  }
);

// WFS 점을 클릭하면 보여줄 오버레이를 만든다.

// 시험문제 5번. popup을 위한 div를 가져온다. 여기까지 다 맞으면 지도가 나타남.
// 여기가 답 자리. 이 줄을 지우고 답을 적으세요.
const overlayLayer  = new Overlay
(
  {
    element: landypop
  }
);

const map = new Map({
  target: 'map',
  layers: [osmLayer, wfsLayer],
  view: new View({
    center: [14150008.61632484, 4276815.790027254],
    zoom: 13
  }),  
  interactions: defaults().extend([mouseHoverSelect, mouseClickSelect]),
  overlays: [overlayLayer]
});

// 지도 클릭 이벤트 처리. 만약 WFS에서 어느 한 점을 클릭했으면 오버레이(popup) 처리한다.
map.on('click', (e) =>
{
  //console.log(e);

  // 일단 창을 닫는다. 이렇게 하면 자료가 없는 곳을 찍으면 창이 닫히는 효과가 나온다.
  overlayLayer.setPosition(undefined);

  // 점찍은 곳의 자료를 찾아낸다. geoserver에서는 WFS를 위해 위치 정보 뿐 아니라 메타데이터도 같이 보내고 있다.
  map.forEachFeatureAtPixel(e.pixel, (feature, layer) =>
  {
    // 이 point와 같이 넘어온 메타데이터 값을 찾는다.
    
    let id = feature.get('id');
    let name = feature.get('name');
    let addr_doro = feature.get('addr_doro');
    let addr_jibun = feature.get('addr_jibun');
    let tel = feature.get('tel');

    // 오버레이를 위한 div에 값들을 적는다.
    
    // 시험문제 6번. 오버레이의 맨 위에 표시되는 H3 크기의 제목을 클릭하면 상세 화면으로 이동하도록 설정한다.
    // 여기가 답 자리. 이 줄을 지우고 답을 적으세요.
    document.getElementById("cvs_name").innerHTML = id + ". " + name;
    document.getElementById("cvs_addr_doro").innerHTML = addr_doro;
    document.getElementById("cvs_addr_jibun").innerHTML = addr_jibun;
    document.getElementById("cvs_tel").innerHTML = tel;

    // 오버레이 창을 띄운다.
    overlayLayer.setPosition(e.coordinate);
  })
}
);