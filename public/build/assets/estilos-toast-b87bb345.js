import{r as s,a as i,j as k}from"./app-dcd3922e.js";import{u as T,c as x,a as H}from"./createWithBsPrefix-a68b3894.js";import{u as g,a as D,F as I,E as M,b as A,c as G,C as L}from"./CloseButton-a10fcccb.js";var f=Math.pow(2,31)-1;function b(t,e,o){var r=o-Date.now();t.current=r<=f?setTimeout(e,r):setTimeout(function(){return b(t,e,o)},f)}function O(){var t=g(),e=s.exports.useRef();return D(function(){return clearTimeout(e.current)}),s.exports.useMemo(function(){var o=function(){return clearTimeout(e.current)};function r(n,a){a===void 0&&(a=0),t()&&(o(),a<=f?e.current=setTimeout(n,a):b(e,n,Date.now()+a))}return{set:r,clear:o}},[])}const S={[M]:"showing",[A]:"showing show"},y=s.exports.forwardRef((t,e)=>i(I,{...t,ref:e,transitionClasses:S}));y.displayName="ToastFade";const B=s.exports.createContext({onClose(){}}),W={closeLabel:"Close",closeButton:!0},v=s.exports.forwardRef(({bsPrefix:t,closeLabel:e,closeVariant:o,closeButton:r,className:n,children:a,...l},u)=>{t=T(t,"toast-header");const c=s.exports.useContext(B),d=G(m=>{c==null||c.onClose==null||c.onClose(m)});return k("div",{ref:u,...l,className:x(t,n),children:[a,r&&i(L,{"aria-label":e,variant:o,onClick:d,"data-dismiss":"toast"})]})});v.displayName="ToastHeader";v.defaultProps=W;const X=v,_=H("toast-body"),F=s.exports.forwardRef(({bsPrefix:t,className:e,transition:o=y,show:r=!0,animation:n=!0,delay:a=5e3,autohide:l=!1,onClose:u,bg:c,...d},m)=>{t=T(t,"toast");const C=s.exports.useRef(a),p=s.exports.useRef(u);s.exports.useEffect(()=>{C.current=a,p.current=u},[a,u]);const h=O(),N=!!(l&&r),R=s.exports.useCallback(()=>{N&&(p.current==null||p.current())},[N]);s.exports.useEffect(()=>{h.set(R,C.current)},[h,R]);const j=s.exports.useMemo(()=>({onClose:u}),[u]),w=!!(o&&n),E=i("div",{...d,ref:m,className:x(t,e,c&&`bg-${c}`,!w&&(r?"show":"hide")),role:"alert","aria-live":"assertive","aria-atomic":"true"});return i(B.Provider,{value:j,children:w&&o?i(o,{in:r,unmountOnExit:!0,children:E}):E})});F.displayName="Toast";const J=Object.assign(F,{Body:_,Header:X}),U={"top-start":"top-0 start-0","top-center":"top-0 start-50 translate-middle-x","top-end":"top-0 end-0","middle-start":"top-50 start-0 translate-middle-y","middle-center":"top-50 start-50 translate-middle","middle-end":"top-50 end-0 translate-middle-y","bottom-start":"bottom-0 start-0","bottom-center":"bottom-0 start-50 translate-middle-x","bottom-end":"bottom-0 end-0"},$=s.exports.forwardRef(({bsPrefix:t,position:e,containerPosition:o="absolute",className:r,as:n="div",...a},l)=>(t=T(t,"toast-container"),i(n,{ref:l,...a,className:x(t,e&&[o?`position-${o}`:null,U[e]],r)})));$.displayName="ToastContainer";const K=$;export{K as T,J as a,O as u};
