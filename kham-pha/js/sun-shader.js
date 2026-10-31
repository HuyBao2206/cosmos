// Shader bề mặt Mặt Trời (hạt và siêu hạt đối lưu sôi động, tối dần ở rìa đĩa) và quầng corona.
import * as THREE from 'three';

const NOISE = /* glsl */`
// Simplex noise 3D — Ian McEwan, Ashima Arts (MIT)
vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 mod289(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}
float snoise(vec3 v){
  const vec2 C=vec2(1.0/6.0,1.0/3.0); const vec4 D=vec4(0.0,0.5,1.0,2.0);
  vec3 i=floor(v+dot(v,C.yyy)); vec3 x0=v-i+dot(i,C.xxx);
  vec3 g=step(x0.yzx,x0.xyz); vec3 l=1.0-g; vec3 i1=min(g.xyz,l.zxy); vec3 i2=max(g.xyz,l.zxy);
  vec3 x1=x0-i1+C.xxx; vec3 x2=x0-i2+C.yyy; vec3 x3=x0-D.yyy;
  i=mod289(i);
  vec4 p=permute(permute(permute(i.z+vec4(0.0,i1.z,i2.z,1.0))+i.y+vec4(0.0,i1.y,i2.y,1.0))+i.x+vec4(0.0,i1.x,i2.x,1.0));
  float n_=0.142857142857; vec3 ns=n_*D.wyz-D.xzx;
  vec4 j=p-49.0*floor(p*ns.z*ns.z); vec4 x_=floor(j*ns.z); vec4 y_=floor(j-7.0*x_);
  vec4 x=x_*ns.x+ns.yyyy; vec4 y=y_*ns.x+ns.yyyy; vec4 h=1.0-abs(x)-abs(y);
  vec4 b0=vec4(x.xy,y.xy); vec4 b1=vec4(x.zw,y.zw);
  vec4 s0=floor(b0)*2.0+1.0; vec4 s1=floor(b1)*2.0+1.0; vec4 sh=-step(h,vec4(0.0));
  vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy; vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
  vec3 p0=vec3(a0.xy,h.x); vec3 p1=vec3(a0.zw,h.y); vec3 p2=vec3(a1.xy,h.z); vec3 p3=vec3(a1.zw,h.w);
  vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
  p0*=norm.x; p1*=norm.y; p2*=norm.z; p3*=norm.w;
  vec4 m=max(0.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.0); m=m*m;
  return 42.0*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
}`;

export function createSunMaterial(texture) {
  return new THREE.ShaderMaterial({
    uniforms: { uTime: { value: 0 }, uMap: { value: texture } },
    vertexShader: /* glsl */`
      varying vec3 vPos; varying vec3 vNormalV; varying vec2 vUv;
      void main(){
        vPos = position; vUv = uv;
        vNormalV = normalize(normalMatrix * normal);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
      }`,
    fragmentShader: /* glsl */`
      uniform float uTime; uniform sampler2D uMap;
      varying vec3 vPos; varying vec3 vNormalV; varying vec2 vUv;
      ${NOISE}
      void main(){
        vec3 p = normalize(vPos);
        float t = uTime * 0.06;
        // hạt (granulation) nhỏ + siêu hạt lớn, trôi chậm
        float g = snoise(p * 22.0 + vec3(t, -t, t*0.7)) * 0.5
                + snoise(p * 48.0 - vec3(t*1.7)) * 0.25
                + snoise(p * 6.0 + vec3(0.0, t*0.4, 0.0)) * 0.35;
        vec3 tex = texture2D(uMap, vUv).rgb;
        vec3 hot = vec3(1.0, 0.93, 0.74), mid = vec3(1.0, 0.66, 0.24), cool = vec3(0.72, 0.28, 0.05);
        float k = clamp(0.55 + g * 0.45, 0.0, 1.0);
        vec3 col = mix(cool, mid, smoothstep(0.0, 0.55, k));
        col = mix(col, hot, smoothstep(0.55, 1.0, k));
        col = mix(col, col * (0.6 + tex * 0.8), 0.35);
        // tối dần về rìa đĩa (limb darkening), hệ số tuyến tính u ≈ 0,6 ở dải khả kiến
        float mu = clamp(dot(vNormalV, vec3(0.0, 0.0, 1.0)), 0.0, 1.0);
        col *= (1.0 - 0.6 * (1.0 - mu));
        gl_FragColor = vec4(col * 1.35, 1.0);
      }`,
  });
}

/** Quầng corona: một tấm phẳng luôn quay về camera, toả sáng mềm với các tia nhiễu loạn chậm. */
export function createCorona() {
  const mat = new THREE.ShaderMaterial({
    uniforms: { uTime: { value: 0 }, uStrength: { value: 1 } },
    transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
    vertexShader: /* glsl */`
      varying vec2 vUv;
      void main(){
        vUv = uv;
        // billboard
        vec4 mv = modelViewMatrix * vec4(0.0, 0.0, 0.0, 1.0);
        vec2 scale = vec2(length(modelMatrix[0].xyz), length(modelMatrix[1].xyz));
        mv.xy += position.xy * scale;
        gl_Position = projectionMatrix * mv;
      }`,
    fragmentShader: /* glsl */`
      uniform float uTime; uniform float uStrength; varying vec2 vUv;
      ${NOISE}
      void main(){
        vec2 q = vUv * 2.0 - 1.0;
        float r = length(q);
        float a = atan(q.y, q.x);
        // r = 0,25 là rìa đĩa Mặt Trời (tấm phẳng rộng gấp 4 lần bán kính)
        float rays = 0.6 + 0.4 * snoise(vec3(cos(a) * 2.2, sin(a) * 2.2, uTime * 0.05))
                         + 0.25 * snoise(vec3(cos(a) * 7.0, sin(a) * 7.0, uTime * 0.08));
        float d = max(r - 0.25, 0.0);
        float glow = exp(-d * 9.0 / rays) * 0.9 + exp(-d * 2.6) * 0.25;
        glow *= smoothstep(1.0, 0.7, r);
        vec3 col = mix(vec3(1.0, 0.62, 0.25), vec3(1.0, 0.9, 0.7), exp(-d * 12.0));
        gl_FragColor = vec4(col * glow * uStrength, 1.0);
      }`,
  });
  const mesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), mat);
  mesh.renderOrder = 2;
  mesh.frustumCulled = false;
  return mesh;
}

/** Quầng khí quyển ở viền hành tinh (Fresnel), sáng hơn ở phía được chiếu sáng. */
export function createAtmosphere(color, intensity = 1) {
  return new THREE.ShaderMaterial({
    uniforms: { uColor: { value: new THREE.Color(color) }, uSun: { value: new THREE.Vector3() }, uIntensity: { value: intensity } },
    transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, side: THREE.BackSide,
    vertexShader: /* glsl */`
      varying vec3 vN; varying vec3 vW; varying vec3 vView;
      void main(){
        vec4 w = modelMatrix * vec4(position, 1.0);
        vW = w.xyz; vN = normalize(mat3(modelMatrix) * normal);
        vView = normalize(cameraPosition - w.xyz);
        gl_Position = projectionMatrix * viewMatrix * w;
      }`,
    fragmentShader: /* glsl */`
      uniform vec3 uColor; uniform vec3 uSun; uniform float uIntensity;
      varying vec3 vN; varying vec3 vW; varying vec3 vView;
      void main(){
        float rim = pow(1.0 - abs(dot(-vN, vView)), 2.0);
        float lit = clamp(dot(-vN, normalize(uSun - vW)) * 0.8 + 0.35, 0.0, 1.0);
        float a = smoothstep(0.0, 1.0, rim) * lit * uIntensity;
        gl_FragColor = vec4(uColor * a, 1.0);
      }`,
  });
}
