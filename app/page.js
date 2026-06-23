"use client";
/* eslint-disable */
// K-POP 스타일 시뮬레이터 — 단일 페이지 포팅(엔진 원본 그대로). 화면은 #shell에 렌더됩니다.
import { useEffect, useRef, useState } from "react";

export default function Page() {
  const booted = useRef(false);
  const [clock, setClock] = useState("");
  useEffect(() => {
    if (booted.current) return;
    booted.current = true;
    bootKpopApp();
  }, []);
  useEffect(() => {
    const fmt = () => {
      const d = new Date();
      const m = d.getMinutes();
      return d.getHours() + ":" + (m < 10 ? "0" + m : m);
    };
    setClock(fmt());
    const t = setInterval(() => setClock(fmt()), 15000);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="device-stage">
      <div className="device">
        <div className="statusbar">
          <span className="sb-time">{clock || "12:30"}</span>
          <span className="sb-icons">
            <svg width="17" height="11" viewBox="0 0 17 11" fill="currentColor" aria-hidden="true"><rect x="0" y="7" width="3" height="4" rx="0.6"/><rect x="4.6" y="4.8" width="3" height="6.2" rx="0.6"/><rect x="9.2" y="2.4" width="3" height="8.6" rx="0.6"/><rect x="13.8" y="0" width="3" height="11" rx="0.6"/></svg>
            <svg width="16" height="12" viewBox="0 0 16 12" fill="currentColor" aria-hidden="true"><path d="M8 11.4l1.9-2.5a2.4 2.4 0 0 0-3.8 0L8 11.4z"/><path d="M8 4.1c2 0 3.8.8 5.2 2.1l1.3-1.5A9.2 9.2 0 0 0 8 1.9 9.2 9.2 0 0 0 1.5 4.7l1.3 1.5A7.2 7.2 0 0 1 8 4.1z" opacity="0.92"/></svg>
            <span className="sb-batt"><span className="sb-batt-fill"></span></span>
          </span>
        </div>
        <main className="app">
          <div className="shell" id="shell"></div>
        </main>
      </div>
    </div>
  );
}

function bootKpopApp() {

  "use strict";

  /* ===== 연예인 DB (스타일 블록 + 얼굴 프로필 + 시그니처) ===== */
  var CELEBS = [
    { id:"karina", name:"카리나", mood:"시크·도시적", sig:"선명한 눈매와 또렷한 윤곽",
      face:{ faceShape:"oval", eyelid:"double", eyeShape:"upturned", eyeSize:"medium", jaw:"vline", skinTone:"cool" },
      blocks:{ skin:"세미매트~글로우", brow:"각진 일자 눈썹", shadow:"브라운 음영 섀도우", eyeliner:"또렷한 슬림 윙 라인", aegyo:"은은한 애교살", shading:"광대 아래·턱선 윤곽", blush:"은은한 로즈", lip:"로즈~누드 새틴", hair:"슬릭/웨이브" } },
    { id:"winter", name:"윈터", mood:"청량·시크", sig:"청량하고 또렷한 눈매",
      face:{ faceShape:"oval", eyelid:"double", eyeShape:"neutral", eyeSize:"medium", jaw:"vline", skinTone:"cool" },
      blocks:{ skin:"글로우 피부", brow:"자연 일자 눈썹", shadow:"코랄브라운 섀도우", eyeliner:"또렷하되 부드러운 라인", aegyo:"애교살 살짝", shading:"약한 윤곽", blush:"코랄 블러셔", lip:"MLBB 코랄", hair:"자연 결" } },
    { id:"jennie", name:"제니", mood:"도도·트렌디", sig:"무드 있는 눈매와 시크함",
      face:{ faceShape:"round", eyelid:"double", eyeShape:"upturned", eyeSize:"medium", jaw:"round", skinTone:"neutral" },
      blocks:{ skin:"글로시 피부", brow:"또렷한 눈썹", shadow:"브라운 스모키", eyeliner:"스모키 라인", aegyo:"은은한 애교살", shading:"윤곽 강조", blush:"로즈브라운", lip:"글로시 누드~로즈", hair:"뱅/웨이브" } },
    { id:"wonyoung", name:"장원영", mood:"청순·러블리", sig:"화사하고 러블리한 눈매",
      face:{ faceShape:"oval", eyelid:"double", eyeShape:"neutral", eyeSize:"large", jaw:"vline", skinTone:"warm" },
      blocks:{ skin:"화사한 피부", brow:"자연 둥근 눈썹", shadow:"핑크/코랄 섀도우", eyeliner:"또렷+러블리 라인", aegyo:"애교살 밝게", shading:"약한 윤곽", blush:"핑크 애플", lip:"핑크 그라데이션", hair:"롱 웨이브" } },
    { id:"yujin", name:"안유진", mood:"상큼·사랑스러움", sig:"맑고 또렷한 상큼함",
      face:{ faceShape:"oval", eyelid:"double", eyeShape:"neutral", eyeSize:"medium", jaw:"vline", skinTone:"neutral" },
      blocks:{ skin:"깨끗한 피부", brow:"자연 눈썹", shadow:"코랄핑크 섀도우", eyeliner:"또렷한 라인", aegyo:"애교살 강조", shading:"약한 윤곽", blush:"코랄 블러셔", lip:"화사한 코랄", hair:"단정한 스타일" } },
    { id:"iu", name:"아이유", mood:"청순·내추럴", sig:"맑은 피부와 자연스러운 눈매",
      face:{ faceShape:"oval", eyelid:"double", eyeShape:"neutral", eyeSize:"medium", jaw:"vline", skinTone:"warm" },
      blocks:{ skin:"맑은 피부", brow:"자연 결 눈썹", shadow:"누드/코랄 섀도우", eyeliner:"옅은 자연 라인", aegyo:"애교살 자연", shading:"최소 윤곽", blush:"누드핑크", lip:"MLBB~코랄 틴트", hair:"단아한 스타일" } },
  ];

  /* ===== 보정 DB (그룹 = 패치 우선순위) ===== */
  var CORR = {
    "v-line":            { label:"V라인 턱선",   group:"턱선", blocks:{ shading:"턱끝~귀밑 사선 쉐딩+턱끝 하이라이트" } },
    "jaw-soften":        { label:"턱선 완화",     group:"턱선", blocks:{ shading:"턱 각 부드럽게 블렌딩" } },
    "midface-short":     { label:"중안부 단축",   group:"쉐딩", blocks:{ blush:"광대 위 높게 배치", shading:"노즈 섀도우로 길이 분배" } },
    "eyelid-monolid":    { label:"무쌍 보정",     group:"눈",   blocks:{ eyeliner:"무쌍용 그라데이션+속쌍 라인으로 또렷", shadow:"음영으로 깊이" } },
    "eyelid-inner":      { label:"속쌍 보정",     group:"눈",   blocks:{ eyeliner:"속쌍 라인 또렷하게" } },
    "eye-enlarge":       { label:"눈 확대",       group:"눈",   blocks:{ eyeliner:"키치+앞트임으로 확장", aegyo:"애교살 밝게+언더 펄", shadow:"중앙 밝게 돔 그라데이션" } },
    "eye-droop-lift":    { label:"처진 눈 보정",  group:"눈",   blocks:{ eyeliner:"눈꼬리 살짝 상승 라인" } },
    "eye-upturn-soften": { label:"올라간 눈 완화", group:"눈",  blocks:{ eyeliner:"부드러운 일자 라인" } },
    "tone-cool":         { label:"쿨톤 매칭",     group:"피부톤", blocks:{ skin:"핑크빛 쿨 베이스", blush:"쿨 로즈", lip:"쿨 로즈/모브" } },
    "tone-warm":         { label:"웜톤 매칭",     group:"피부톤", blocks:{ skin:"피치/옐로우 웜 베이스", blush:"코랄", lip:"코랄/웜 누드" } },
    "tone-neutral":      { label:"뉴트럴 매칭",   group:"피부톤", blocks:{ skin:"뉴트럴 베이스", blush:"뉴트럴 로즈" } },
  };
  var BY_AXIS = {
    faceShape: { round:"v-line", square:"v-line", oblong:"midface-short", heart:null, oval:null },
    eyelid:    { monolid:"eyelid-monolid", inner:"eyelid-inner", double:null },
    eyeShape:  { downturned:"eye-droop-lift", upturned:"eye-upturn-soften", neutral:null },
    eyeSize:   { small:"eye-enlarge", medium:null, large:null },
    jaw:       { square:"jaw-soften", round:null, vline:null },
  };
  // 패치 우선순위: 1 눈 · 2 피부톤 · 3 턱선 · 4 쉐딩 · 5 립 · 6 헤어
  var GROUP_PRIORITY = { "눈":1, "피부톤":2, "턱선":3, "쉐딩":4, "립":5, "헤어":6 };

  /* ===== 세트 DB (대표 프로필 + 보정, 연예인 공통 템플릿) ===== */
  var TEMPLATES = [
    { tag:"VLINE",  profile:{ faceShape:"round",  eyelid:"double", eyeShape:"neutral", eyeSize:"medium", jaw:"round" },  corrections:["v-line"] },
    { tag:"SQUARE", profile:{ faceShape:"square", eyelid:"double", eyeShape:"neutral", eyeSize:"medium", jaw:"square" }, corrections:["v-line","jaw-soften"] },
    { tag:"LONG",   profile:{ faceShape:"oblong", eyelid:"double", eyeShape:"neutral", eyeSize:"medium", jaw:"vline" },  corrections:["midface-short"] },
    { tag:"HEART",  profile:{ faceShape:"heart",  eyelid:"double", eyeShape:"neutral", eyeSize:"medium", jaw:"vline" },  corrections:[] },
    { tag:"BASE",   profile:{ faceShape:"oval",   eyelid:"double", eyeShape:"neutral", eyeSize:"medium", jaw:"vline" },  corrections:[] },
  ];
  var CORE_AXES = ["faceShape","eyelid","eyeShape","eyeSize","jaw"];

  /* ===== 얼굴 분석 — 다축 (6축) ===== */
  var AXES = [
    { key:"faceShape", label:"얼굴형", def:"oval",   options:[["round","둥근형"],["square","각진형"],["oblong","긴형"],["heart","하트형"],["oval","계란형"]] },
    { key:"eyelid",    label:"눈꺼풀", def:"double", options:[["monolid","무쌍"],["inner","속쌍"],["double","유쌍"]] },
    { key:"eyeShape",  label:"눈매",   def:"neutral",options:[["downturned","처진눈"],["upturned","올라간눈"],["neutral","중립형"]] },
    { key:"eyeSize",   label:"눈 크기",def:"medium", options:[["small","작은눈"],["medium","보통"],["large","큰눈"]] },
    { key:"jaw",       label:"턱",     def:"vline",  options:[["round","둥근턱"],["square","각진턱"],["vline","브이라인"]] },
    { key:"skinTone",  label:"피부톤", def:"neutral",options:[["warm","웜톤"],["cool","쿨톤"],["neutral","뉴트럴"]] },
  ];
  function defaultProfile(){ var p={}; AXES.forEach(function(a){ p[a.key]=a.def; }); return p; }
  function axisLabel(k){ var a=AXES.filter(function(x){return x.key===k;})[0]; return a?a.label:k; }
  function valLabel(k,v){ var a=AXES.filter(function(x){return x.key===k;})[0]; if(!a)return v; var o=a.options.filter(function(p){return p[0]===v;})[0]; return o?o[1]:v; }

  // STEP7 1차: 사진 자동 분석 슬롯(비전 모델). 현재 미연결 → 빈 결과.
  function analyzePhoto(_image){ return {}; }
  // 자동 분석 결과가 있으면 우선, 없으면 자가진단(확인값)
  function resolveProfile(photo, manual){ var out={}; AXES.forEach(function(a){ out[a.key]=(photo&&photo[a.key])||manual[a.key]; }); return out; }

  /* ===== 엔진 ===== */
  function celebById(id){ return CELEBS.filter(function(c){return c.id===id;})[0]; }

  function searchSet(celeb, p){
    var best=null, bestScore=-1;
    TEMPLATES.forEach(function(t){
      var sc=0; if(t.profile.faceShape===p.faceShape) sc+=3;
      ["eyelid","eyeShape","eyeSize","jaw"].forEach(function(k){ if(t.profile[k]===p[k]) sc+=1; });
      if(sc>bestScore){ bestScore=sc; best=t; }
    });
    return { id:celeb.name+"_"+best.tag+"_01", tag:best.tag, profile:best.profile, corrections:best.corrections, score:bestScore };
  }

  // 차이 계산 + 필요한 블록만 패치 (세트 대비 얼굴축 + 연예인 대비 피부톤)
  function computePatches(set, p, celeb){
    var out=[];
    CORE_AXES.forEach(function(ax){
      if(p[ax]!==set.profile[ax]){ var cid=BY_AXIS[ax][p[ax]]; if(cid) out.push({ id:cid, axis:ax, val:p[ax] }); }
    });
    if(p.skinTone!==celeb.face.skinTone){ out.push({ id:"tone-"+celeb.face.skinTone, axis:"skinTone", val:p.skinTone }); }
    out.sort(function(a,b){ return GROUP_PRIORITY[CORR[a.id].group]-GROUP_PRIORITY[CORR[b.id].group]; });
    return out;
  }

  function matchedFeatures(set, p, celeb){
    var m=[];
    CORE_AXES.forEach(function(ax){ if(p[ax]===set.profile[ax]) m.push({axis:ax,val:p[ax]}); });
    if(p.skinTone===celeb.face.skinTone) m.push({axis:"skinTone",val:p.skinTone});
    return m;
  }

  function compose(celeb, setCorr, patches){
    var blocks={}; Object.keys(celeb.blocks).forEach(function(k){ blocks[k]={ base:celeb.blocks[k], add:[] }; });
    function apply(cid){ var c=CORR[cid]; Object.keys(c.blocks).forEach(function(b){ if(!blocks[b])blocks[b]={base:"",add:[]}; blocks[b].add.push(c.blocks[b]); }); }
    setCorr.forEach(apply); patches.forEach(function(x){ apply(x.id); });
    return blocks;
  }

  function gradeOf(n){ return n===0?["매우 잘 맞음","g1"]:n<=2?["잘 맞음","g2"]:n<=4?["일부 보정 필요","g3"]:["보정 많이 필요","g4"]; }

  var GROUP_FRIENDLY={"눈":"눈매","피부톤":"피부톤","턱선":"턱선","쉐딩":"쉐딩","립":"립","헤어":"헤어"};
  function buildReasons(celeb, patches){
    var sig=celeb.name+" 스타일은 "+celeb.sig+"이(가) 중요해요.";
    if(!patches.length) return [sig, "얼굴 특징에 잘 맞아 추가 보정이 거의 없어요."];
    var seen={}, areas=[];
    patches.forEach(function(x){ var g=GROUP_FRIENDLY[CORR[x.id].group]||CORR[x.id].group; if(!seen[g]){seen[g]=1;areas.push(g);} });
    return [sig, "그래서 "+areas.join("·")+"만 보정했어요."];
  }

  var AXIS_AREA={faceShape:"윤곽",eyelid:"눈",eyeShape:"눈",eyeSize:"눈",jaw:"턱선",skinTone:"피부톤"};
  var CMP_AXES=["faceShape","eyelid","eyeShape","eyeSize","jaw","skinTone"];
  function gradeByMatch(n){ return n>=5?["매우 잘 맞음","g1"]:n===4?["잘 맞음","g2"]:n>=2?["일부 보정 필요","g3"]:["보정 많이 필요","g4"]; }
  function compareCelebs(p){
    var arr=CELEBS.map(function(c){
      var matched=[],areas=[];
      CMP_AXES.forEach(function(ax){ if(p[ax]===c.face[ax]) matched.push({axis:ax,val:p[ax]}); else { var a=AXIS_AREA[ax]; if(areas.indexOf(a)<0)areas.push(a); } });
      var sc=matched.length*10+(p.faceShape===c.face.faceShape?3:0)+(p.skinTone===c.face.skinTone?2:0);
      return {celebId:c.id,name:c.name,mood:c.mood,matchCount:matched.length,grade:gradeByMatch(matched.length),matched:matched,needsWork:areas,_s:sc};
    });
    arr.sort(function(a,b){return b._s-a._s;});
    return arr;
  }

  function optimize(celebId, manual, selfie){
    var celeb=celebById(celebId);
    var profile=resolveProfile(analyzePhoto(selfie), manual);
    var set=searchSet(celeb, profile);
    var patches=computePatches(set, profile, celeb);
    var blocks=compose(celeb, set.corrections, patches);
    return { celeb:celeb, profile:profile, set:set, patches:patches, blocks:blocks,
             matched:matchedFeatures(set,profile,celeb), grade:gradeOf(patches.length), reasons:buildReasons(celeb,patches), ranking:compareCelebs(profile) };
  }

  /* ===== 상태/렌더 ===== */
  var S = { phase:"landing", selfie:null, celebId:null, profile:defaultProfile(), result:null, guideStep:0, mode:null, checks:{}, resultImage:null, genStatus:null, genError:null, error:null };
  var root=document.getElementById("shell");
  function esc(s){ return String(s).replace(/[&<>"]/g,function(c){return({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"})[c];}); }

  var META={
    upload:{ n:1, eyebrow:"STEP 1 · 셀카", title:"셀카를 올려주세요", sub:"따라하기 비교용으로 사용해요." },
    celeb:{ n:2, eyebrow:"STEP 2 · 롤모델", title:"닮고 싶은 스타일", sub:"기준이 될 연예인을 선택하세요." },
    diagnose:{ n:3, eyebrow:"STEP 3 · 얼굴 분석", title:"내 얼굴 유형 확인", sub:"자동 분석(비전 모델)은 추후 연결 — 지금은 직접 확인/선택하면 우선값으로 써요." },
    result:{ n:4, eyebrow:"STEP 4 · 최적화", title:"내가 선택한 스타일 결과", sub:"" },
    overview:{ n:5, eyebrow:"STEP 5 · 가이드 개요", title:"따라하기 준비", sub:"몇 단계인지·얼마나 걸리는지 보고 모드를 골라요." },
    guide:{ n:5, eyebrow:"STEP 5 · 따라하기", title:"이대로 따라하면 돼요", sub:"" },
  };
  var TOTAL=5;
  var CAM='<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3Z"/><circle cx="12" cy="13" r="3.2"/></svg>';

  function resizeToDataUrl(file,max){ max=max||1024; return new Promise(function(res,rej){ if(!file||!/^image\//.test(file.type||"")){rej(new Error("이미지 파일을 선택해 주세요."));return;} var r=new FileReader(); r.onload=function(){ var du=r.result; var img=new Image(); img.onload=function(){ try{ var sc=Math.min(1,max/Math.max(img.width,img.height)); var w=Math.round(img.width*sc),h=Math.round(img.height*sc); var c=document.createElement("canvas"); c.width=w;c.height=h; c.getContext("2d").drawImage(img,0,0,w,h); res(c.toDataURL("image/jpeg",0.85)); }catch(e){ res(du); } }; img.onerror=function(){res(du);}; img.src=du; }; r.onerror=function(){rej(new Error("파일을 읽을 수 없습니다."));}; r.readAsDataURL(file); }); }
  function go(p){ S.phase=p; S.error=null; render(); }

  function landingBody(){
    return '<div class="landing">'
      +'<p class="landing-eyebrow">K-POP STYLE</p>'
      +'<h1 class="landing-title">내 얼굴에 맞는<br><b>K-POP 스타일</b> 찾기</h1>'
      +'<p class="landing-sub">셀카와 얼굴 유형으로 가장 잘 어울리는 아이돌 스타일을 찾고, 따라하기 가이드까지 한 번에.</p>'
      +'<div class="landing-steps">'
      +'<div class="landing-step"><span class="n">1</span><span class="t"><b>얼굴 분석</b> <span>· 얼굴형·눈·피부톤 유형</span></span></div>'
      +'<div class="landing-step"><span class="n">2</span><span class="t"><b>스타일 매칭</b> <span>· 가장 잘 맞는 연예인 세트 검색</span></span></div>'
      +'<div class="landing-step"><span class="n">3</span><span class="t"><b>따라하기</b> <span>· 단계별 메이크업 가이드</span></span></div>'
      +'</div>'
      +'<button class="btn" id="to-start">시작하기</button>'
      +'</div>';
  }
  function render(){
    if(S.phase==="landing"){ root.innerHTML=landingBody(); bind(); return; }
    var m=META[S.phase], prog=Math.min(100,(m.n/TOTAL)*100), canBack=true;
    var h='<div class="topbar"><button class="back" id="back"'+(canBack?"":" disabled")+' aria-label="뒤로"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg></button><div class="progress"><div class="progress-fill" style="width:'+prog+'%"></div></div><span class="step-count">'+m.n+" / "+TOTAL+'</span></div>';
    h+='<p class="eyebrow">'+m.eyebrow+'</p><h1 class="h1">'+m.title+"</h1>";
    if(m.sub) h+='<p class="sub">'+m.sub+"</p>";
    if(S.error) h+='<div class="error">'+esc(S.error)+"</div>";
    h+=bodyFor(S.phase); root.innerHTML=h; bind();
  }
  function bodyFor(p){ if(p==="upload")return uploadBody(); if(p==="celeb")return celebBody(); if(p==="diagnose")return diagnoseBody(); if(p==="result")return resultBody(); if(p==="overview")return overviewBody(); if(p==="guide")return guideBody(); return ""; }

  function uploadBody(){
    var out = S.selfie
      ? '<div class="uploaded"><img src="'+S.selfie+'" alt="셀카"><button class="retake" data-retake="selfie">다시 선택</button><input type="file" accept="image/*" hidden data-pick="selfie"></div>'
      : '<label class="drop"><input type="file" accept="image/*" hidden data-pick="selfie"><span class="ic">'+CAM+'</span><span class="t">셀카 업로드</span><span class="h">탭해서 사진 선택 또는 촬영</span></label>';
    out+='<div class="fixed-cta"><button class="btn" id="to-celeb"'+(S.selfie?"":" disabled")+">다음</button></div>"; return out;
  }
  function celebBody(){
    var out='<div class="styles">';
    CELEBS.forEach(function(c){ var sel=S.celebId===c.id;
      out+='<button class="style-card'+(sel?" sel":"")+'" data-celeb="'+c.id+'"><span class="style-main"><span class="style-name">'+esc(c.name)+'</span><span class="style-tagline">'+esc(c.mood)+'</span></span><span class="style-check">'+(sel?'<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>':"")+"</span></button>"; });
    out+='</div><div class="fixed-cta"><button class="btn" id="to-diagnose"'+(S.celebId?"":" disabled")+">다음</button></div>"; return out;
  }
  function diagnoseBody(){
    var out="";
    AXES.forEach(function(a){
      out+='<div class="qblock"><p class="qlabel">'+a.label+'</p><div class="chips-opt">';
      a.options.forEach(function(o){ var sel=S.profile[a.key]===o[0]; out+='<button class="chip-opt'+(sel?" sel":"")+'" data-q="'+a.key+'" data-v="'+o[0]+'">'+esc(o[1])+"</button>"; });
      out+="</div></div>";
    });
    out+='<div class="fixed-cta"><button class="btn" id="to-result">최적화 결과 보기</button></div>'; return out;
  }
  function resultBody(){
    var r=S.result;
    var out="";
    // 1. 결과 이미지 (셀카, 원본)
    if(S.selfie){ out+='<div class="result-photo"><img src="'+S.selfie+'" alt="내 사진"><span class="mock-badge">스타일 적용 전 · 원본</span></div>'; out+=genBlock(r); }
    // 2. 선택한 연예인
    out+='<div class="sec-title">선택한 연예인</div><p class="reason-text"><b>'+esc(r.celeb.name)+'</b> 스타일</p>';
    // 3. 선택된 세트
    out+='<div class="set-card"><div class="lbl">선택된 세트</div><div class="val">'+esc(r.set.id)+'</div><span class="grade '+r.grade[1]+'">'+esc(r.grade[0])+'</span></div>';
    // 4. 일치한 특징
    out+='<div class="sec-title">일치한 특징</div><div class="feat-chips">';
    if(r.matched.length){ r.matched.forEach(function(x){ out+='<span class="chip match">'+esc(valLabel(x.axis,x.val))+"</span>"; }); } else { out+='<span class="sub" style="margin:0">없음</span>'; }
    out+="</div>";
    // 5. 보정한 특징
    out+='<div class="sec-title">보정한 특징</div><div class="feat-chips">';
    if(r.patches.length){ r.patches.forEach(function(x){ out+='<span class="chip">'+esc(valLabel(x.axis,x.val))+"</span>"; }); } else { out+='<span class="sub" style="margin:0">없음 (그대로 잘 맞아요)</span>'; }
    out+="</div>";
    // 6. 적용 이유
    out+='<div class="sec-title">적용 이유</div><p class="reason-text">'+esc(r.reasons.join(" "))+'</p>';
    // 7. 추천 TOP 3 (참고용)
    out+='<div class="sec-title">나에게 더 잘 맞는 연예인 추천 TOP 3</div>';
    out+='<p class="rec-hint">'+(r.ranking[0].celebId===r.celeb.id?"현재 선택한 스타일이 입력한 얼굴 특징 기준으로 가장 잘 맞아요.":"현재 선택한 "+esc(r.celeb.name)+" 스타일도 적용 가능해요. 다만 입력한 얼굴 특징 기준으로는 "+esc(r.ranking[0].name)+" 스타일이 조금 더 자연스럽게 어울릴 수 있어요. 추천은 참고용이며, 원하는 스타일을 그대로 적용할 수도 있어요.")+'</p>';
    out+='<div class="rank-list">';
    r.ranking.slice(0,3).forEach(function(mm,i){
      out+='<div class="rank-card'+(i===0?" top":"")+'"><div class="rank-head"><span class="rank-num">'+(i+1)+'</span><span class="rank-name">'+esc(mm.name)+'<span class="rank-mood"> '+esc(mm.mood)+'</span></span><span class="grade '+mm.grade[1]+'" style="margin-top:0">'+esc(mm.grade[0])+'</span></div><div class="rank-body"><div class="rank-line"><span class="k">일치</span>'+(mm.matched.length?mm.matched.map(function(x){return '<span class="mini-chip ok">'+esc(valLabel(x.axis,x.val))+'</span>';}).join(""):'<span class="mini-chip ok">없음</span>')+'</div>'+(mm.needsWork.length?'<div class="rank-line"><span class="k">보정 필요</span>'+mm.needsWork.map(function(a){return '<span class="mini-chip fix">'+esc(a)+'</span>';}).join("")+'</div>':"")+'</div><button class="rank-switch'+(mm.celebId===r.celeb.id?" cur":"")+'"'+(mm.celebId===r.celeb.id?" disabled":"")+' data-switch="'+mm.celebId+'">'+(mm.celebId===r.celeb.id?"현재 선택됨":"이 스타일로 다시 보기")+'</button></div>';
    });
    out+="</div>";
    out+='<div class="fixed-cta"><button class="btn" id="to-guide">따라하기</button><div style="height:10px"></div><button class="btn-ghost" id="to-celeb2">다른 스타일</button></div>'; return out;
  }
  var HOW_TO={
    monolid_fix:["아이라인을 점막부터 채워 또렷하게","속쌍 라인을 그려 입체감 주기","섀도우로 음영 깊이 만들기"],
    inner_double_fix:["속쌍 라인을 따라 또렷하게 그리기","섀도우로 라인 자연스럽게 연결"],
    eye_bigger:["아이라인을 눈꼬리 밖으로 살짝 연장","애교살에 밝은 펄 올리기","언더라인 뒤쪽 1/3 강조","속눈썹 컬링 + 마스카라"],
    "eyelid-monolid":["아이라인을 점막부터 채워 또렷하게","속쌍 라인을 그려 입체감 주기"],
    downturned_fix:["눈꼬리 라인을 살짝 올려 그리기","언더 섀도우로 처짐 보완"],
    upturned_fix:["눈꼬리 라인을 부드러운 일자로 그리기"],
    "eye-droop-lift":["눈꼬리 라인을 살짝 올려 그리기"],
    "eye-upturn-soften":["눈꼬리 라인을 부드러운 일자로 그리기"],
    "eyelid-inner":["속쌍 라인을 따라 또렷하게 그리기"],
    "eye-enlarge":["아이라인을 눈꼬리 밖으로 살짝 연장","애교살에 밝은 펄 올리기","언더라인 뒤쪽 1/3 강조","속눈썹 컬링 + 마스카라"],
    vline_contour:["턱끝~귀밑을 사선으로 쉐딩","턱끝에 하이라이트","경계를 충분히 블렌딩"],
    "v-line":["턱끝~귀밑을 사선으로 쉐딩","턱끝에 하이라이트","경계를 충분히 블렌딩"],
    jaw_soften:["각진 턱 모서리를 쉐딩으로 완화","턱선을 따라 자연스럽게 블렌딩"],
    "jaw-soften":["각진 턱 모서리를 쉐딩으로 완화","턱선을 따라 자연스럽게 블렌딩"],
    midface_short:["코 밑·인중 음영을 최소화","블러셔를 광대 위쪽에 배치"],
    "midface-short":["코 밑·인중 음영을 최소화","블러셔를 광대 위쪽에 배치"],
    cool_tone_match:["쿨 로즈·모브 립 바르기","입술 중앙에 하이라이트","입술 외곽 정리"],
    warm_tone_match:["코랄·웜 누드 립 바르기","입술 중앙에 하이라이트","입술 외곽 정리"],
    neutral_tone_match:["뉴트럴 로즈 립 바르기","자연스럽게 블렌딩"],
    "tone-cool":["쿨 로즈·모브 립 바르기","입술 중앙에 하이라이트","입술 외곽 정리"],
    "tone-warm":["코랄·웜 누드 립 바르기","입술 중앙에 하이라이트","입술 외곽 정리"],
    "tone-neutral":["뉴트럴 로즈 립 바르기","자연스럽게 블렌딩"]
  };
  /* ===== STEP 5 · Guide Overview + Reverse Makeup Guide (v5 · 모드 선택) =====
     새 엔진 없음(optimize/compare/recommend 그대로). 결과 → 개요 → 모드별 따라하기.
     단계는 연예인 블록 + 보정 패치 기반으로 필수/선택 자동 분류. 실사진 위 오버레이는 폐기 → 도식 SVG. */
  // 따라하기 단계 카탈로그(순서 고정). region=도식 얼굴 영역, block=연예인 블록(없으면 일반 동작), tier=core/cond/major/extra
  var STEP_CAT=[
    { key:"base", label:"베이스", region:"base", block:"skin", groups:["피부톤"], tier:"core",
      tools:["쿠션·파운데이션","컨실러","파우더"],
      spots:[{l:"피부 전체",w:"이마·볼·코·턱"},{l:"붉은기",w:"코·볼 안쪽 정리",c:"lilac"}] },
    { key:"brow", label:"눈썹", region:"brow", block:"brow", groups:[], tier:"core",
      tools:["브로우 펜슬","브로우 마스카라"],
      spots:[{l:"눈썹 앞",w:"코쪽 눈썹 머리"},{l:"눈썹 꼬리",w:"관자쪽 눈썹 끝",c:"lilac"}] },
    { key:"shadow", label:"아이섀도우", region:"eye", block:"shadow", groups:[], tier:"major",
      tools:["아이섀도우 팔레트"],
      spots:[{l:"눈두덩",w:"베이스 섀도우",c:"lilac"},{l:"눈꼬리",w:"포인트 섀도우",c:"pink"}] },
    { key:"eyeliner", label:"아이라인", region:"eye", block:"eyeliner", groups:["눈"], tier:"cond", req:"eye",
      tools:["아이라이너"],
      spots:[{l:"아이라인",w:"속눈썹 라인~눈꼬리",c:"pink"},{l:"언더",w:"눈꼬리 아래 1/3",c:"pink"}] },
    { key:"aegyo", label:"애교살", region:"eye", block:"aegyo", groups:["눈"], tier:"cond", req:"eye",
      tools:["애교살 섀도우"],
      spots:[{l:"애교살",w:"눈 밑 도톰한 부분",c:"lilac"}] },
    { key:"lash", label:"속눈썹", region:"eye", block:null, groups:[], tier:"cond", req:"lash",
      tools:["뷰러","마스카라"],
      generic:["뷰러로 속눈썹 뿌리부터 컬링","마스카라 지그재그로 올리기","뭉친 부분 빗으로 정리"],
      spots:[{l:"속눈썹",w:"눈 위 전체",c:"pink"}] },
    { key:"contour", label:"쉐딩", region:"contour", block:"shading", groups:["턱선","쉐딩"], tier:"cond", req:"contour",
      tools:["쉐딩 파우더"],
      spots:[{l:"턱선 음영",w:"턱끝~귀밑 사선",c:"pink"},{l:"턱끝 하이라이트",w:"턱 가운데 끝",c:"lilac"}] },
    { key:"highlight", label:"하이라이터", region:"contour", block:null, groups:[], tier:"extra",
      tools:["하이라이터"],
      generic:["콧대·광대 위에 하이라이트","눈 밑 세모존 살짝","경계 톡톡 블렌딩"],
      spots:[{l:"하이라이트",w:"콧대·광대·턱끝",c:"lilac"}] },
    { key:"blush", label:"블러셔", region:"base", block:"blush", groups:[], tier:"major",
      tools:["블러셔"],
      spots:[{l:"볼",w:"광대 위쪽",c:"lilac"}] },
    { key:"lip", label:"립", region:"lip", block:"lip", groups:["피부톤"], tier:"core",
      relabel:{ "tone-cool":"쿨 로즈·모브 립","tone-warm":"코랄·웜 누드 립","tone-neutral":"뉴트럴 로즈 립" },
      tools:["립 제품"],
      spots:[{l:"립 중앙",w:"입술 가운데 밝게",c:"pink"},{l:"립 외곽",w:"입술 경계 정리",c:"lilac"}] },
    { key:"hair", label:"헤어", region:"hair", block:"hair", groups:[], tier:"core",
      tools:["헤어 제품(고데기·왁스)"],
      spots:[{l:"가르마",w:"정수리 가르마 라인"},{l:"얼굴 라인",w:"양쪽 옆머리",c:"lilac"}] }
  ];

  function activeCorrs(r){ var a=[]; ((r.set&&r.set.corrections)||[]).forEach(function(c){ if(a.indexOf(c)<0)a.push(c); }); r.patches.forEach(function(p){ if(a.indexOf(p.id)<0)a.push(p.id); }); return a; }
  function hasGroup(active,g){ return active.some(function(cid){ return CORR[cid] && CORR[cid].group===g; }); }
  function stepRequired(step,r,active){
    if(step.tier==="core") return true;
    if(step.tier==="cond"){
      if(step.req==="eye") return hasGroup(active,"눈");
      if(step.req==="contour") return hasGroup(active,"턱선")||hasGroup(active,"쉐딩");
      if(step.req==="lash") return r.profile.eyeSize==="small"||r.profile.eyelid==="monolid";
    }
    return false;
  }
  function inMode(s,mode){
    if(mode==="fast") return s.tier==="core" || (s.tier==="cond" && s.required);
    if(mode==="standard") return s.tier==="core"||s.tier==="cond"||s.tier==="major";
    return true; // expert / 기본
  }
  function goalForStep(c,k){ return ({
    base:c+" 톤의 깨끗한 피부",
    brow:c+" 스타일 눈썹 라인",
    shadow:c+" 스타일 음영감",
    eyeliner:"또렷하고 시원한 눈매",
    aegyo:"생기 있는 애교살",
    lash:"풍성하고 또렷한 속눈썹",
    contour:"부드러운 윤곽 · V라인 착시",
    highlight:"입체감 있는 광",
    blush:"화사한 혈색",
    lip:c+" 스타일 입술",
    hair:c+" 분위기로 마무리"
  })[k]||""; }
  function stepHowto(step,r){
    if(step.generic) return step.generic.slice();
    var c=r.celeb, ct=c.face.skinTone, mt=r.profile.skinTone, diff=(ct!==mt);
    switch(step.key){
      case "base":
        var t=ct==="cool"?"쿨톤(핑크빛) 베이스":ct==="warm"?"웜톤(피치빛) 베이스":"뉴트럴 베이스";
        var a=["수분 베이스를 얇게 펴 바르기"];
        if(diff) a.push("붉은기·잡티는 컬러 코렉터로 가볍게 정리");
        a.push(t+"로 피부톤 보정");
        a.push("파우더로 가볍게 고정");
        return a;
      case "brow": return ["눈썹 앞머리는 연하게 비우기","꼬리로 갈수록 또렷하게 채우기","눈썹 산을 낮춰 직선 느낌 유지"];
      case "shadow": return ["눈두덩 전체에 베이스 섀도우","눈꼬리에 포인트 색 얹기","경계 자연스럽게 블렌딩"];
      case "eyeliner": return ["눈을 뜬 상태로 라인 길이 확인","속눈썹 사이를 메우듯 그리기","눈꼬리는 살짝 연장"];
      case "aegyo": return ["애교살에 밝은 펄 올리기","애교살 그림자 얇게 한 줄","웃을 때 도톰해지는 부분 위주"];
      case "contour": return ["광대 아래 음영을 얇게 한 겹","턱끝·코끝에 하이라이트","경계가 안 보이게 충분히 블렌딩"];
      case "blush": return ["볼 가장 도톰한 곳에서 시작","" + (c.blocks.blush||"가벼운 블러셔") + " 가볍게 올리기","손이나 브러시로 자연스럽게 펴기"];
      case "lip":
        var lt=ct==="cool"?"쿨 로즈·모브":ct==="warm"?"코랄·웜 누드":"뉴트럴 로즈";
        return [lt+" 계열 립 바르기","입술 중앙을 한 톤 더 밝게","외곽은 톡톡 두드려 자연스럽게"];
      case "hair": return ["가르마 위치 잡기","뿌리 볼륨 살리기","얼굴 옆 라인 정리하기"];
    }
    return [];
  }
  // 도식 얼굴 일러스트(SVG): 활성 영역만 분홍/보라로 강조. 실사진 위에는 그리지 않음.
  function faceDiagram(active){
    var P="#ff4d8d", PL="#b98cff", dim="rgba(255,255,255,0.20)", dimW=2, hiW=3.4;
    function s(k){ return active===k?P:dim; }
    function w(k){ return active===k?hiW:dimW; }
    var faceFill=active==="base"?"rgba(255,77,141,0.16)":"rgba(255,255,255,0.035)";
    var hairFill=active==="hair"?"rgba(185,140,255,0.30)":"rgba(255,255,255,0.05)";
    var lipFill=active==="lip"?"rgba(255,77,141,0.85)":"rgba(255,255,255,0.10)";
    var glow={brow:[120,114,46],eye:[120,135,48],contour:[120,188,60],lip:[120,187,30],hair:[120,86,66],base:[120,150,88]}[active];
    var o='<svg viewBox="0 0 240 280" class="face-dia" xmlns="http://www.w3.org/2000/svg">';
    o+='<defs><filter id="fsoft" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="9"/></filter></defs>';
    if(glow) o+='<circle cx="'+glow[0]+'" cy="'+glow[1]+'" r="'+glow[2]+'" fill="'+(active==="hair"?"rgba(185,140,255,0.22)":"rgba(255,77,141,0.20)")+'" filter="url(#fsoft)"/>';
    o+='<path d="M58,126 C52,72 92,46 120,46 C148,46 188,72 182,126 C176,96 160,72 120,72 C80,72 64,96 58,126 Z" fill="'+hairFill+'" stroke="'+s("hair")+'" stroke-width="'+w("hair")+'" stroke-linejoin="round"/>';
    o+='<path d="M120,58 C86,58 64,86 64,128 C64,170 86,210 120,222 C154,210 176,170 176,128 C176,86 154,58 120,58 Z" fill="'+faceFill+'" stroke="'+(active==="base"?P:"rgba(255,255,255,0.24)")+'" stroke-width="'+(active==="base"?hiW:dimW)+'"/>';
    o+='<path d="M72,150 Q76,190 113,216" fill="none" stroke="'+s("contour")+'" stroke-width="'+w("contour")+'" stroke-linecap="round"/>';
    o+='<path d="M168,150 Q164,190 127,216" fill="none" stroke="'+s("contour")+'" stroke-width="'+w("contour")+'" stroke-linecap="round"/>';
    if(active==="contour") o+='<circle cx="120" cy="213" r="3.2" fill="#fff"/>';
    o+='<path d="M82,116 Q98,108 112,116" fill="none" stroke="'+s("brow")+'" stroke-width="'+w("brow")+'" stroke-linecap="round"/>';
    o+='<path d="M128,116 Q142,108 158,116" fill="none" stroke="'+s("brow")+'" stroke-width="'+w("brow")+'" stroke-linecap="round"/>';
    o+='<path d="M84,134 Q98,125 112,134 Q98,143 84,134 Z" fill="none" stroke="'+s("eye")+'" stroke-width="'+w("eye")+'"/>';
    o+='<path d="M128,134 Q142,125 156,134 Q142,143 128,134 Z" fill="none" stroke="'+s("eye")+'" stroke-width="'+w("eye")+'"/>';
    o+='<circle cx="98" cy="134" r="3.2" fill="'+(active==="eye"?P:dim)+'"/><circle cx="142" cy="134" r="3.2" fill="'+(active==="eye"?P:dim)+'"/>';
    if(active==="eye"){
      o+='<path d="M84,133 Q78,131 74,127" fill="none" stroke="'+P+'" stroke-width="3" stroke-linecap="round"/>';
      o+='<path d="M156,133 Q162,131 166,127" fill="none" stroke="'+P+'" stroke-width="3" stroke-linecap="round"/>';
      o+='<path d="M86,140 Q98,146 110,140" fill="none" stroke="'+PL+'" stroke-width="2.6" stroke-linecap="round"/>';
      o+='<path d="M130,140 Q142,146 154,140" fill="none" stroke="'+PL+'" stroke-width="2.6" stroke-linecap="round"/>';
    }
    o+='<path d="M120,140 L120,162 Q115,166 121,167" fill="none" stroke="rgba(255,255,255,0.22)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>';
    o+='<path d="M104,184 Q120,177 136,184 Q120,198 104,184 Z" fill="'+lipFill+'" stroke="'+s("lip")+'" stroke-width="'+w("lip")+'" stroke-linejoin="round"/>';
    o+='<path d="M104,184 Q120,186 136,184" fill="none" stroke="'+(active==="lip"?"rgba(255,255,255,0.6)":"rgba(255,255,255,0.18)")+'" stroke-width="1.4"/>';
    o+='</svg>';
    return o;
  }
  function resolveStep(step,r,active,patchById){
    var corrIds=active.filter(function(cid){ return CORR[cid] && step.groups.indexOf(CORR[cid].group)>=0; });
    var corrections=corrIds.map(function(cid){ return (step.relabel&&step.relabel[cid])?step.relabel[cid]:CORR[cid].label; });
    var styles= step.block ? [r.celeb.blocks[step.block]].filter(Boolean) : [];
    var seen={},reasons=[]; corrIds.forEach(function(cid){ var p=patchById[cid]; if(p){ var v=valLabel(p.axis,p.val); if(!seen[v]){seen[v]=1;reasons.push(v);} } });
    var howto=[];
    if(step.region==="eye"||step.region==="contour"){ corrIds.forEach(function(cid){ (HOW_TO[cid]||[]).forEach(function(h){ if(howto.indexOf(h)<0)howto.push(h); }); }); }
    stepHowto(step,r).forEach(function(h){ if(howto.indexOf(h)<0)howto.push(h); });
    return { key:step.key, label:step.label, region:step.region, tier:step.tier, required:stepRequired(step,r,active),
             styles:styles, corrections:corrections, reasons:reasons, howto:howto, spots:step.spots, tools:step.tools||[], goal:goalForStep(r.celeb.name,step.key) };
  }
  function resolveAll(r){
    var active=activeCorrs(r);
    var patchById={}; r.patches.forEach(function(p){ patchById[p.id]=p; });
    return STEP_CAT.map(function(step){ return resolveStep(step,r,active,patchById); });
  }
  function guideSteps(r,mode){ return resolveAll(r).filter(function(s){ return inMode(s, mode||"expert"); }); }
  function round5(x){ return Math.round(x/5)*5; }
  // === v5.1 초보자 가이드 팁 (왜/어디에/실수) — '어떻게'는 step.howto 사용 ===
  var GUIDE_TIPS={
    base:{why:"피부톤을 고르게 정리해 메이크업이 잘 받는 바탕을 만들기 위해",where:"이마·볼·코·턱 등 얼굴 전체",mistake:"한 번에 두껍게 바르면 들뜨고 갈라져요 — 얇게 여러 번 나눠서"},
    brow:{why:"눈썹은 얼굴의 인상과 분위기를 결정해서",where:"눈썹 앞머리부터 꼬리까지",mistake:"앞머리를 진하게 채우면 부자연스러워요 — 앞은 연하게, 꼬리만 또렷이"},
    shadow:{why:"눈매에 음영과 깊이를 더해 입체감을 주려고",where:"눈두덩 전체와 눈꼬리",mistake:"진한 색을 먼저 올리면 탁해져요 — 연한 색부터 조금씩 쌓기"},
    eyeliner:{why:"눈을 더 길고 또렷하게 보이게 하려고",where:"속눈썹 사이와 눈꼬리 바깥쪽",mistake:"너무 길게 빼면 처져 보여요 — 눈꼬리에서 2~3mm만"},
    aegyo:{why:"눈 밑을 도톰하게 보여 생기와 애교를 더하려고",where:"웃을 때 도톰해지는 눈 밑 부분",mistake:"너무 넓게 바르면 부어 보여요 — 얇은 띠로만"},
    lash:{why:"속눈썹을 올려 눈을 또렷하고 커 보이게 하려고",where:"위 속눈썹 전체(필요하면 아래도)",mistake:"마스카라가 뭉치면 지저분해요 — 빗으로 바로 정리"},
    contour:{why:"얼굴에 음영을 줘 갸름하고 입체감 있게 보이려고",where:"턱선 사선과 광대 아래",mistake:"경계가 선명하면 얼룩져 보여요 — 충분히 블렌딩"},
    highlight:{why:"높은 부위에 광을 줘 입체감을 살리려고",where:"콧대·광대 위·턱끝",mistake:"너무 넓게 바르면 번들거려요 — 좁게 포인트만"},
    blush:{why:"혈색을 더해 화사하고 건강해 보이게 하려고",where:"미소 지을 때 도톰해지는 볼",mistake:"진하게 한 번에 올리면 부담스러워요 — 소량씩 겹쳐서"},
    lip:{why:"전체 메이크업의 포인트와 분위기를 완성하려고",where:"입술 전체, 중앙은 더 밝게",mistake:"각질 위에 바르면 갈라져 보여요 — 정돈 먼저"},
    hair:{why:"스타일의 분위기를 최종적으로 완성하려고",where:"가르마·앞머리·얼굴 옆 라인",mistake:"모근이 눌리면 밋밋해요 — 뿌리 볼륨부터"}
  };
  // === v5.1 준비물 3단계 분류 + 대체품 ===
  var TOOL_TIER={
    "쿠션·파운데이션":"must","브로우 펜슬":"must","아이라이너":"must","마스카라":"must","립 제품":"must","헤어 제품(고데기·왁스)":"must",
    "컨실러":"rec","파우더":"rec","브로우 마스카라":"rec","아이섀도우 팔레트":"rec","애교살 섀도우":"rec","뷰러":"rec","쉐딩 파우더":"rec","블러셔":"rec","하이라이터":"rec"
  };
  var TOOL_SUB={
    "쉐딩 파우더":"없으면 브라운 아이섀도우로 대체",
    "하이라이터":"없으면 밝은 펄 섀도우로 대체",
    "애교살 섀도우":"없으면 밝은 펄 섀도우로 대체",
    "컨실러":"없으면 파운데이션을 덧발라 대체",
    "브로우 마스카라":"없으면 생략 가능"
  };
  var TOOL_OPT_EXTRA=["글리터·이너글로우","포인트 컬러 섀도우"];
  var CHECK_ITEMS=[{k:"skin",l:"피부"},{k:"brow",l:"눈썹"},{k:"eye",l:"아이메이크업"},{k:"contour",l:"쉐딩"},{k:"lip",l:"립"},{k:"hair",l:"헤어"}];
  function buildPlan(r){
    var all=resolveAll(r);
    var required=all.filter(function(s){ return s.required; });
    var optional=all.filter(function(s){ return !s.required; });
    var fastSteps=all.filter(function(s){ return inMode(s,"fast"); });
    var stdSteps=all.filter(function(s){ return inMode(s,"standard"); });
    var expertSteps=all;
    var seen={},tools=[]; all.forEach(function(s){ (s.tools||[]).forEach(function(t){ if(!seen[t]){seen[t]=1;tools.push(t);} }); });
    var supplies={must:[],rec:[],opt:[]};
    tools.forEach(function(t){ var tier=TOOL_TIER[t]||"rec"; supplies[tier].push({name:t, sub:TOOL_SUB[t]||null}); });
    TOOL_OPT_EXTRA.forEach(function(t){ supplies.opt.push({name:t, sub:null}); });
    var supplyCount=supplies.must.length+supplies.rec.length+supplies.opt.length;
    var pc=r.patches.length;
    var diff = pc<=1 ? ["초급","d1"] : pc<=2 ? ["중급","d2"] : ["고급","d3"];
    var times={ fast:"5~10", standard:"15~30", expert:"30~60" };
    return { all:all, required:required, optional:optional, fastSteps:fastSteps, stdSteps:stdSteps, expertSteps:expertSteps, tools:tools, supplies:supplies, supplyCount:supplyCount, diff:diff, times:times };
  }
  function setLabel(r){ return (r.set&&r.set.id) ? r.set.id : (r.celeb.name+" 세트"); }
  function ovStepRow(n,s,req){
    return '<div class="ov-step"><span class="ov-step-n">'+n+'</span><span class="ov-step-l">'+esc(s.label)+'</span>'
      +(s.corrections.length?'<span class="ov-step-tag pink">'+esc(s.corrections[0])+'</span>':'')
      +(req?'':'<span class="ov-step-tag soft">선택</span>')+'</div>';
  }
  function modeCard(mode,title,desc,time,total){
    return '<button class="mode-card" data-mode="'+mode+'"><div class="mc-top"><span class="mc-title">'+esc(title)+'</span><span class="mc-total">'+total+'단계</span></div><div class="mc-desc">'+esc(desc)+'</div><div class="mc-time">'+esc(time)+'</div></button>';
  }
  function supplyGroup(title, cls, items){
    if(!items.length) return "";
    return '<div class="sup-group"><div class="sup-head '+cls+'">'+esc(title)+' <span>'+items.length+'</span></div>'
      + items.map(function(it){ return '<div class="sup-item"><span class="sup-name">'+esc(it.name)+'</span>'+(it.sub?'<span class="sup-sub">'+esc(it.sub)+'</span>':'')+'</div>'; }).join("")
      + '</div>';
  }
  function overviewBody(){
    var r=S.result, plan=buildPlan(r);
    var out='<div class="ov-hero">';
    if(S.selfie) out+='<div class="ov-thumb"><img src="'+S.selfie+'" alt="원본 셀카"></div>';
    out+='<div class="ov-hero-info"><div class="ov-style">'+esc(r.celeb.name)+'<span> · '+esc(r.celeb.mood)+'</span></div><div class="ov-set">선택된 세트 · '+esc(setLabel(r))+'</div><span class="grade '+r.grade[1]+'">'+esc(r.grade[0])+'</span></div></div>';
    out+='<div class="ov-metrics">';
    out+='<div class="ov-metric"><div class="ovm-k">예상 시간</div><div class="ovm-v">'+plan.times.expert+'분</div><div class="ovm-s">전문가 기준</div></div>';
    out+='<div class="ov-metric"><div class="ovm-k">난이도</div><div class="ovm-v"><span class="diff '+plan.diff[1]+'">'+esc(plan.diff[0])+'</span></div><div class="ovm-s">내 얼굴 기준</div></div>';
    out+='<div class="ov-metric"><div class="ovm-k">총 단계</div><div class="ovm-v">'+(plan.expertSteps.length+2)+'단계</div><div class="ovm-s">분석·결과 포함</div></div>';
    out+='</div>';
    out+='<div class="sec-title">필요 준비물 <span class="cnt">'+plan.supplyCount+'개</span></div>';
    out+='<p class="ov-desc">중요도에 따라 3단계로 나눴어요. 권장·선택은 없어도 진행할 수 있고, 대체품도 안내했어요.</p>';
    out+='<div class="sup-list">';
    out+=supplyGroup("필수 · 없으면 진행 어려움","must",plan.supplies.must);
    out+=supplyGroup("권장 · 있으면 결과 향상","rec",plan.supplies.rec);
    out+=supplyGroup("선택 · 없어도 무방","opt",plan.supplies.opt);
    out+='</div>';
    out+='<div class="sec-title">필수 단계 <span class="cnt">'+plan.required.length+'개</span></div>';
    out+='<p class="ov-desc">내 얼굴 특징(무쌍·작은 눈·턱선 등)을 보정하려면 꼭 필요한 단계예요.</p>';
    out+='<div class="ov-steps">'+plan.required.map(function(s,i){ return ovStepRow(i+1,s,true); }).join("")+'</div>';
    if(plan.optional.length){
      out+='<div class="sec-title">선택 단계 <span class="cnt">'+plan.optional.length+'개</span></div>';
      out+='<p class="ov-desc">완성도를 더 높여주지만 생략해도 되는 단계예요.</p>';
      out+='<div class="ov-steps">'+plan.optional.map(function(s,i){ return ovStepRow(i+1,s,false); }).join("")+'</div>';
    }
    out+='<div class="sec-title">따라하기 모드 선택</div>';
    out+='<div class="mode-cards">';
    out+=modeCard("fast","빠르게 하기","필수 단계만","약 "+plan.times.fast+"분", plan.fastSteps.length+2);
    out+=modeCard("standard","표준 따라하기","필수 + 주요 선택","약 "+plan.times.standard+"분", plan.stdSteps.length+2);
    out+=modeCard("expert","전문가 모드","전체 단계","약 "+plan.times.expert+"분", plan.expertSteps.length+2);
    out+='</div>';
    out+='<p class="note" style="margin-bottom:0">모드를 고르면 그 단계만 따라하기로 진행해요. 모든 단계는 원본 셀카를 보면서 진행합니다.</p>';
    return out;
  }
  function guideBody(){
    var r=S.result, mode=S.mode||"expert";
    var steps=guideSteps(r,mode), TG=steps.length+2, gs=S.guideStep;
    var isA=gs===0, isF=gs===TG-1, step=(!isA&&!isF)?steps[gs-1]:null;
    var titles=["현재 얼굴 분석"].concat(steps.map(function(s){ return s.label; })).concat(["최종 예상 결과"]);
    var modeLabel={fast:"빠르게 하기",standard:"표준 따라하기",expert:"전문가 모드"}[mode]||"전문가 모드";
    var out='<p class="guide-progress">STEP '+(gs+1)+' / '+TG+' · '+esc(titles[gs])+'<span class="gp-mode">'+esc(modeLabel)+'</span></p>';
    if(isA){
      if(S.selfie) out+='<div class="result-photo"><img src="'+S.selfie+'" alt="원본 셀카"><span class="focus-badge">현재 얼굴</span></div>';
      out+='<div class="sec-title">분석 결과 (자가진단)</div><div class="feat-chips">';
      AXES.forEach(function(a){ out+='<span class="chip">'+esc(valLabel(a.key,r.profile[a.key]))+'</span>'; });
      out+='</div>';
      out+='<div class="set-card" style="margin-top:16px"><div class="lbl">기준 스타일</div><div class="val">'+esc(r.celeb.name)+' · '+esc(r.celeb.mood)+'</div><span class="grade '+r.grade[1]+'">'+esc(r.grade[0])+'</span></div>';
      out+='<p class="note" style="margin-bottom:0">‘'+esc(modeLabel)+'’로 총 '+TG+'단계예요. 아래 원본 셀카를 보며 한 단계씩 따라하면 '+esc(r.celeb.name)+' 스타일에 가까워져요. 도식 얼굴은 “어디를” 손볼지 위치만 표시해요(실제 사진 위에 그리지 않아요).</p>';
    }
    if(step){
      var tip=GUIDE_TIPS[step.key]||{};
      if(S.selfie) out+='<div class="result-photo dia-photo"><img src="'+S.selfie+'" alt="원본 셀카"><span class="focus-badge">지금: '+esc(step.label)+(step.required?'':' · 선택')+'</span></div>';
      out+='<div class="dia-wrap">'+faceDiagram(step.region)+'<p class="dia-cap">분홍·보라 표시 = 이번 단계에서 손볼 위치 (도식 안내)</p></div>';
      out+='<div class="sec-title">수정 위치</div><div class="spot-list">';
      step.spots.forEach(function(sp){ var col=(sp.c==="lilac")?"var(--lilac)":"var(--pink)"; out+='<div class="spot"><span class="spot-dot" style="background:'+col+'"></span><span class="spot-l">'+esc(sp.l)+'</span><span class="spot-w">'+esc(sp.w)+'</span></div>'; });
      out+='</div>';
      if(step.styles.length){ out+='<div class="sec-title">적용 스타일 (선택한 세트)</div><div class="feat-chips">'+step.styles.map(function(x){ return '<span class="chip">'+esc(x)+'</span>'; }).join("")+'</div>'; }
      if(step.corrections.length){ out+='<div class="sec-title">적용 보정 (내 얼굴 맞춤)</div><div class="feat-chips">'+step.corrections.map(function(x){ return '<span class="chip patchchip">'+esc(x)+'</span>'; }).join("")+'</div>'; }
      if(step.reasons.length){ out+='<div class="sec-title">적용 이유 (내 얼굴 특징)</div><div class="feat-chips">'+step.reasons.map(function(x){ return '<span class="chip match">'+esc(x)+'</span>'; }).join("")+'</div>'; }
      out+='<div class="why-card">';
      if(tip.why) out+='<div class="why-row"><span class="why-k">왜 하나요?</span><span class="why-v">'+esc(tip.why)+'</span></div>';
      if(tip.where) out+='<div class="why-row"><span class="why-k">어디에?</span><span class="why-v">'+esc(tip.where)+'</span></div>';
      out+='</div>';
      if(step.tools.length){ out+='<div class="sec-title">필요 준비물</div><div class="ov-tools">'+step.tools.map(function(t){ return '<span class="tool">'+esc(t)+'</span>'; }).join("")+'</div>'; }
      out+='<div class="sec-title">어떻게 하나요? (실행 순서)</div><ol class="howto-list">'+step.howto.map(function(h){ return '<li>'+esc(h)+'</li>'; }).join("")+'</ol>';
      if(tip.mistake) out+='<div class="mistake"><span class="mistake-ic">!</span><div><b>실수하기 쉬운 부분</b><span>'+esc(tip.mistake)+'</span></div></div>';
      out+='<div class="goal-box"><div class="gl">목표 효과</div><div class="gv">'+esc(step.goal)+'</div></div>';
    }
    if(isF){
      out+='<div class="split"><div class="split-cell"><div class="frame">'+(S.selfie?'<img src="'+S.selfie+'" alt="원본">':'<div class="ph">원본 셀카 없음</div>')+'</div><p class="split-cap">원본 셀카</p></div><div class="split-cell"><div class="frame">'+(S.resultImage?'<img src="'+S.resultImage+'" alt="AI 결과">':'<div class="ph">AI 스타일 결과는<br>결과 화면에서<br>생성할 수 있어요.</div>')+'</div><p class="split-cap">'+esc(r.celeb.name)+' 스타일 결과</p></div></div>';
      out+='<p class="confidence">현재 가이드는 선택한 스타일의 핵심 요소를 기준으로 만들어졌어요. 실제 결과는 얼굴형·피부 상태·사용한 제품에 따라 달라질 수 있어요.</p>';
      out+='<div class="sec-title">오늘 적용한 항목</div><div class="checklist">';
      CHECK_ITEMS.forEach(function(ci){ var on=!!S.checks[ci.k]; out+='<button class="cl-item'+(on?" done":"")+'" data-check="'+ci.k+'"><span class="cl-box">'+(on?"✓":"")+'</span><span class="cl-l">'+esc(ci.l)+'</span></button>'; });
      out+='</div>';
      out+='<div class="reeval"><div class="reeval-head"><span class="reeval-ic">★</span><span>재촬영 완성도 평가</span><span class="reeval-soon">준비 중</span></div><p class="reeval-sub">따라한 뒤 다시 촬영하면 원본·연예인 스타일과 얼마나 가까운지 평가해 드릴 예정이에요. (생성 모델·재촬영 연결 후 제공)</p></div>';
      out+='<p class="note" style="margin-top:14px;margin-bottom:0">여기까지 따라하면 '+esc(r.celeb.name)+' 스타일 분위기가 완성돼요. 결과 이미지 자동 생성은 생성 모델 연결 후 제공됩니다.</p>';
    }
    out+='<div class="fixed-cta"><div class="guide-nav"><button class="btn-ghost" id="g-prev">'+(gs===0?"개요로":"이전")+'</button><button class="btn" id="g-next">'+(isF?"완료":"다음")+'</button></div></div>';
    return out;
  }

  // === AI 결과 이미지 생성 (OpenAI 이미지 편집) ===
  function genBlock(r){
    if(S.genStatus==="loading"){
      return '<div class="genwrap"><div class="genload"><span class="genspin"></span>AI가 '+esc(r.celeb.name)+' 스타일 결과를 그리는 중… (15~40초)</div></div>';
    }
    if(S.resultImage){
      return '<div class="genwrap"><div class="result-photo"><img src="'+S.resultImage+'" alt="AI 스타일 결과"><span class="mock-badge done">AI 스타일 결과 · 참고용</span></div>'
        +'<p class="gen-note">실제 얼굴·제품에 따라 달라질 수 있어요. 마음에 안 들면 다시 생성해 보세요.</p>'
        +'<button class="btn-ghost" id="gen-btn">다시 생성하기</button></div>';
    }
    var err = S.genError ? '<p class="gen-err">'+esc(S.genError)+'</p>' : '';
    return '<div class="genwrap"><button class="btn" id="gen-btn">✨ AI 스타일 결과 이미지 생성</button>'
      +'<p class="gen-note">선택한 '+esc(r.celeb.name)+' 스타일을 내 셀카에 입힌 예상 이미지를 만들어요. (생성 AI · 약 15~40초, 얼굴이 다소 변형될 수 있어요.)</p>'+err+'</div>';
  }
  function buildStylePrompt(r){
    var b=(r&&r.celeb&&r.celeb.blocks)||{};
    var look=[];
    if(b.skin) look.push("base/skin: "+b.skin);
    if(b.brow) look.push("brows: "+b.brow);
    if(b.shadow) look.push("eyeshadow: "+b.shadow);
    if(b.eyeliner) look.push("eyeliner: "+b.eyeliner);
    if(b.aegyo) look.push("under-eye/aegyo: "+b.aegyo);
    if(b.shading) look.push("contour: "+b.shading);
    if(b.blush) look.push("blush: "+b.blush);
    if(b.lip) look.push("lips: "+b.lip);
    if(b.hair) look.push("hair styling: "+b.hair);
    // 진단된 보정(patches)을 "화장으로 하는 동작"으로 번역. 골격 변경은 금지, 음영/색으로만.
    function fx(axis,val){
      var celebTone=(r&&r.celeb&&r.celeb.face&&r.celeb.face.skinTone)||"neutral";
      if(axis==="skinTone"){
        var dir = celebTone==="cool" ? "a cool (pink/rose) undertone — cool rose or mauve lip, pink-based base"
                : celebTone==="warm" ? "a warm (peach) undertone — coral or warm-nude lip, peach-based base"
                : "a neutral undertone — neutral rose lip, balanced base";
        return "Skin reads "+val+"-toned; shift the makeup undertone toward "+dir+" to suit this look (color choice only).";
      }
      var M={
        faceShape:{
          round:"Face reads round — add soft cheek/temple contour shadow for gentle definition (shadow only; do NOT narrow the real face outline).",
          square:"Face reads square — lightly contour temples and outer jaw with shadow to soften angles (do NOT change the real bone outline).",
          oblong:"Face reads long — place blush and contour more horizontally to balance length (color/shadow only).",
          heart:"Face reads heart-shaped — soften forehead sides and balance the chin with light contour (shadow only)."
        },
        jaw:{
          square:"Jaw is angular/square — apply contour SHADOW from under the cheekbone toward the chin for a slimmer V-line ILLUSION. Shadow only: the actual jaw width, bone outline and chin must stay EXACTLY as in the photo.",
          round:"Jaw is round — add light contour shadow along the jawline for subtle definition (shadow illusion only; real jaw outline unchanged)."
        },
        eyelid:{
          monolid:"Eyes are monolid (no visible crease) — build depth with gradient eyeshadow, tightlined upper lash line and a subtle faux-crease shadow. Keep the natural monolid; do NOT paint a surgical double-eyelid fold.",
          inner:"Eyes are inner-double — trace the existing inner crease with shadow/liner to define it. Keep the natural eye shape."
        },
        eyeShape:{
          downturned:"Outer eye corners turn slightly down — visually lift with a soft upward liner flick and outer-corner shadow (liner only; eye geometry unchanged).",
          upturned:"Outer eye corners turn up — soften with a straighter, more horizontal liner."
        },
        eyeSize:{
          small:"Eyes read small — enlarge the APPEARANCE only: subtle liner extension at the outer corner, brighten the inner corner and lower lash line, curled lashes with mascara. Do NOT enlarge the actual eye geometry.",
          large:"Eyes read large — balance with soft smoky shadow and a defined lower lash line."
        }
      };
      return (M[axis] && M[axis][val]) || "";
    }
    var corr=[];
    ((r&&r.patches)||[]).forEach(function(p){ var s=fx(p.axis,p.val); if(s && corr.indexOf(s)<0) corr.push(s); });

    var prompt =
      "ABSOLUTE PRIORITY: This is a MAKEUP TRY-ON. Edit ONLY the makeup on the existing photo. This is NOT a portrait generator.\n"
      + "DO NOT reshape the face. DO NOT reconstruct facial features. DO NOT apply any plastic-surgery, jaw-shaving, nose-job, eye-enlarging or face-slimming effect. DO NOT beautify or face-tune. The person's bone structure must be 100% preserved.\n\n"
      + "Take THIS exact photo of this specific person and apply a realistic Korean makeup look inspired by "+r.celeb.name+" ("+r.celeb.mood+"), exactly as a professional makeup artist would achieve with real cosmetics on this same face.\n\n"
      + "MAKEUP TO APPLY (color cosmetics + hair styling only):\n- "+look.join("\n- ")+"\n\n";
    if(corr.length){
      prompt += "PERSONALIZED ADJUSTMENTS for THIS face — achieve with MAKEUP TECHNIQUE ONLY (contour shadow, highlight, eyeliner, eyeshadow, color). NEVER by reshaping geometry:\n- "+corr.join("\n- ")+"\n\n";
    }
    prompt +=
      "WHAT REAL MAKEUP CAN CHANGE (allowed): skin tone/coverage, contour & highlight (shadow illusion only), blush, eyebrow shape via pencil, eye look via shadow/liner/lashes (illusion only), lip color & shape via lipstick, and hair styling.\n"
      + "WHAT MUST STAY 100% IDENTICAL TO THE ORIGINAL PHOTO (forbidden to change): face width, face length, jaw bone shape and width, chin shape, cheekbone structure, nose width/length/height, eye size, eye shape, eye spacing, and overall facial proportions and identity. The face OUTLINE in the result must trace exactly over the original.\n\n"
      + "Think of it as a strict before/after: if you laid the result over the original, every facial bone line, the jaw, the nose and the eye outlines must overlap perfectly. Only the makeup colors/shading and the hair differ.\n"
      + "A square or round jaw stays square or round in the OUTLINE; any V-line effect is ONLY darker contour shadow painted on the skin, never an actual change of the jaw shape.\n"
      + "Keep natural realistic skin texture with visible pores. Keep the same age, ethnicity, head angle, expression, lighting and background.\n\n"
      + "REPEAT — the single most important rule: change the MAKEUP and HAIR only; do NOT change the underlying face. No face reshaping. No facial reconstruction. No plastic surgery look. Makeup only.\n"
      + "Output: one photorealistic photo of the SAME person, same face, wearing this makeup.";
    return prompt;
  }
  function generateResultImage(){
    if(!S.selfie || !S.result || S.genStatus==="loading") return;
    S.genStatus="loading"; S.genError=null; render();
    fetch("/api/generate",{ method:"POST", headers:{"Content-Type":"application/json"},
      body:JSON.stringify({ image:S.selfie, prompt:buildStylePrompt(S.result) }) })
      .then(function(res){ return res.json().then(function(j){ return {ok:res.ok, j:j}; }); })
      .then(function(o){
        if(!o.ok || !o.j || !o.j.image){ throw new Error((o.j&&o.j.error)||"이미지 생성에 실패했어요. 잠시 후 다시 시도해 주세요."); }
        S.resultImage=o.j.image; S.genStatus="done"; render();
      })
      .catch(function(e){ S.genStatus="error"; S.genError=(e&&e.message)||"오류가 발생했어요."; render(); });
  }
  function bind(){
    var back=document.getElementById("back");
    if(back) back.onclick=function(){ var p=S.phase; if(p==="upload")go("landing"); else if(p==="celeb")go("upload"); else if(p==="diagnose")go("celeb"); else if(p==="result")go("diagnose"); else if(p==="overview")go("result"); else if(p==="guide")go("overview"); };
    Array.prototype.forEach.call(document.querySelectorAll("[data-pick]"),function(inp){ inp.onchange=function(e){ var f=e.target.files&&e.target.files[0]; e.target.value=""; if(!f)return; resizeToDataUrl(f).then(function(d){ S.selfie=d; render(); }).catch(function(err){ S.error=err.message; render(); }); }; });
    Array.prototype.forEach.call(document.querySelectorAll("[data-retake]"),function(b){ b.onclick=function(){ var s=document.querySelector('[data-pick="'+b.getAttribute("data-retake")+'"]'); if(s)s.click(); }; });
    Array.prototype.forEach.call(document.querySelectorAll("[data-celeb]"),function(b){ b.onclick=function(){ S.celebId=b.getAttribute("data-celeb"); render(); }; });
    Array.prototype.forEach.call(document.querySelectorAll("[data-q]"),function(b){ b.onclick=function(){ S.profile[b.getAttribute("data-q")]=b.getAttribute("data-v"); render(); }; });
    Array.prototype.forEach.call(document.querySelectorAll("[data-switch]"),function(b){ b.onclick=function(){ S.celebId=b.getAttribute("data-switch"); S.result=optimize(S.celebId,S.profile,S.selfie); go("result"); }; });
    var id=function(x){return document.getElementById(x);};
    if(id("gen-btn")) id("gen-btn").onclick=function(){ generateResultImage(); };
    if(id("to-start")) id("to-start").onclick=function(){ go("upload"); };
    if(id("to-celeb")) id("to-celeb").onclick=function(){ go("celeb"); };
    if(id("to-diagnose")) id("to-diagnose").onclick=function(){ go("diagnose"); };
    if(id("to-result")) id("to-result").onclick=function(){ S.result=optimize(S.celebId,S.profile,S.selfie); go("result"); };
    if(id("to-guide")) id("to-guide").onclick=function(){ S.guideStep=0; S.mode=null; go("overview"); };
    Array.prototype.forEach.call(document.querySelectorAll("[data-mode]"),function(b){ b.onclick=function(){ S.mode=b.getAttribute("data-mode"); S.guideStep=0; go("guide"); }; });
    Array.prototype.forEach.call(document.querySelectorAll("[data-check]"),function(b){ b.onclick=function(){ var k=b.getAttribute("data-check"); S.checks[k]=!S.checks[k]; render(); }; });
    if(id("g-prev")) id("g-prev").onclick=function(){ if(S.guideStep===0){go("overview");} else {S.guideStep--;render();} };
    if(id("g-next")) id("g-next").onclick=function(){ var tg=guideSteps(S.result,S.mode).length+2; if(S.guideStep>=tg-1){go("result");} else {S.guideStep++;render();} };
    if(id("to-celeb2")) id("to-celeb2").onclick=function(){ go("celeb"); };
    if(id("to-result2")) id("to-result2").onclick=function(){ go("result"); };
    if(id("restart")) id("restart").onclick=function(){ S={phase:"landing",selfie:null,celebId:null,profile:defaultProfile(),result:null,guideStep:0,mode:null,checks:{},resultImage:null,genStatus:null,genError:null,error:null}; render(); };
  }
  render();
}
