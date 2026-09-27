import{$ as _n,$a as No,$b as vc,$c as Nf,A as Xu,Aa as Si,Ab as fc,Ac as Rf,Ad as kf,B as qu,Ba as Gs,Bb as dc,Bc as Pf,C as Yu,Ca as Jt,Cb as pc,Cc as Go,Cd as $e,D as Ku,Da as Hr,Db as hc,Dc as Cf,Dg as Zf,E as Zu,Ea as Do,Eb as mc,Ec as If,Ed as Vf,Ee as Cc,Eg as jf,F as ju,Fa as Ti,Fb as gc,Fc as Ho,Ff as Yf,G as Qu,Ga as bi,Gb as Oo,Gc as Df,Gf as Kf,H as Ju,Ha as on,Hb as _c,Hd as ko,He as zr,I as ef,Ia as Be,Id as Xe,Ie as $f,J as tf,Ja as Mt,Je as Ic,K as nf,Ka as Hs,Ke as zo,L as rf,La as ks,Ld as wc,M as of,Ma as Ki,Md as Gn,N as af,Na as Tf,Nd as Gt,O as sf,Oa as bf,Od as vn,P as cf,Pa as Ef,Pd as Tt,Q as lf,Qa as yf,R as uf,Ra as Pe,Rc as Tc,S as ff,Sa as Ei,Sc as bc,T as Is,Ta as yi,U as df,Ua as qn,Ud as zf,V as pf,Va as kr,Vg as Nc,W as hf,Wa as In,Wd as Wf,Wg as Uc,X as mf,Xa as Mi,Y as gf,Yd as Zi,Z as _f,Za as Ai,_ as vf,_a as Lo,_c as Lf,_d as Xt,_g as xn,a as ig,aa as Ds,ab as Uo,ac as Mf,b as Ur,ba as Ls,bb as Fo,bc as wi,be as ji,ca as Ns,cb as Vs,cc as Af,cd as Ec,da as Us,db as zs,dc as xc,dd as it,e as Gu,ea as Fs,eb as Ws,ec as Sc,ed as xt,f as Rs,fa as Bs,fb as $s,fc as ft,fd as Uf,g as Hu,ga as Os,gb as Xs,ge as Rc,hb as qs,hd as Ff,he as Vo,ib as Ys,id as Bf,ie as hn,j as Fr,jb as Ks,jd as Of,jf as Dc,k as ku,ka as Yi,kb as Zs,kd as Gf,l as Xi,la as xi,lb as Bo,le as wt,lg as Yn,m as Cn,ma as ni,mb as js,md as Ne,n as $t,na as Co,nb as Qs,nd as yc,o as dn,oa as Or,ob as Js,od as j,og as Wr,oh as Fc,p as Ot,pa as pn,pb as ec,pd as He,pe as Pc,q as Xn,qa as Kt,qb as tc,qd as Et,r as Br,ra as xf,rb as nc,s as Ps,sa as Fe,sb as ic,t as Cs,ta as Sf,tb as rc,td as Mc,tf as Wo,u as Vu,ub as oc,ud as Hf,uf as an,va as Gr,vb as ac,vd as At,vf as Lc,w as qi,wb as sc,wf as Xf,x as zu,xa as st,xb as cc,xd as Dt,xf as qt,y as Wu,ya as Io,yb as lc,yd as Vr,yf as qf,z as $u,zb as uc,zc as wf,zd as Ac}from"./three-core-HXAKOTEQ.js";function xd(){let t=null,e=!1,n=null,i=null;function r(o,a){i=t.requestAnimationFrame(r),n(o,a)}return{start:function(){e!==!0&&n!==null&&t!==null&&(i=t.requestAnimationFrame(r),e=!0)},stop:function(){t!==null&&t.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(o){n=o},setContext:function(o){t=o}}}function rg(t){let e=new WeakMap;function n(c,l){let f=c.array,p=c.usage,u=f.byteLength,s=t.createBuffer();t.bindBuffer(l,s),t.bufferData(l,f,p),c.onUploadCallback();let h;if(f instanceof Float32Array)h=t.FLOAT;else if(typeof Float16Array<"u"&&f instanceof Float16Array)h=t.HALF_FLOAT;else if(f instanceof Uint16Array)c.isFloat16BufferAttribute?h=t.HALF_FLOAT:h=t.UNSIGNED_SHORT;else if(f instanceof Int16Array)h=t.SHORT;else if(f instanceof Uint32Array)h=t.UNSIGNED_INT;else if(f instanceof Int32Array)h=t.INT;else if(f instanceof Int8Array)h=t.BYTE;else if(f instanceof Uint8Array)h=t.UNSIGNED_BYTE;else if(f instanceof Uint8ClampedArray)h=t.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+f);return{buffer:s,type:h,bytesPerElement:f.BYTES_PER_ELEMENT,version:c.version,size:u}}function i(c,l,f){let p=l.array,u=l.updateRanges;if(t.bindBuffer(f,c),u.length===0)t.bufferSubData(f,0,p);else{u.sort((h,g)=>h.start-g.start);let s=0;for(let h=1;h<u.length;h++){let g=u[s],b=u[h];b.start<=g.start+g.count+1?g.count=Math.max(g.count,b.start+b.count-g.start):(++s,u[s]=b)}u.length=s+1;for(let h=0,g=u.length;h<g;h++){let b=u[h];t.bufferSubData(f,b.start*p.BYTES_PER_ELEMENT,p,b.start,b.count)}l.clearUpdateRanges()}l.onUploadCallback()}function r(c){return c.isInterleavedBufferAttribute&&(c=c.data),e.get(c)}function o(c){c.isInterleavedBufferAttribute&&(c=c.data);let l=e.get(c);l&&(t.deleteBuffer(l.buffer),e.delete(c))}function a(c,l){if(c.isInterleavedBufferAttribute&&(c=c.data),c.isGLBufferAttribute){let p=e.get(c);(!p||p.version<c.version)&&e.set(c,{buffer:c.buffer,type:c.type,bytesPerElement:c.elementSize,version:c.version});return}let f=e.get(c);if(f===void 0)e.set(c,n(c,l));else if(f.version<c.version){if(f.size!==c.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(f.buffer,c,l),f.version=c.version}}return{get:r,remove:o,update:a}}var og=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,ag=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,sg=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,cg=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,lg=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,ug=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,fg=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,dg=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,pg=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,hg=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,mg=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,gg=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,_g=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,vg=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,xg=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Sg=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,Tg=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,bg=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Eg=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,yg=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,Mg=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,Ag=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,wg=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,Rg=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,Pg=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,Cg=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,Ig=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Dg=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Lg=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Ng=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Ug="gl_FragColor = linearToOutputTexel( gl_FragColor );",Fg=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Bg=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,Og=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,Gg=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,Hg=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,kg=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,Vg=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,zg=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Wg=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,$g=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Xg=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,qg=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Yg=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Kg=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Zg=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_SUN_LIGHTS > 0
	struct SunLight {
		vec3 direction;
		vec3 color;
	};
	uniform SunLight sunLights[ NUM_SUN_LIGHTS ];
	void getSunLightInfo( const in SunLight sunLight, out IncidentLight light ) {
		light.color = sunLight.color;
		light.direction = sunLight.direction;
		light.visible = true;
	}
#endif
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,jg=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_RETROREFLECTION
		vec3 getIBLRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 retroVec = normalize( mix( viewDir, normal, pow4( roughness ) ) );
				retroVec = transformDirectionByInverseViewMatrix( retroVec, viewMatrix );
				vec4 envMapColor = textureCubeUV( envMap, envMapRotation * retroVec, roughness );
				return envMapColor.rgb * envMapIntensity;
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
		#ifdef USE_RETROREFLECTION
			vec3 getIBLAnisotropyRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
				#ifdef ENVMAP_TYPE_CUBE_UV
					vec3 bentNormal = cross( bitangent, viewDir );
					bentNormal = normalize( cross( bentNormal, bitangent ) );
					bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
					return getIBLRetroRadiance( viewDir, bentNormal, roughness );
				#else
					return vec3( 0.0 );
				#endif
			}
		#endif
	#endif
#endif`,Qg=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Jg=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,e_=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,t_=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,n_=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_RETROREFLECTION
	material.retroreflectivity = retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,i_=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	vec2 dfg;
	vec3 multiScatteringCompensation;
	#ifdef USE_RETROREFLECTION
		float retroreflectivity;
	#endif
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0Dielectric;
		vec3 iridescenceF0Metallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec2 fab, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec2 fab, const in vec3 specularColor, const in float specularF90, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	vec3 specularBRDF = BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	#ifdef USE_RETROREFLECTION
		vec3 retroViewDir = reflect( - geometryViewDir, geometryNormal );
		vec3 retroSpecularBRDF = BRDF_GGX( directLight.direction, retroViewDir, geometryNormal, material );
		specularBRDF = mix( specularBRDF, retroSpecularBRDF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directSpecular += irradiance * specularBRDF * material.multiScatteringCompensation;
	vec3 halfDir = normalize( directLight.direction + geometryViewDir );
	float dotVH = saturate( dot( geometryViewDir, halfDir ) );
	vec3 F = F_Schlick( material.specularColor, material.specularF90, dotVH );
	#ifdef USE_RETROREFLECTION
		vec3 retroHalfDir = normalize( directLight.direction + retroViewDir );
		float dotRetroVH = saturate( dot( retroViewDir, retroHalfDir ) );
		vec3 retroF = F_Schlick( material.specularColor, material.specularF90, dotRetroVH );
		F = mix( F, retroF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - F );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScattering, multiScattering );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScattering, multiScattering );
	#endif
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - singleScattering - multiScattering );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		sheenSpecularIndirect += irradiance * material.sheenColor * sheenAlbedo * RECIPROCAL_PI;
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( material.dfg, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceF0Metallic, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( material.dfg, material.diffuseColor, material.specularF90, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,r_=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		vec3 iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		vec3 iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( iridescenceFresnelDielectric, iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0Dielectric = Schlick_to_F0( iridescenceFresnelDielectric, 1.0, dotNVi );
		material.iridescenceF0Metallic = Schlick_to_F0( iridescenceFresnelMetallic, 1.0, dotNVi );
	}
#endif
#ifdef STANDARD
	float dotNVms = saturate( dot( geometryNormal, geometryViewDir ) );
	material.dfg = texture2D( dfgLUT, vec2( material.roughness, dotNVms ) ).rg;
	#if ( NUM_SUN_LIGHTS > 0 || NUM_DIR_LIGHTS > 0 || NUM_POINT_LIGHTS > 0 || NUM_SPOT_LIGHTS > 0 )
		float EssMs = material.dfg.x + material.dfg.y;
		material.multiScatteringCompensation = 1.0 + material.specularColorBlended * ( 1.0 / EssMs - 1.0 );
	#endif
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SUN_LIGHTS > 0 ) && defined( RE_Direct )
	SunLight sunLight;
	#if defined( USE_SHADOWMAP ) && NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHTS; i ++ ) {
		sunLight = sunLights[ i ];
		getSunLightInfo( sunLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SUN_LIGHT_SHADOWS )
		sunLightShadow = sunLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getSunShadow( sunShadowMap[ i ], sunLightShadow, UNROLLED_LOOP_INDEX ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#ifdef USE_LIGHT_PROBES_GRID
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,o_=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		vec3 iblRadiance = getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		vec3 iblRadiance = getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_RETROREFLECTION
		#ifdef USE_ANISOTROPY
			vec3 retroIBLRadiance = getIBLAnisotropyRetroRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
		#else
			vec3 retroIBLRadiance = getIBLRetroRadiance( geometryViewDir, geometryNormal, material.roughness );
		#endif
		iblRadiance = mix( iblRadiance, retroIBLRadiance, saturate( material.retroreflectivity ) );
	#endif
	radiance += iblRadiance;
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,a_=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,s_=`#ifdef USE_LIGHT_PROBES_GRID
uniform highp sampler3D probesSH;
uniform vec3 probesMin;
uniform vec3 probesMax;
uniform vec3 probesResolution;
vec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 resMinusOne = res - 1.0;
	vec3 probeSpacing = gridRange / resMinusOne;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );
	uvw = uvw * resMinusOne / res + 0.5 / res;
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,c_=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,l_=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,u_=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,f_=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,d_=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,p_=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,h_=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,m_=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,g_=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,__=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,v_=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,x_=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,S_=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,T_=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,b_=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,E_=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,y_=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,M_=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,A_=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,w_=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,R_=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,P_=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,C_=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,I_=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,D_=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,L_=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,N_=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,U_=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,F_=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,B_=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,O_=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,G_=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,H_=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,k_=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		#define SUN_LIGHT_CASCADES 2
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#else
			uniform sampler2D sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#endif
		uniform mat4 sunShadowMatrix[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		uniform vec4 sunShadowCascade[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
		struct SunLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SunLightShadow sunLightShadows[ NUM_SUN_LIGHT_SHADOWS ];
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_SUN_LIGHT_SHADOWS > 0
		float getSunShadow(
			#if defined( SHADOWMAP_TYPE_PCF )
				sampler2DShadow shadowMap,
			#else
				sampler2D shadowMap,
			#endif
			SunLightShadow sunLightShadow,
			int shadowIndex
		) {
			vec4 shadowWorldPosition = vec4( vSunShadowWorldPosition.xyz + vSunShadowWorldNormal * sunLightShadow.shadowNormalBias, 1.0 );
			float viewDepth = vSunShadowWorldPosition.w;
			int cascadeOffset = shadowIndex * SUN_LIGHT_CASCADES;
			float shadow = 1.0;
			for ( int i = SUN_LIGHT_CASCADES - 1; i >= 0; i -- ) {
				vec4 cascade = sunShadowCascade[ cascadeOffset + i ];
				if ( viewDepth >= cascade.x && viewDepth < cascade.y ) {
					float cascadeShadow = getShadow(
						shadowMap,
						sunLightShadow.shadowMapSize,
						sunLightShadow.shadowIntensity,
						sunLightShadow.shadowBias,
						sunLightShadow.shadowRadius,
						sunShadowMatrix[ cascadeOffset + i ] * shadowWorldPosition
					);
					shadow = mix( cascadeShadow, shadow, smoothstep( cascade.z, cascade.y, viewDepth ) );
				}
			}
			return shadow;
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,V_=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,z_=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_SUN_LIGHT_SHADOWS > 0
		vSunShadowWorldPosition = vec4( worldPosition.xyz, - mvPosition.z );
		vSunShadowWorldNormal = shadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,W_=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHT_SHADOWS; i ++ ) {
		sunLight = sunLightShadows[ i ];
		shadow *= receiveShadow ? getSunShadow( sunShadowMap[ i ], sunLight, UNROLLED_LOOP_INDEX ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,$_=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,X_=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,q_=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Y_=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,K_=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Z_=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,j_=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Q_=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,J_=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,ev=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,tv=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,nv=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,iv=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,rv=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,ov=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,av=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,sv=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,cv=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,lv=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,uv=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,fv=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,dv=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,pv=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,hv=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,mv=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,gv=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,_v=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,vv=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,xv=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,Sv=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Tv=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,bv=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Ev=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,yv=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Mv=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,Av=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,wv=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Rv=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Pv=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,Cv=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_RETROREFLECTION
	uniform float retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Iv=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Dv=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Lv=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,Nv=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Uv=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Fv=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Bv=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Ov=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,De={alphahash_fragment:og,alphahash_pars_fragment:ag,alphamap_fragment:sg,alphamap_pars_fragment:cg,alphatest_fragment:lg,alphatest_pars_fragment:ug,aomap_fragment:fg,aomap_pars_fragment:dg,batching_pars_vertex:pg,batching_vertex:hg,begin_vertex:mg,beginnormal_vertex:gg,bsdfs:_g,iridescence_fragment:vg,bumpmap_pars_fragment:xg,clipping_planes_fragment:Sg,clipping_planes_pars_fragment:Tg,clipping_planes_pars_vertex:bg,clipping_planes_vertex:Eg,color_fragment:yg,color_pars_fragment:Mg,color_pars_vertex:Ag,color_vertex:wg,common:Rg,cube_uv_reflection_fragment:Pg,defaultnormal_vertex:Cg,displacementmap_pars_vertex:Ig,displacementmap_vertex:Dg,emissivemap_fragment:Lg,emissivemap_pars_fragment:Ng,colorspace_fragment:Ug,colorspace_pars_fragment:Fg,envmap_fragment:Bg,envmap_common_pars_fragment:Og,envmap_pars_fragment:Gg,envmap_pars_vertex:Hg,envmap_physical_pars_fragment:jg,envmap_vertex:kg,fog_vertex:Vg,fog_pars_vertex:zg,fog_fragment:Wg,fog_pars_fragment:$g,gradientmap_pars_fragment:Xg,lightmap_pars_fragment:qg,lights_lambert_fragment:Yg,lights_lambert_pars_fragment:Kg,lights_pars_begin:Zg,lights_toon_fragment:Qg,lights_toon_pars_fragment:Jg,lights_phong_fragment:e_,lights_phong_pars_fragment:t_,lights_physical_fragment:n_,lights_physical_pars_fragment:i_,lights_fragment_begin:r_,lights_fragment_maps:o_,lights_fragment_end:a_,lightprobes_pars_fragment:s_,logdepthbuf_fragment:c_,logdepthbuf_pars_fragment:l_,logdepthbuf_pars_vertex:u_,logdepthbuf_vertex:f_,map_fragment:d_,map_pars_fragment:p_,map_particle_fragment:h_,map_particle_pars_fragment:m_,metalnessmap_fragment:g_,metalnessmap_pars_fragment:__,morphinstance_vertex:v_,morphcolor_vertex:x_,morphnormal_vertex:S_,morphtarget_pars_vertex:T_,morphtarget_vertex:b_,normal_fragment_begin:E_,normal_fragment_maps:y_,normal_pars_fragment:M_,normal_pars_vertex:A_,normal_vertex:w_,normalmap_pars_fragment:R_,clearcoat_normal_fragment_begin:P_,clearcoat_normal_fragment_maps:C_,clearcoat_pars_fragment:I_,iridescence_pars_fragment:D_,opaque_fragment:L_,packing:N_,premultiplied_alpha_fragment:U_,project_vertex:F_,dithering_fragment:B_,dithering_pars_fragment:O_,roughnessmap_fragment:G_,roughnessmap_pars_fragment:H_,shadowmap_pars_fragment:k_,shadowmap_pars_vertex:V_,shadowmap_vertex:z_,shadowmask_pars_fragment:W_,skinbase_vertex:$_,skinning_pars_vertex:X_,skinning_vertex:q_,skinnormal_vertex:Y_,specularmap_fragment:K_,specularmap_pars_fragment:Z_,tonemapping_fragment:j_,tonemapping_pars_fragment:Q_,transmission_fragment:J_,transmission_pars_fragment:ev,uv_pars_fragment:tv,uv_pars_vertex:nv,uv_vertex:iv,worldpos_vertex:rv,background_vert:ov,background_frag:av,backgroundCube_vert:sv,backgroundCube_frag:cv,cube_vert:lv,cube_frag:uv,depth_vert:fv,depth_frag:dv,distance_vert:pv,distance_frag:hv,equirect_vert:mv,equirect_frag:gv,linedashed_vert:_v,linedashed_frag:vv,meshbasic_vert:xv,meshbasic_frag:Sv,meshlambert_vert:Tv,meshlambert_frag:bv,meshmatcap_vert:Ev,meshmatcap_frag:yv,meshnormal_vert:Mv,meshnormal_frag:Av,meshphong_vert:wv,meshphong_frag:Rv,meshphysical_vert:Pv,meshphysical_frag:Cv,meshtoon_vert:Iv,meshtoon_frag:Dv,points_vert:Lv,points_frag:Nv,shadow_vert:Uv,shadow_frag:Fv,sprite_vert:Bv,sprite_frag:Ov},ue={common:{diffuse:{value:new Xe(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new He},alphaMap:{value:null},alphaMapTransform:{value:new He},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new He}},envmap:{envMap:{value:null},envMapRotation:{value:new He},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new He}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new He}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new He},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new He},normalScale:{value:new Ne(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new He},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new He}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new He}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new He}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Xe(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new j},probesMax:{value:new j},probesResolution:{value:new j}},points:{diffuse:{value:new Xe(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new He},alphaTest:{value:0},uvTransform:{value:new He}},sprite:{diffuse:{value:new Xe(16777215)},opacity:{value:1},center:{value:new Ne(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new He},alphaMap:{value:null},alphaMapTransform:{value:new He},alphaTest:{value:0}}},kn={basic:{uniforms:an([ue.common,ue.specularmap,ue.envmap,ue.aomap,ue.lightmap,ue.fog]),vertexShader:De.meshbasic_vert,fragmentShader:De.meshbasic_frag},lambert:{uniforms:an([ue.common,ue.specularmap,ue.envmap,ue.aomap,ue.lightmap,ue.emissivemap,ue.bumpmap,ue.normalmap,ue.displacementmap,ue.fog,ue.lights,{emissive:{value:new Xe(0)},envMapIntensity:{value:1}}]),vertexShader:De.meshlambert_vert,fragmentShader:De.meshlambert_frag},phong:{uniforms:an([ue.common,ue.specularmap,ue.envmap,ue.aomap,ue.lightmap,ue.emissivemap,ue.bumpmap,ue.normalmap,ue.displacementmap,ue.fog,ue.lights,{emissive:{value:new Xe(0)},specular:{value:new Xe(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:De.meshphong_vert,fragmentShader:De.meshphong_frag},standard:{uniforms:an([ue.common,ue.envmap,ue.aomap,ue.lightmap,ue.emissivemap,ue.bumpmap,ue.normalmap,ue.displacementmap,ue.roughnessmap,ue.metalnessmap,ue.fog,ue.lights,{emissive:{value:new Xe(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:De.meshphysical_vert,fragmentShader:De.meshphysical_frag},toon:{uniforms:an([ue.common,ue.aomap,ue.lightmap,ue.emissivemap,ue.bumpmap,ue.normalmap,ue.displacementmap,ue.gradientmap,ue.fog,ue.lights,{emissive:{value:new Xe(0)}}]),vertexShader:De.meshtoon_vert,fragmentShader:De.meshtoon_frag},matcap:{uniforms:an([ue.common,ue.bumpmap,ue.normalmap,ue.displacementmap,ue.fog,{matcap:{value:null}}]),vertexShader:De.meshmatcap_vert,fragmentShader:De.meshmatcap_frag},points:{uniforms:an([ue.points,ue.fog]),vertexShader:De.points_vert,fragmentShader:De.points_frag},dashed:{uniforms:an([ue.common,ue.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:De.linedashed_vert,fragmentShader:De.linedashed_frag},depth:{uniforms:an([ue.common,ue.displacementmap]),vertexShader:De.depth_vert,fragmentShader:De.depth_frag},normal:{uniforms:an([ue.common,ue.bumpmap,ue.normalmap,ue.displacementmap,{opacity:{value:1}}]),vertexShader:De.meshnormal_vert,fragmentShader:De.meshnormal_frag},sprite:{uniforms:an([ue.sprite,ue.fog]),vertexShader:De.sprite_vert,fragmentShader:De.sprite_frag},background:{uniforms:{uvTransform:{value:new He},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:De.background_vert,fragmentShader:De.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new He}},vertexShader:De.backgroundCube_vert,fragmentShader:De.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:De.cube_vert,fragmentShader:De.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:De.equirect_vert,fragmentShader:De.equirect_frag},distance:{uniforms:an([ue.common,ue.displacementmap,{referencePosition:{value:new j},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:De.distance_vert,fragmentShader:De.distance_frag},shadow:{uniforms:an([ue.lights,ue.fog,{color:{value:new Xe(0)},opacity:{value:1}}]),vertexShader:De.shadow_vert,fragmentShader:De.shadow_frag}};kn.physical={uniforms:an([kn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new He},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new He},clearcoatNormalScale:{value:new Ne(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new He},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new He},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new He},sheen:{value:0},sheenColor:{value:new Xe(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new He},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new He},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new He},transmissionSamplerSize:{value:new Ne},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new He},attenuationDistance:{value:0},attenuationColor:{value:new Xe(0)},specularColor:{value:new Xe(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new He},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new He},anisotropyVector:{value:new Ne},anisotropyMap:{value:null},anisotropyMapTransform:{value:new He}}]),vertexShader:De.meshphysical_vert,fragmentShader:De.meshphysical_frag};var $o={r:0,b:0,g:0},Gv=new $e,Sd=new He;Sd.set(-1,0,0,0,1,0,0,0,1);function Hv(t,e,n,i,r,o){let a=new Xe(0),c=r===!0?0:1,l,f,p=null,u=0,s=null;function h(_){let E=_.isScene===!0?_.background:null;if(E&&E.isTexture){let v=_.backgroundBlurriness>0;E=e.get(E,v)}return E}function g(_){let E=!1,v=h(_);v===null?d(a,c):v&&v.isColor&&(d(v,1),E=!0);let T=t.xr.getEnvironmentBlendMode();T==="additive"?n.buffers.color.setClear(0,0,0,1,o):T==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(t.autoClear||E)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil))}function b(_,E){let v=h(E);v&&(v.isCubeTexture||v.mapping===Or)?(f===void 0&&(f=new hn(new zo(1,1,1),new qt({name:"BackgroundCubeMaterial",uniforms:Wo(kn.backgroundCube.uniforms),vertexShader:kn.backgroundCube.vertexShader,fragmentShader:kn.backgroundCube.fragmentShader,side:$t,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),f.geometry.deleteAttribute("normal"),f.geometry.deleteAttribute("uv"),f.onBeforeRender=function(T,M,R){this.matrixWorld.copyPosition(R.matrixWorld)},Object.defineProperty(f.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(f)),f.material.uniforms.envMap.value=v,f.material.uniforms.backgroundBlurriness.value=E.backgroundBlurriness,f.material.uniforms.backgroundIntensity.value=E.backgroundIntensity,f.material.uniforms.backgroundRotation.value.setFromMatrix4(Gv.makeRotationFromEuler(E.backgroundRotation)).transpose(),v.isCubeTexture&&v.isRenderTargetTexture===!1&&f.material.uniforms.backgroundRotation.value.premultiply(Sd),f.material.toneMapped=Et.getTransfer(v.colorSpace)!==ft,(p!==v||u!==v.version||s!==t.toneMapping)&&(f.material.needsUpdate=!0,p=v,u=v.version,s=t.toneMapping),f.layers.enableAll(),_.unshift(f,f.geometry,f.material,0,0,null)):v&&v.isTexture&&(l===void 0&&(l=new hn(new Dc(2,2),new qt({name:"BackgroundMaterial",uniforms:Wo(kn.background.uniforms),vertexShader:kn.background.vertexShader,fragmentShader:kn.background.fragmentShader,side:Cn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(l)),l.material.uniforms.t2D.value=v,l.material.uniforms.backgroundIntensity.value=E.backgroundIntensity,l.material.toneMapped=Et.getTransfer(v.colorSpace)!==ft,v.matrixAutoUpdate===!0&&v.updateMatrix(),l.material.uniforms.uvTransform.value.copy(v.matrix),(p!==v||u!==v.version||s!==t.toneMapping)&&(l.material.needsUpdate=!0,p=v,u=v.version,s=t.toneMapping),l.layers.enableAll(),_.unshift(l,l.geometry,l.material,0,0,null))}function d(_,E){_.getRGB($o,Lc(t)),n.buffers.color.setClear($o.r,$o.g,$o.b,E,o)}function m(){f!==void 0&&(f.geometry.dispose(),f.material.dispose(),f=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return a},setClearColor:function(_,E=1){a.set(_),c=E,d(a,c)},getClearAlpha:function(){return c},setClearAlpha:function(_){c=_,d(a,c)},render:g,addToRenderList:b,dispose:m}}function kv(t,e){let n=t.getParameter(t.MAX_VERTEX_ATTRIBS),i={},r=s(null),o=r,a=!1;function c(D,C,L,I,B){let z=!1,W=u(D,I,L,C);o!==W&&(o=W,f(o.object)),z=h(D,I,L,B),z&&g(D,I,L,B),B!==null&&e.update(B,t.ELEMENT_ARRAY_BUFFER),(z||a)&&(a=!1,v(D,C,L,I),B!==null&&t.bindBuffer(t.ELEMENT_ARRAY_BUFFER,e.get(B).buffer))}function l(){return t.createVertexArray()}function f(D){return t.bindVertexArray(D)}function p(D){return t.deleteVertexArray(D)}function u(D,C,L,I){let B=I.wireframe===!0,z=i[C.id];z===void 0&&(z={},i[C.id]=z);let W=D.isInstancedMesh===!0?D.id:0,ne=z[W];ne===void 0&&(ne={},z[W]=ne);let K=ne[L.id];K===void 0&&(K={},ne[L.id]=K);let ee=K[B];return ee===void 0&&(ee=s(l()),K[B]=ee),ee}function s(D){let C=[],L=[],I=[];for(let B=0;B<n;B++)C[B]=0,L[B]=0,I[B]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:C,enabledAttributes:L,attributeDivisors:I,object:D,attributes:{},index:null}}function h(D,C,L,I){let B=o.attributes,z=C.attributes,W=0,ne=L.getAttributes();for(let K in ne)if(ne[K].location>=0){let te=B[K],we=z[K];if(we===void 0&&(K==="instanceMatrix"&&D.instanceMatrix&&(we=D.instanceMatrix),K==="instanceColor"&&D.instanceColor&&(we=D.instanceColor)),te===void 0||te.attribute!==we||we&&te.data!==we.data)return!0;W++}return o.attributesNum!==W||o.index!==I}function g(D,C,L,I){let B={},z=C.attributes,W=0,ne=L.getAttributes();for(let K in ne)if(ne[K].location>=0){let te=z[K];te===void 0&&(K==="instanceMatrix"&&D.instanceMatrix&&(te=D.instanceMatrix),K==="instanceColor"&&D.instanceColor&&(te=D.instanceColor));let we={};we.attribute=te,te&&te.data&&(we.data=te.data),B[K]=we,W++}o.attributes=B,o.attributesNum=W,o.index=I}function b(){let D=o.newAttributes;for(let C=0,L=D.length;C<L;C++)D[C]=0}function d(D){m(D,0)}function m(D,C){let L=o.newAttributes,I=o.enabledAttributes,B=o.attributeDivisors;L[D]=1,I[D]===0&&(t.enableVertexAttribArray(D),I[D]=1),B[D]!==C&&(t.vertexAttribDivisor(D,C),B[D]=C)}function _(){let D=o.newAttributes,C=o.enabledAttributes;for(let L=0,I=C.length;L<I;L++)C[L]!==D[L]&&(t.disableVertexAttribArray(L),C[L]=0)}function E(D,C,L,I,B,z,W){W===!0?t.vertexAttribIPointer(D,C,L,B,z):t.vertexAttribPointer(D,C,L,I,B,z)}function v(D,C,L,I){b();let B=I.attributes,z=L.getAttributes(),W=C.defaultAttributeValues;for(let ne in z){let K=z[ne];if(K.location>=0){let ee=B[ne];if(ee===void 0&&(ne==="instanceMatrix"&&D.instanceMatrix&&(ee=D.instanceMatrix),ne==="instanceColor"&&D.instanceColor&&(ee=D.instanceColor)),ee!==void 0){let te=ee.normalized,we=ee.itemSize,Me=e.get(ee);if(Me===void 0)continue;let Pt=Me.buffer,ze=Me.type,et=Me.bytesPerElement,q=ze===t.INT||ze===t.UNSIGNED_INT||ee.gpuType===bi;if(ee.isInterleavedBufferAttribute){let Q=ee.data,xe=Q.stride,Ce=ee.offset;if(Q.isInstancedInterleavedBuffer){for(let ge=0;ge<K.locationSize;ge++)m(K.location+ge,Q.meshPerAttribute);D.isInstancedMesh!==!0&&I._maxInstanceCount===void 0&&(I._maxInstanceCount=Q.meshPerAttribute*Q.count)}else for(let ge=0;ge<K.locationSize;ge++)d(K.location+ge);t.bindBuffer(t.ARRAY_BUFFER,Pt);for(let ge=0;ge<K.locationSize;ge++)E(K.location+ge,we/K.locationSize,ze,te,xe*et,(Ce+we/K.locationSize*ge)*et,q)}else{if(ee.isInstancedBufferAttribute){for(let Q=0;Q<K.locationSize;Q++)m(K.location+Q,ee.meshPerAttribute);D.isInstancedMesh!==!0&&I._maxInstanceCount===void 0&&(I._maxInstanceCount=ee.meshPerAttribute*ee.count)}else for(let Q=0;Q<K.locationSize;Q++)d(K.location+Q);t.bindBuffer(t.ARRAY_BUFFER,Pt);for(let Q=0;Q<K.locationSize;Q++)E(K.location+Q,we/K.locationSize,ze,te,we*et,we/K.locationSize*Q*et,q)}}else if(W!==void 0){let te=W[ne];if(te!==void 0)switch(te.length){case 2:t.vertexAttrib2fv(K.location,te);break;case 3:t.vertexAttrib3fv(K.location,te);break;case 4:t.vertexAttrib4fv(K.location,te);break;default:t.vertexAttrib1fv(K.location,te)}}}}_()}function T(){A();for(let D in i){let C=i[D];for(let L in C){let I=C[L];for(let B in I){let z=I[B];for(let W in z)p(z[W].object),delete z[W];delete I[B]}}delete i[D]}}function M(D){if(i[D.id]===void 0)return;let C=i[D.id];for(let L in C){let I=C[L];for(let B in I){let z=I[B];for(let W in z)p(z[W].object),delete z[W];delete I[B]}}delete i[D.id]}function R(D){for(let C in i){let L=i[C];for(let I in L){let B=L[I];if(B[D.id]===void 0)continue;let z=B[D.id];for(let W in z)p(z[W].object),delete z[W];delete B[D.id]}}}function x(D){for(let C in i){let L=i[C],I=D.isInstancedMesh===!0?D.id:0,B=L[I];if(B!==void 0){for(let z in B){let W=B[z];for(let ne in W)p(W[ne].object),delete W[ne];delete B[z]}delete L[I],Object.keys(L).length===0&&delete i[C]}}}function A(){w(),a=!0,o!==r&&(o=r,f(o.object))}function w(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:c,reset:A,resetDefaultState:w,dispose:T,releaseStatesOfGeometry:M,releaseStatesOfObject:x,releaseStatesOfProgram:R,initAttributes:b,enableAttribute:d,disableUnusedAttributes:_}}function Vv(t,e,n){let i;function r(l){i=l}function o(l,f){t.drawArrays(i,l,f),n.update(f,i,1)}function a(l,f,p){p!==0&&(t.drawArraysInstanced(i,l,f,p),n.update(f,i,p))}function c(l,f,p){if(p===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,l,0,f,0,p);let s=0;for(let h=0;h<p;h++)s+=f[h];n.update(s,i,1)}this.setMode=r,this.render=o,this.renderInstances=a,this.renderMultiDraw=c}function zv(t,e,n,i){let r;function o(){if(r!==void 0)return r;if(e.has("EXT_texture_filter_anisotropic")===!0){let R=e.get("EXT_texture_filter_anisotropic");r=t.getParameter(R.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function a(R){return!(R!==Pe&&i.convert(R)!==t.getParameter(t.IMPLEMENTATION_COLOR_READ_FORMAT))}function c(R){let x=R===Mt&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(R!==Jt&&R!==Be&&!x&&i.convert(R)!==t.getParameter(t.IMPLEMENTATION_COLOR_READ_TYPE))}function l(R){if(R==="highp"){if(t.getShaderPrecisionFormat(t.VERTEX_SHADER,t.HIGH_FLOAT).precision>0&&t.getShaderPrecisionFormat(t.FRAGMENT_SHADER,t.HIGH_FLOAT).precision>0)return"highp";R="mediump"}return R==="mediump"&&t.getShaderPrecisionFormat(t.VERTEX_SHADER,t.MEDIUM_FLOAT).precision>0&&t.getShaderPrecisionFormat(t.FRAGMENT_SHADER,t.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let f=n.precision!==void 0?n.precision:"highp",p=l(f);p!==f&&(it("WebGLRenderer:",f,"not supported, using",p,"instead."),f=p);let u=n.logarithmicDepthBuffer===!0,s=n.reversedDepthBuffer===!0&&e.has("EXT_clip_control");n.reversedDepthBuffer===!0&&s===!1&&it("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");let h=t.getParameter(t.MAX_TEXTURE_IMAGE_UNITS),g=t.getParameter(t.MAX_VERTEX_TEXTURE_IMAGE_UNITS),b=t.getParameter(t.MAX_TEXTURE_SIZE),d=t.getParameter(t.MAX_CUBE_MAP_TEXTURE_SIZE),m=t.getParameter(t.MAX_VERTEX_ATTRIBS),_=t.getParameter(t.MAX_VERTEX_UNIFORM_VECTORS),E=t.getParameter(t.MAX_VARYING_VECTORS),v=t.getParameter(t.MAX_FRAGMENT_UNIFORM_VECTORS),T=t.getParameter(t.MAX_SAMPLES),M=t.getParameter(t.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:o,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:c,precision:f,logarithmicDepthBuffer:u,reversedDepthBuffer:s,maxTextures:h,maxVertexTextures:g,maxTextureSize:b,maxCubemapSize:d,maxAttributes:m,maxVertexUniforms:_,maxVaryings:E,maxFragmentUniforms:v,maxSamples:T,samples:M}}function Wv(t){let e=this,n=null,i=0,r=!1,o=!1,a=new ji,c=new He,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(u,s){let h=u.length!==0||s||i!==0||r;return r=s,i=u.length,h},this.beginShadows=function(){o=!0,p(null)},this.endShadows=function(){o=!1},this.setGlobalState=function(u,s){n=p(u,s,0)},this.setState=function(u,s,h){let g=u.clippingPlanes,b=u.clipIntersection,d=u.clipShadows,m=t.get(u);if(!r||g===null||g.length===0||o&&!d)o?p(null):f();else{let _=o?0:i,E=_*4,v=m.clippingState||null;l.value=v,v=p(g,s,E,h);for(let T=0;T!==E;++T)v[T]=n[T];m.clippingState=v,this.numIntersection=b?this.numPlanes:0,this.numPlanes+=_}};function f(){l.value!==n&&(l.value=n,l.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function p(u,s,h,g){let b=u!==null?u.length:0,d=null;if(b!==0){if(d=l.value,g!==!0||d===null){let m=h+b*4,_=s.matrixWorldInverse;c.getNormalMatrix(_),(d===null||d.length<m)&&(d=new Float32Array(m));for(let E=0,v=h;E!==b;++E,v+=4)a.copy(u[E]).applyMatrix4(_,c),a.normal.toArray(d,v),d[v+3]=a.constant}l.value=d,l.needsUpdate=!0}return e.numPlanes=b,e.numIntersection=0,d}}var Ji=4,$v=6,Xv=20,qv=256,$r=new Wr,Qf=new Xe,Bc=null,Oc=0,Gc=0,Hc=!1,Yv=new j,Ri=new j,qo=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,n=0,i=.1,r=100,o={}){let{size:a=256,position:c=Yv}=o;Bc=this._renderer.getRenderTarget(),Oc=this._renderer.getActiveCubeFace(),Gc=this._renderer.getActiveMipmapLevel(),Hc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);let l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,i,r,l,c),n>0&&this._blur(l,0,0,n),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,n=null){return this._fromTexture(e,n)}fromCubemap(e,n=null){return this._fromTexture(e,n)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=td(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=ed(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(Bc,Oc,Gc),this._renderer.xr.enabled=Hc,e.scissorTest=!1,Qi(e,0,0,e.width,e.height)}_fromTexture(e,n){e.mapping===Yi||e.mapping===xi?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Bc=this._renderer.getRenderTarget(),Oc=this._renderer.getActiveCubeFace(),Gc=this._renderer.getActiveMipmapLevel(),Hc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let i=n||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),n=4*this._cubeSize,i={magFilter:st,minFilter:st,generateMipmaps:!1,type:Mt,format:Pe,colorSpace:xc,depthBuffer:!1},r=Jf(e,n,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==n){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Jf(e,n,i);let{_lodMax:o}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=Kv(o)),this._blurMaterial=jv(o,e,n),this._ggxMaterial=Zv(o,e,n)}return r}_compileMaterial(e){let n=new hn(new Xt,e);this._renderer.compile(n,$r)}_sceneToCubeUV(e,n,i,r,o){let l=new Yn(90,1,n,i),f=[1,-1,1,1,1,1],p=[1,1,1,-1,-1,-1],u=this._renderer,s=u.autoClear,h=u.toneMapping;u.getClearColor(Qf),u.toneMapping=_n,u.autoClear=!1,u.state.buffers.depth.getReversed()&&(u.setRenderTarget(r),u.clearDepth(),u.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new hn(new zo,new Vo({name:"PMREM.Background",side:$t,depthWrite:!1,depthTest:!1})));let b=this._backgroundBox,d=b.material,m=!1,_=e.background;_?_.isColor&&(d.color.copy(_),e.background=null,m=!0):(d.color.copy(Qf),m=!0);for(let E=0;E<6;E++){let v=E%3;v===0?(l.up.set(0,f[E],0),l.position.set(o.x,o.y,o.z),l.lookAt(o.x+p[E],o.y,o.z)):v===1?(l.up.set(0,0,f[E]),l.position.set(o.x,o.y,o.z),l.lookAt(o.x,o.y+p[E],o.z)):(l.up.set(0,f[E],0),l.position.set(o.x,o.y,o.z),l.lookAt(o.x,o.y,o.z+p[E]));let T=this._cubeSize;Qi(r,v*T,E>2?T:0,T,T),u.setRenderTarget(r),m&&u.render(b,l),u.render(e,l)}u.toneMapping=h,u.autoClear=s,e.background=_}_textureToCubeUV(e,n){let i=this._renderer,r=e.mapping===Yi||e.mapping===xi;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=td()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=ed());let o=r?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=o;let c=o.uniforms;c.envMap.value=e;let l=this._cubeSize;Qi(n,0,0,3*l,2*l),i.setRenderTarget(n),i.render(a,$r)}_applyPMREM(e){let n=this._renderer,i=n.autoClear;n.autoClear=!1;let r=this._lodMeshes.length;for(let o=1;o<r;o++)this._applyGGXFilter(e,o-1,o);n.autoClear=i}_applyGGXFilter(e,n,i){let r=this._renderer,o=this._pingPongRenderTarget,a=this._ggxMaterial,c=this._lodMeshes[i];c.material=a;let l=a.uniforms,f=i/(this._lodMeshes.length-1),p=n/(this._lodMeshes.length-1),u=Math.sqrt(f*f-p*p),s=f*1.25,h=u*s,{_lodMax:g}=this,b=this._sizeLods[i],d=3*b*(i>g-Ji?i-g+Ji:0),m=4*(this._cubeSize-b);l.envMap.value=e.texture,l.roughness.value=h,l.mipInt.value=g-n,Qi(o,d,m,3*b,2*b),r.setRenderTarget(o),r.render(c,$r),l.envMap.value=o.texture,l.roughness.value=0,l.mipInt.value=g-i,Qi(e,d,m,3*b,2*b),r.setRenderTarget(e),r.render(c,$r)}_blur(e,n,i,r){let o=this._pingPongRenderTarget,a=Math.min(r,Math.PI)/Math.SQRT2;this._blurPass(e,o,n,i,a),this._blurPass(o,e,i,i,a)}_blurPass(e,n,i,r,o){let a=this._renderer,c=this._blurMaterial,l=this._lodMeshes[r];l.material=c;let f=c.uniforms;f.envMap.value=e.texture,f.sigma.value=o,f.mipInt.value=this._lodMax-i;let p=this._sizeLods[r],u=3*p*(r>this._lodMax-Ji?r-this._lodMax+Ji:0),s=4*(this._cubeSize-p);Qi(n,u,s,3*p,2*p),a.setRenderTarget(n),a.render(l,$r)}};function Kv(t){let e=[],n=[],i=t,r=t-Ji+1+$v;for(let o=0;o<r;o++){let a=Math.pow(2,i);e.push(a);let c=1/(a-2),l=-c,f=1+c,p=[l,l,f,l,f,f,l,l,f,f,l,f],u=6,s=6,h=3,g=new Float32Array(h*s*u),b=new Float32Array(h*s*u);for(let m=0;m<u;m++){let _=m%3*2/3-1,E=m>2?0:-1,v=[_,E,0,_+2/3,E,0,_+2/3,E+1,0,_,E,0,_+2/3,E+1,0,_,E+1,0];g.set(v,h*s*m);for(let T=0;T<s;T++){let M=p[T*2]*2-1,R=p[T*2+1]*2-1;m===0?Ri.set(1,R,M):m===1?Ri.set(-M,1,-R):m===2?Ri.set(-M,R,1):m===3?Ri.set(-1,R,-M):m===4?Ri.set(-M,-1,R):Ri.set(M,R,-1),Ri.toArray(b,(m*s+T)*h)}}let d=new Xt;d.setAttribute("position",new Tt(g,h)),d.setAttribute("outputDirection",new Tt(b,h)),n.push(new hn(d,null)),i>Ji&&i--}return{lodMeshes:n,sizeLods:e}}function Jf(t,e,n){let i=new Dt(t,e,n);return i.texture.mapping=Or,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function Qi(t,e,n,i,r){t.viewport.set(e,n,i,r),t.scissor.set(e,n,i,r)}function Zv(t,e,n){return new qt({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:qv,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${t}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Ko(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:Ot,depthTest:!1,depthWrite:!1})}function jv(t,e,n){return new qt({name:"SphericalGaussianBlur",defines:{SAMPLES:Xv,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${t}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:Ko(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float sigma;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359
			#define GOLDEN_ANGLE 2.39996322973

			void main() {

				if ( sigma == 0.0 ) {

					gl_FragColor = vec4( bilinearCubeUV( envMap, vOutputDirection, mipInt ), 1.0 );
					return;

				}

				vec3 outputDirection = normalize( vOutputDirection );

				vec3 up = abs( outputDirection.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
				vec3 tangent = normalize( cross( up, outputDirection ) );
				vec3 bitangent = cross( outputDirection, tangent );

				// Truncate the kernel at three standard deviations or at the antipode.
				float thetaMax = min( 3.0 * sigma, PI );
				float truncation = 1.0 - exp( - 0.5 * thetaMax * thetaMax / ( sigma * sigma ) );

				vec3 accumColor = vec3( 0.0 );
				float accumWeight = 0.0;

				for ( int i = 0; i < SAMPLES; i ++ ) {

					// Stratified inverse-CDF sampling of the Gaussian, placed on a golden-angle spiral.
					float stratum = ( float( i ) + 0.5 ) / float( SAMPLES );
					float theta = sigma * sqrt( - 2.0 * log( 1.0 - stratum * truncation ) );
					float phi = float( i ) * GOLDEN_ANGLE;

					vec3 offset = cos( phi ) * tangent + sin( phi ) * bitangent;
					vec3 sampleDirection = cos( theta ) * outputDirection + sin( theta ) * offset;

					// Correct the planar sample density to solid angle.
					float weight = sin( theta ) / theta;

					accumColor += weight * bilinearCubeUV( envMap, sampleDirection, mipInt );
					accumWeight += weight;

				}

				gl_FragColor = vec4( accumColor / accumWeight, 1.0 );

			}
		`,blending:Ot,depthTest:!1,depthWrite:!1})}function ed(){return new qt({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Ko(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Ot,depthTest:!1,depthWrite:!1})}function td(){return new qt({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Ko(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Ot,depthTest:!1,depthWrite:!1})}function Ko(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}var Yo=class extends Dt{constructor(e=1,n={}){super(e,e,n),this.isWebGLCubeRenderTarget=!0;let i={width:e,height:e,depth:1},r=[i,i,i,i,i,i];this.texture=new Cc(r),this._setTextureOptions(n),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,n){this.texture.type=n.type,this.texture.colorSpace=n.colorSpace,this.texture.generateMipmaps=n.generateMipmaps,this.texture.minFilter=n.minFilter,this.texture.magFilter=n.magFilter;let i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new zo(5,5,5),o=new qt({name:"CubemapFromEquirect",uniforms:Wo(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:$t,blending:Ot});o.uniforms.tEquirect.value=n;let a=new hn(r,o),c=n.minFilter;return n.minFilter===Si&&(n.minFilter=st),new Zf(1,10,this).update(e,a),n.minFilter=c,a.geometry.dispose(),a.material.dispose(),this}clear(e,n=!0,i=!0,r=!0){let o=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(n,i,r);e.setRenderTarget(o)}};function Qv(t){let e=new WeakMap,n=new WeakMap,i=null;function r(s,h=!1){return s==null?null:h?a(s):o(s)}function o(s){if(s&&s.isTexture){let h=s.mapping;if(h===ni||h===Co)if(e.has(s)){let g=e.get(s).texture;return c(g,s.mapping)}else{let g=s.image;if(g&&g.height>0){let b=new Yo(g.height);return b.fromEquirectangularTexture(t,s),e.set(s,b),s.addEventListener("dispose",f),c(b.texture,s.mapping)}else return null}}return s}function a(s){if(s&&s.isTexture){let h=s.mapping,g=h===ni||h===Co,b=h===Yi||h===xi;if(g||b){let d=n.get(s),m=d!==void 0?d.texture.pmremVersion:0;if(s.isRenderTargetTexture&&s.pmremVersion!==m)return i===null&&(i=new qo(t)),d=g?i.fromEquirectangular(s,d):i.fromCubemap(s,d),d.texture.pmremVersion=s.pmremVersion,n.set(s,d),d.texture;if(d!==void 0)return d.texture;{let _=s.image;return g&&_&&_.height>0||b&&_&&l(_)?(i===null&&(i=new qo(t)),d=g?i.fromEquirectangular(s):i.fromCubemap(s),d.texture.pmremVersion=s.pmremVersion,n.set(s,d),s.addEventListener("dispose",p),d.texture):null}}}return s}function c(s,h){return h===ni?s.mapping=Yi:h===Co&&(s.mapping=xi),s}function l(s){let h=0,g=6;for(let b=0;b<g;b++)s[b]!==void 0&&h++;return h===g}function f(s){let h=s.target;h.removeEventListener("dispose",f);let g=e.get(h);g!==void 0&&(e.delete(h),g.dispose())}function p(s){let h=s.target;h.removeEventListener("dispose",p);let g=n.get(h);g!==void 0&&(n.delete(h),g.dispose())}function u(){e=new WeakMap,n=new WeakMap,i!==null&&(i.dispose(),i=null)}return{get:r,dispose:u}}function Jv(t){let e={};function n(i){if(e[i]!==void 0)return e[i];let r=t.getExtension(i);return e[i]=r,r}return{has:function(i){return n(i)!==null},init:function(){n("EXT_color_buffer_float"),n("WEBGL_clip_cull_distance"),n("OES_texture_float_linear"),n("EXT_color_buffer_half_float"),n("WEBGL_multisampled_render_to_texture"),n("WEBGL_render_shared_exponent")},get:function(i){let r=n(i);return r===null&&Uf("WebGLRenderer: "+i+" extension not supported."),r}}}function e0(t,e,n,i){let r={},o=new WeakMap;function a(u){let s=u.target;s.index!==null&&e.remove(s.index);for(let g in s.attributes)e.remove(s.attributes[g]);s.removeEventListener("dispose",a),delete r[s.id];let h=o.get(s);h&&(e.remove(h),o.delete(s)),i.releaseStatesOfGeometry(s),s.isInstancedBufferGeometry===!0&&delete s._maxInstanceCount,n.memory.geometries--}function c(u,s){return r[s.id]===!0||(s.addEventListener("dispose",a),r[s.id]=!0,n.memory.geometries++),s}function l(u){let s=u.attributes;for(let h in s)e.update(s[h],t.ARRAY_BUFFER)}function f(u){let s=[],h=u.index,g=u.attributes.position,b=0;if(g===void 0)return;if(h!==null){let _=h.array;b=h.version;for(let E=0,v=_.length;E<v;E+=3){let T=_[E+0],M=_[E+1],R=_[E+2];s.push(T,M,M,R,R,T)}}else{let _=g.array;b=g.version;for(let E=0,v=_.length/3-1;E<v;E+=3){let T=E+0,M=E+1,R=E+2;s.push(T,M,M,R,R,T)}}let d=new(g.count>=65535?Wf:zf)(s,1);d.version=b;let m=o.get(u);m&&e.remove(m),o.set(u,d)}function p(u){let s=o.get(u);if(s){let h=u.index;h!==null&&s.version<h.version&&f(u)}else f(u);return o.get(u)}return{get:c,update:l,getWireframeAttribute:p}}function t0(t,e,n){let i;function r(u){i=u}let o,a;function c(u){o=u.type,a=u.bytesPerElement}function l(u,s){t.drawElements(i,s,o,u*a),n.update(s,i,1)}function f(u,s,h){h!==0&&(t.drawElementsInstanced(i,s,o,u*a,h),n.update(s,i,h))}function p(u,s,h){if(h===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,s,0,o,u,0,h);let b=0;for(let d=0;d<h;d++)b+=s[d];n.update(b,i,1)}this.setMode=r,this.setIndex=c,this.render=l,this.renderInstances=f,this.renderMultiDraw=p}function n0(t){let e={geometries:0,textures:0},n={frame:0,calls:0,triangles:0,points:0,lines:0};function i(o,a,c){switch(n.calls++,a){case t.TRIANGLES:n.triangles+=c*(o/3);break;case t.LINES:n.lines+=c*(o/2);break;case t.LINE_STRIP:n.lines+=c*(o-1);break;case t.LINE_LOOP:n.lines+=c*o;break;case t.POINTS:n.points+=c*o;break;default:xt("WebGLInfo: Unknown draw mode:",a);break}}function r(){n.calls=0,n.triangles=0,n.points=0,n.lines=0}return{memory:e,render:n,programs:null,autoReset:!0,reset:r,update:i}}function i0(t,e,n){let i=new WeakMap,r=new At;function o(a,c,l){let f=a.morphTargetInfluences,p=c.morphAttributes.position||c.morphAttributes.normal||c.morphAttributes.color,u=p!==void 0?p.length:0,s=i.get(c);if(s===void 0||s.count!==u){let A=function(){R.dispose(),i.delete(c),c.removeEventListener("dispose",A)};s!==void 0&&s.texture.dispose();let h=c.morphAttributes.position!==void 0,g=c.morphAttributes.normal!==void 0,b=c.morphAttributes.color!==void 0,d=c.morphAttributes.position||[],m=c.morphAttributes.normal||[],_=c.morphAttributes.color||[],E=0;h===!0&&(E=1),g===!0&&(E=2),b===!0&&(E=3);let v=c.attributes.position.count*E,T=1;v>e.maxTextureSize&&(T=Math.ceil(v/e.maxTextureSize),v=e.maxTextureSize);let M=new Float32Array(v*T*4*u),R=new Vr(M,v,T,u);R.type=Be,R.needsUpdate=!0;let x=E*4;for(let w=0;w<u;w++){let D=d[w],C=m[w],L=_[w],I=v*T*4*w;for(let B=0;B<D.count;B++){let z=B*x;h===!0&&(r.fromBufferAttribute(D,B),M[I+z+0]=r.x,M[I+z+1]=r.y,M[I+z+2]=r.z,M[I+z+3]=0),g===!0&&(r.fromBufferAttribute(C,B),M[I+z+4]=r.x,M[I+z+5]=r.y,M[I+z+6]=r.z,M[I+z+7]=0),b===!0&&(r.fromBufferAttribute(L,B),M[I+z+8]=r.x,M[I+z+9]=r.y,M[I+z+10]=r.z,M[I+z+11]=L.itemSize===4?r.w:1)}}s={count:u,texture:R,size:new Ne(v,T)},i.set(c,s),c.addEventListener("dispose",A)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(t,"morphTexture",a.morphTexture,n);else{let h=0;for(let b=0;b<f.length;b++)h+=f[b];let g=c.morphTargetsRelative?1:1-h;l.getUniforms().setValue(t,"morphTargetBaseInfluence",g),l.getUniforms().setValue(t,"morphTargetInfluences",f)}l.getUniforms().setValue(t,"morphTargetsTexture",s.texture,n),l.getUniforms().setValue(t,"morphTargetsTextureSize",s.size)}return{update:o}}function r0(t,e,n,i,r){let o=new WeakMap;function a(f){let p=r.render.frame,u=f.geometry,s=e.get(f,u);if(o.get(s)!==p&&(e.update(s),o.set(s,p)),f.isInstancedMesh&&(f.hasEventListener("dispose",l)===!1&&f.addEventListener("dispose",l),o.get(f)!==p&&(n.update(f.instanceMatrix,t.ARRAY_BUFFER),f.instanceColor!==null&&n.update(f.instanceColor,t.ARRAY_BUFFER),o.set(f,p))),f.isSkinnedMesh){let h=f.skeleton;o.get(h)!==p&&(h.update(),o.set(h,p))}return s}function c(){o=new WeakMap}function l(f){let p=f.target;p.removeEventListener("dispose",l),i.releaseStatesOfObject(p),n.remove(p.instanceMatrix),p.instanceColor!==null&&n.remove(p.instanceColor)}return{update:a,dispose:c}}var o0={[Ds]:"LINEAR_TONE_MAPPING",[Ls]:"REINHARD_TONE_MAPPING",[Ns]:"CINEON_TONE_MAPPING",[Us]:"ACES_FILMIC_TONE_MAPPING",[Bs]:"AGX_TONE_MAPPING",[Os]:"NEUTRAL_TONE_MAPPING",[Fs]:"CUSTOM_TONE_MAPPING"};function a0(t,e,n,i,r,o){let a=new Dt(e,n,{type:t,depthBuffer:r,stencilBuffer:o,samples:i?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),c=null,l=null,f=new Xt;f.setAttribute("position",new Zi([-1,3,0,-1,-1,0,3,-1,0],3)),f.setAttribute("uv",new Zi([0,2,0,0,2,0],2));let p=new qf({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),u=new hn(f,p),s=new Wr(-1,1,1,-1,0,1),h=null,g=null,b=!1,d,m=null,_=[],E=!1;this.setSize=function(v,T){a.setSize(v,T),c!==null&&c.setSize(v,T),l!==null&&l.setSize(v,T);for(let M=0;M<_.length;M++){let R=_[M];R.setSize&&R.setSize(v,T)}},this.setEffects=function(v){_=v,E=_.length>0&&_[0].isRenderPass===!0;let T=a.width,M=a.height;_.length>0&&c===null&&(c=new Dt(T,M,{type:Mt,depthBuffer:!1,stencilBuffer:!1}),l=new Dt(T,M,{type:Mt,depthBuffer:!1,stencilBuffer:!1}));for(let R=0;R<_.length;R++){let x=_[R];x.setSize&&x.setSize(T,M)}},this.begin=function(v,T){if(b||v.toneMapping===_n&&_.length===0)return!1;if(m=T,T!==null){let M=T.width,R=T.height;(a.width!==M||a.height!==R)&&this.setSize(M,R)}return E===!1&&v.setRenderTarget(a),d=v.toneMapping,v.toneMapping=_n,!0},this.hasRenderPass=function(){return E},this.end=function(v,T){v.toneMapping=d,b=!0;let M=a,R=c;for(let x=0;x<_.length;x++){let A=_[x];A.enabled!==!1&&(A.render(v,R,M,T),A.needsSwap!==!1&&(M=R,R=R===c?l:c))}if(h!==v.outputColorSpace||g!==v.toneMapping){h=v.outputColorSpace,g=v.toneMapping,p.defines={},Et.getTransfer(h)===ft&&(p.defines.SRGB_TRANSFER="");let x=o0[g];x&&(p.defines[x]=""),p.needsUpdate=!0}p.uniforms.tDiffuse.value=M.texture,v.setRenderTarget(m),v.render(u,s),m=null,b=!1},this.isCompositing=function(){return b},this.dispose=function(){a.dispose(),c!==null&&c.dispose(),l!==null&&l.dispose(),f.dispose(),p.dispose()}}var Td=new Hf,zc=new zr(1,1),bd=new Vr,Ed=new kf,yd=new Cc,nd=[],id=[],rd=new Float32Array(16),od=new Float32Array(9),ad=new Float32Array(4);function tr(t,e,n){let i=t[0];if(i<=0||i>0)return t;let r=e*n,o=nd[r];if(o===void 0&&(o=new Float32Array(r),nd[r]=o),e!==0){i.toArray(o,0);for(let a=1,c=0;a!==e;++a)c+=n,t[a].toArray(o,c)}return o}function Ht(t,e){if(t.length!==e.length)return!1;for(let n=0,i=t.length;n<i;n++)if(t[n]!==e[n])return!1;return!0}function kt(t,e){for(let n=0,i=e.length;n<i;n++)t[n]=e[n]}function Zo(t,e){let n=id[e];n===void 0&&(n=new Int32Array(e),id[e]=n);for(let i=0;i!==e;++i)n[i]=t.allocateTextureUnit();return n}function s0(t,e){let n=this.cache;n[0]!==e&&(t.uniform1f(this.addr,e),n[0]=e)}function c0(t,e){let n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(t.uniform2f(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(Ht(n,e))return;t.uniform2fv(this.addr,e),kt(n,e)}}function l0(t,e){let n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(t.uniform3f(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else if(e.r!==void 0)(n[0]!==e.r||n[1]!==e.g||n[2]!==e.b)&&(t.uniform3f(this.addr,e.r,e.g,e.b),n[0]=e.r,n[1]=e.g,n[2]=e.b);else{if(Ht(n,e))return;t.uniform3fv(this.addr,e),kt(n,e)}}function u0(t,e){let n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(t.uniform4f(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(Ht(n,e))return;t.uniform4fv(this.addr,e),kt(n,e)}}function f0(t,e){let n=this.cache,i=e.elements;if(i===void 0){if(Ht(n,e))return;t.uniformMatrix2fv(this.addr,!1,e),kt(n,e)}else{if(Ht(n,i))return;ad.set(i),t.uniformMatrix2fv(this.addr,!1,ad),kt(n,i)}}function d0(t,e){let n=this.cache,i=e.elements;if(i===void 0){if(Ht(n,e))return;t.uniformMatrix3fv(this.addr,!1,e),kt(n,e)}else{if(Ht(n,i))return;od.set(i),t.uniformMatrix3fv(this.addr,!1,od),kt(n,i)}}function p0(t,e){let n=this.cache,i=e.elements;if(i===void 0){if(Ht(n,e))return;t.uniformMatrix4fv(this.addr,!1,e),kt(n,e)}else{if(Ht(n,i))return;rd.set(i),t.uniformMatrix4fv(this.addr,!1,rd),kt(n,i)}}function h0(t,e){let n=this.cache;n[0]!==e&&(t.uniform1i(this.addr,e),n[0]=e)}function m0(t,e){let n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(t.uniform2i(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(Ht(n,e))return;t.uniform2iv(this.addr,e),kt(n,e)}}function g0(t,e){let n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(t.uniform3i(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else{if(Ht(n,e))return;t.uniform3iv(this.addr,e),kt(n,e)}}function _0(t,e){let n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(t.uniform4i(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(Ht(n,e))return;t.uniform4iv(this.addr,e),kt(n,e)}}function v0(t,e){let n=this.cache;n[0]!==e&&(t.uniform1ui(this.addr,e),n[0]=e)}function x0(t,e){let n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(t.uniform2ui(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(Ht(n,e))return;t.uniform2uiv(this.addr,e),kt(n,e)}}function S0(t,e){let n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(t.uniform3ui(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else{if(Ht(n,e))return;t.uniform3uiv(this.addr,e),kt(n,e)}}function T0(t,e){let n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(t.uniform4ui(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(Ht(n,e))return;t.uniform4uiv(this.addr,e),kt(n,e)}}function b0(t,e,n){let i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(t.uniform1i(this.addr,r),i[0]=r);let o;this.type===t.SAMPLER_2D_SHADOW?(zc.compareFunction=n.isReversedDepthBuffer()?Ho:Go,o=zc):o=Td,n.setTexture2D(e||o,r)}function E0(t,e,n){let i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(t.uniform1i(this.addr,r),i[0]=r),n.setTexture3D(e||Ed,r)}function y0(t,e,n){let i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(t.uniform1i(this.addr,r),i[0]=r),n.setTextureCube(e||yd,r)}function M0(t,e,n){let i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(t.uniform1i(this.addr,r),i[0]=r),n.setTexture2DArray(e||bd,r)}function A0(t){switch(t){case 5126:return s0;case 35664:return c0;case 35665:return l0;case 35666:return u0;case 35674:return f0;case 35675:return d0;case 35676:return p0;case 5124:case 35670:return h0;case 35667:case 35671:return m0;case 35668:case 35672:return g0;case 35669:case 35673:return _0;case 5125:return v0;case 36294:return x0;case 36295:return S0;case 36296:return T0;case 35678:case 36198:case 36298:case 36306:case 35682:return b0;case 35679:case 36299:case 36307:return E0;case 35680:case 36300:case 36308:case 36293:return y0;case 36289:case 36303:case 36311:case 36292:return M0}}function w0(t,e){t.uniform1fv(this.addr,e)}function R0(t,e){let n=tr(e,this.size,2);t.uniform2fv(this.addr,n)}function P0(t,e){let n=tr(e,this.size,3);t.uniform3fv(this.addr,n)}function C0(t,e){let n=tr(e,this.size,4);t.uniform4fv(this.addr,n)}function I0(t,e){let n=tr(e,this.size,4);t.uniformMatrix2fv(this.addr,!1,n)}function D0(t,e){let n=tr(e,this.size,9);t.uniformMatrix3fv(this.addr,!1,n)}function L0(t,e){let n=tr(e,this.size,16);t.uniformMatrix4fv(this.addr,!1,n)}function N0(t,e){t.uniform1iv(this.addr,e)}function U0(t,e){t.uniform2iv(this.addr,e)}function F0(t,e){t.uniform3iv(this.addr,e)}function B0(t,e){t.uniform4iv(this.addr,e)}function O0(t,e){t.uniform1uiv(this.addr,e)}function G0(t,e){t.uniform2uiv(this.addr,e)}function H0(t,e){t.uniform3uiv(this.addr,e)}function k0(t,e){t.uniform4uiv(this.addr,e)}function V0(t,e,n){let i=this.cache,r=e.length,o=Zo(n,r);Ht(i,o)||(t.uniform1iv(this.addr,o),kt(i,o));let a;this.type===t.SAMPLER_2D_SHADOW?a=zc:a=Td;for(let c=0;c!==r;++c)n.setTexture2D(e[c]||a,o[c])}function z0(t,e,n){let i=this.cache,r=e.length,o=Zo(n,r);Ht(i,o)||(t.uniform1iv(this.addr,o),kt(i,o));for(let a=0;a!==r;++a)n.setTexture3D(e[a]||Ed,o[a])}function W0(t,e,n){let i=this.cache,r=e.length,o=Zo(n,r);Ht(i,o)||(t.uniform1iv(this.addr,o),kt(i,o));for(let a=0;a!==r;++a)n.setTextureCube(e[a]||yd,o[a])}function $0(t,e,n){let i=this.cache,r=e.length,o=Zo(n,r);Ht(i,o)||(t.uniform1iv(this.addr,o),kt(i,o));for(let a=0;a!==r;++a)n.setTexture2DArray(e[a]||bd,o[a])}function X0(t){switch(t){case 5126:return w0;case 35664:return R0;case 35665:return P0;case 35666:return C0;case 35674:return I0;case 35675:return D0;case 35676:return L0;case 5124:case 35670:return N0;case 35667:case 35671:return U0;case 35668:case 35672:return F0;case 35669:case 35673:return B0;case 5125:return O0;case 36294:return G0;case 36295:return H0;case 36296:return k0;case 35678:case 36198:case 36298:case 36306:case 35682:return V0;case 35679:case 36299:case 36307:return z0;case 35680:case 36300:case 36308:case 36293:return W0;case 36289:case 36303:case 36311:case 36292:return $0}}var Wc=class{constructor(e,n,i){this.id=e,this.addr=i,this.cache=[],this.type=n.type,this.setValue=A0(n.type)}},$c=class{constructor(e,n,i){this.id=e,this.addr=i,this.cache=[],this.type=n.type,this.size=n.size,this.setValue=X0(n.type)}},Xc=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,n,i){let r=this.seq;for(let o=0,a=r.length;o!==a;++o){let c=r[o];c.setValue(e,n[c.id],i)}}},kc=/(\w+)(\])?(\[|\.)?/g;function sd(t,e){t.seq.push(e),t.map[e.id]=e}function q0(t,e,n){let i=t.name,r=i.length;for(kc.lastIndex=0;;){let o=kc.exec(i),a=kc.lastIndex,c=o[1],l=o[2]==="]",f=o[3];if(l&&(c=c|0),f===void 0||f==="["&&a+2===r){sd(n,f===void 0?new Wc(c,t,e):new $c(c,t,e));break}else{let u=n.map[c];u===void 0&&(u=new Xc(c),sd(n,u)),n=u}}}var er=class{constructor(e,n){this.seq=[],this.map={};let i=e.getProgramParameter(n,e.ACTIVE_UNIFORMS);for(let a=0;a<i;++a){let c=e.getActiveUniform(n,a),l=e.getUniformLocation(n,c.name);q0(c,l,this)}let r=[],o=[];for(let a of this.seq)a.type===e.SAMPLER_2D_SHADOW||a.type===e.SAMPLER_CUBE_SHADOW||a.type===e.SAMPLER_2D_ARRAY_SHADOW?r.push(a):o.push(a);r.length>0&&(this.seq=r.concat(o))}setValue(e,n,i,r){let o=this.map[n];o!==void 0&&o.setValue(e,i,r)}setOptional(e,n,i){let r=n[i];r!==void 0&&this.setValue(e,i,r)}static upload(e,n,i,r){for(let o=0,a=n.length;o!==a;++o){let c=n[o],l=i[c.id];l.needsUpdate!==!1&&c.setValue(e,l.value,r)}}static seqWithValue(e,n){let i=[];for(let r=0,o=e.length;r!==o;++r){let a=e[r];a.id in n&&i.push(a)}return i}};function cd(t,e,n){let i=t.createShader(e);return t.shaderSource(i,n),t.compileShader(i),i}var Y0=37297,K0=0;function Z0(t,e){let n=t.split(`
`),i=[],r=Math.max(e-6,0),o=Math.min(e+6,n.length);for(let a=r;a<o;a++){let c=a+1;i.push(`${c===e?">":" "} ${c}: ${n[a]}`)}return i.join(`
`)}var ld=new He;function j0(t){Et._getMatrix(ld,Et.workingColorSpace,t);let e=`mat3( ${ld.elements.map(n=>n.toFixed(4))} )`;switch(Et.getTransfer(t)){case Sc:return[e,"LinearTransferOETF"];case ft:return[e,"sRGBTransferOETF"];default:return it("WebGLProgram: Unsupported color space: ",t),[e,"LinearTransferOETF"]}}function ud(t,e,n){let i=t.getShaderParameter(e,t.COMPILE_STATUS),o=(t.getShaderInfoLog(e)||"").trim();if(i&&o==="")return"";let a=/ERROR: 0:(\d+)/.exec(o);if(a){let c=parseInt(a[1]);return n.toUpperCase()+`

`+o+`

`+Z0(t.getShaderSource(e),c)}else return o}function Q0(t,e){let n=j0(e);return[`vec4 ${t}( vec4 value ) {`,`	return ${n[1]}( vec4( value.rgb * ${n[0]}, value.a ) );`,"}"].join(`
`)}var J0={[Ds]:"Linear",[Ls]:"Reinhard",[Ns]:"Cineon",[Us]:"ACESFilmic",[Bs]:"AgX",[Os]:"Neutral",[Fs]:"Custom"};function ex(t,e){let n=J0[e];return n===void 0?(it("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+t+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+t+"( vec3 color ) { return "+n+"ToneMapping( color ); }"}var Xo=new j;function tx(){Et.getLuminanceCoefficients(Xo);let t=Xo.x.toFixed(4),e=Xo.y.toFixed(4),n=Xo.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${t}, ${e}, ${n} );`,"	return dot( weights, rgb );","}"].join(`
`)}function nx(t){return[t.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",t.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(qr).join(`
`)}function ix(t){let e=[];for(let n in t){let i=t[n];i!==!1&&e.push("#define "+n+" "+i)}return e.join(`
`)}function rx(t,e){let n={},i=t.getProgramParameter(e,t.ACTIVE_ATTRIBUTES);for(let r=0;r<i;r++){let o=t.getActiveAttrib(e,r),a=o.name,c=1;o.type===t.FLOAT_MAT2&&(c=2),o.type===t.FLOAT_MAT3&&(c=3),o.type===t.FLOAT_MAT4&&(c=4),n[a]={type:o.type,location:t.getAttribLocation(e,a),locationSize:c}}return n}function qr(t){return t!==""}function fd(t,e){let n=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return t.replace(/NUM_SUN_LIGHTS/g,e.numSunLights).replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,n).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,e.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function dd(t,e){return t.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}var ox=/^[ \t]*#include +<([\w\d./]+)>/gm;function qc(t){return t.replace(ox,sx)}var ax=new Map;function sx(t,e){let n=De[e];if(n===void 0){let i=ax.get(e);if(i!==void 0)n=De[i],it('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">")}return qc(n)}var cx=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function pd(t){return t.replace(cx,lx)}function lx(t,e,n,i){let r="";for(let o=parseInt(e);o<parseInt(n);o++)r+=i.replace(/\[\s*i\s*\]/g,"[ "+o+" ]").replace(/UNROLLED_LOOP_INDEX/g,o);return r}function hd(t){let e=`precision ${t.precision} float;
	precision ${t.precision} int;
	precision ${t.precision} sampler2D;
	precision ${t.precision} samplerCube;
	precision ${t.precision} sampler3D;
	precision ${t.precision} sampler2DArray;
	precision ${t.precision} sampler2DShadow;
	precision ${t.precision} samplerCubeShadow;
	precision ${t.precision} sampler2DArrayShadow;
	precision ${t.precision} isampler2D;
	precision ${t.precision} isampler3D;
	precision ${t.precision} isamplerCube;
	precision ${t.precision} isampler2DArray;
	precision ${t.precision} usampler2D;
	precision ${t.precision} usampler3D;
	precision ${t.precision} usamplerCube;
	precision ${t.precision} usampler2DArray;
	`;return t.precision==="highp"?e+=`
#define HIGH_PRECISION`:t.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:t.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}var ux={[Fr]:"SHADOWMAP_TYPE_PCF",[Xi]:"SHADOWMAP_TYPE_VSM"};function fx(t){return ux[t.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}var dx={[Yi]:"ENVMAP_TYPE_CUBE",[xi]:"ENVMAP_TYPE_CUBE",[Or]:"ENVMAP_TYPE_CUBE_UV"};function px(t){return t.envMap===!1?"ENVMAP_TYPE_CUBE":dx[t.envMapMode]||"ENVMAP_TYPE_CUBE"}var hx={[xi]:"ENVMAP_MODE_REFRACTION"};function mx(t){return t.envMap===!1?"ENVMAP_MODE_REFLECTION":hx[t.envMapMode]||"ENVMAP_MODE_REFLECTION"}var gx={[gf]:"ENVMAP_BLENDING_MULTIPLY",[_f]:"ENVMAP_BLENDING_MIX",[vf]:"ENVMAP_BLENDING_ADD"};function _x(t){return t.envMap===!1?"ENVMAP_BLENDING_NONE":gx[t.combine]||"ENVMAP_BLENDING_NONE"}function vx(t){let e=t.envMapCubeUVHeight;if(e===null)return null;let n=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,n),7*16)),texelHeight:i,maxMip:n}}function xx(t,e,n,i){let r=t.getContext(),o=n.defines,a=n.vertexShader,c=n.fragmentShader,l=fx(n),f=px(n),p=mx(n),u=_x(n),s=vx(n),h=nx(n),g=ix(o),b=r.createProgram(),d,m,_=n.glslVersion?"#version "+n.glslVersion+`
`:"";n.isRawShaderMaterial?(d=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,g].filter(qr).join(`
`),d.length>0&&(d+=`
`),m=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,g].filter(qr).join(`
`),m.length>0&&(m+=`
`)):(d=[hd(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,g,n.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",n.batching?"#define USE_BATCHING":"",n.batchingColor?"#define USE_BATCHING_COLOR":"",n.instancing?"#define USE_INSTANCING":"",n.instancingColor?"#define USE_INSTANCING_COLOR":"",n.instancingMorph?"#define USE_INSTANCING_MORPH":"",n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.map?"#define USE_MAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+p:"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.displacementMap?"#define USE_DISPLACEMENTMAP":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.mapUv?"#define MAP_UV "+n.mapUv:"",n.alphaMapUv?"#define ALPHAMAP_UV "+n.alphaMapUv:"",n.lightMapUv?"#define LIGHTMAP_UV "+n.lightMapUv:"",n.aoMapUv?"#define AOMAP_UV "+n.aoMapUv:"",n.emissiveMapUv?"#define EMISSIVEMAP_UV "+n.emissiveMapUv:"",n.bumpMapUv?"#define BUMPMAP_UV "+n.bumpMapUv:"",n.normalMapUv?"#define NORMALMAP_UV "+n.normalMapUv:"",n.displacementMapUv?"#define DISPLACEMENTMAP_UV "+n.displacementMapUv:"",n.metalnessMapUv?"#define METALNESSMAP_UV "+n.metalnessMapUv:"",n.roughnessMapUv?"#define ROUGHNESSMAP_UV "+n.roughnessMapUv:"",n.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+n.anisotropyMapUv:"",n.clearcoatMapUv?"#define CLEARCOATMAP_UV "+n.clearcoatMapUv:"",n.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+n.clearcoatNormalMapUv:"",n.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+n.clearcoatRoughnessMapUv:"",n.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+n.iridescenceMapUv:"",n.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+n.iridescenceThicknessMapUv:"",n.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+n.sheenColorMapUv:"",n.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+n.sheenRoughnessMapUv:"",n.specularMapUv?"#define SPECULARMAP_UV "+n.specularMapUv:"",n.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+n.specularColorMapUv:"",n.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+n.specularIntensityMapUv:"",n.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+n.transmissionMapUv:"",n.thicknessMapUv?"#define THICKNESSMAP_UV "+n.thicknessMapUv:"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexNormals?"#define HAS_NORMAL":"",n.vertexColors?"#define USE_COLOR":"",n.vertexAlphas?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.flatShading?"#define FLAT_SHADED":"",n.skinning?"#define USE_SKINNING":"",n.morphTargets?"#define USE_MORPHTARGETS":"",n.morphNormals&&n.flatShading===!1?"#define USE_MORPHNORMALS":"",n.morphColors?"#define USE_MORPHCOLORS":"",n.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+n.morphTextureStride:"",n.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+n.morphTargetsCount:"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+l:"",n.sizeAttenuation?"#define USE_SIZEATTENUATION":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",n.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(qr).join(`
`),m=[hd(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,g,n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",n.map?"#define USE_MAP":"",n.matcap?"#define USE_MATCAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+f:"",n.envMap?"#define "+p:"",n.envMap?"#define "+u:"",s?"#define CUBEUV_TEXEL_WIDTH "+s.texelWidth:"",s?"#define CUBEUV_TEXEL_HEIGHT "+s.texelHeight:"",s?"#define CUBEUV_MAX_MIP "+s.maxMip+".0":"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoat?"#define USE_CLEARCOAT":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.dispersion?"#define USE_DISPERSION":"",n.retroreflection?"#define USE_RETROREFLECTION":"",n.iridescence?"#define USE_IRIDESCENCE":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaTest?"#define USE_ALPHATEST":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.sheen?"#define USE_SHEEN":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexColors||n.instancingColor?"#define USE_COLOR":"",n.vertexAlphas||n.batchingColor?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.gradientMap?"#define USE_GRADIENTMAP":"",n.flatShading?"#define FLAT_SHADED":"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+l:"",n.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",n.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",n.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",n.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",n.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",n.toneMapping!==_n?"#define TONE_MAPPING":"",n.toneMapping!==_n?De.tonemapping_pars_fragment:"",n.toneMapping!==_n?ex("toneMapping",n.toneMapping):"",n.dithering?"#define DITHERING":"",n.opaque?"#define OPAQUE":"",De.colorspace_pars_fragment,Q0("linearToOutputTexel",n.outputColorSpace),tx(),n.useDepthPacking?"#define DEPTH_PACKING "+n.depthPacking:"",`
`].filter(qr).join(`
`)),a=qc(a),a=fd(a,n),a=dd(a,n),c=qc(c),c=fd(c,n),c=dd(c,n),a=pd(a),c=pd(c),n.isRawShaderMaterial!==!0&&(_=`#version 300 es
`,d=[h,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+d,m=["#define varying in",n.glslVersion===Tc?"":"layout(location = 0) out highp vec4 pc_fragColor;",n.glslVersion===Tc?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+m);let E=_+d+a,v=_+m+c,T=cd(r,r.VERTEX_SHADER,E),M=cd(r,r.FRAGMENT_SHADER,v);r.attachShader(b,T),r.attachShader(b,M),n.index0AttributeName!==void 0?r.bindAttribLocation(b,0,n.index0AttributeName):n.hasPositionAttribute===!0&&r.bindAttribLocation(b,0,"position"),r.linkProgram(b);function R(D){if(t.debug.checkShaderErrors){let C=r.getProgramInfoLog(b)||"",L=r.getShaderInfoLog(T)||"",I=r.getShaderInfoLog(M)||"",B=C.trim(),z=L.trim(),W=I.trim(),ne=!0,K=!0;if(r.getProgramParameter(b,r.LINK_STATUS)===!1)if(ne=!1,typeof t.debug.onShaderError=="function")t.debug.onShaderError(r,b,T,M);else{let ee=ud(r,T,"vertex"),te=ud(r,M,"fragment");xt("WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(b,r.VALIDATE_STATUS)+`

Material Name: `+D.name+`
Material Type: `+D.type+`

Program Info Log: `+B+`
`+ee+`
`+te)}else B!==""?it("WebGLProgram: Program Info Log:",B):(z===""||W==="")&&(K=!1);K&&(D.diagnostics={runnable:ne,programLog:B,vertexShader:{log:z,prefix:d},fragmentShader:{log:W,prefix:m}})}r.deleteShader(T),r.deleteShader(M),x=new er(r,b),A=rx(r,b)}let x;this.getUniforms=function(){return x===void 0&&R(this),x};let A;this.getAttributes=function(){return A===void 0&&R(this),A};let w=n.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return w===!1&&(w=r.getProgramParameter(b,Y0)),w},this.destroy=function(){i.releaseStatesOfProgram(this),r.deleteProgram(b),this.program=void 0},this.type=n.shaderType,this.name=n.shaderName,this.id=K0++,this.cacheKey=e,this.usedTimes=1,this.program=b,this.vertexShader=T,this.fragmentShader=M,this}var Sx=0,Yc=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,n,i){let r=this._getShaderCacheForMaterial(e);return r.has(n)===!1&&(r.add(n),n.usedTimes++),r.has(i)===!1&&(r.add(i),i.usedTimes++),this}remove(e){let n=this.materialCache.get(e);for(let i of n)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let n=this.materialCache,i=n.get(e);return i===void 0&&(i=new Set,n.set(e,i)),i}_getShaderStage(e){let n=this.shaderCache,i=n.get(e);return i===void 0&&(i=new Kc(e),n.set(e,i)),i}},Kc=class{constructor(e){this.id=Sx++,this.code=e,this.usedTimes=0}};function Tx(t){return t===In||t===Bo||t===Oo}function bx(t,e,n,i,r,o){let a=new Vf,c=new Yc,l=new Set,f=[],p=new Map,u=i.logarithmicDepthBuffer,s=i.precision,h={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function g(x){return l.add(x),x===0?"uv":`uv${x}`}function b(x,A,w,D,C,L){let I=D.fog,B=C.geometry,z=x.isMeshStandardMaterial||x.isMeshLambertMaterial||x.isMeshPhongMaterial?D.environment:null,W=x.isMeshStandardMaterial||x.isMeshLambertMaterial&&!x.envMap||x.isMeshPhongMaterial&&!x.envMap,ne=e.get(x.envMap||z,W),K=ne&&ne.mapping===Or?ne.image.height:null,ee=h[x.type];x.precision!==null&&(s=i.getMaxPrecision(x.precision),s!==x.precision&&it("WebGLProgram.getParameters:",x.precision,"not supported, using",s,"instead."));let te=B.morphAttributes.position||B.morphAttributes.normal||B.morphAttributes.color,we=te!==void 0?te.length:0,Me=0;B.morphAttributes.position!==void 0&&(Me=1),B.morphAttributes.normal!==void 0&&(Me=2),B.morphAttributes.color!==void 0&&(Me=3);let Pt,ze,et,q;if(ee){let _t=kn[ee];Pt=_t.vertexShader,ze=_t.fragmentShader}else{Pt=x.vertexShader,ze=x.fragmentShader;let _t=c.getVertexShaderStage(x),tt=c.getFragmentShaderStage(x);c.update(x,_t,tt),et=_t.id,q=tt.id}let Q=t.getRenderTarget(),xe=t.state.buffers.depth.getReversed(),Ce=C.isInstancedMesh===!0,ge=C.isBatchedMesh===!0,Ue=!!x.map,Bt=!!x.matcap,Oe=!!ne,Ke=!!x.aoMap,gt=!!x.lightMap,ke=!!x.bumpMap&&x.wireframe===!1,bt=!!x.normalMap,Wt=!!x.displacementMap,fn=!!x.emissiveMap,yt=!!x.metalnessMap,Nt=!!x.roughnessMap,F=x.anisotropy>0,jt=x.clearcoat>0,at=x.dispersion>0,P=x.retroreflectivity>0,S=x.iridescence>0,O=x.sheen>0,k=x.transmission>0,$=F&&!!x.anisotropyMap,ie=jt&&!!x.clearcoatMap,re=jt&&!!x.clearcoatNormalMap,X=jt&&!!x.clearcoatRoughnessMap,Z=S&&!!x.iridescenceMap,oe=S&&!!x.iridescenceThicknessMap,be=O&&!!x.sheenColorMap,le=O&&!!x.sheenRoughnessMap,ae=!!x.specularMap,Ee=!!x.specularColorMap,Ae=!!x.specularIntensityMap,Re=k&&!!x.transmissionMap,U=k&&!!x.thicknessMap,se=!!x.gradientMap,Y=!!x.alphaMap,ce=x.alphaTest>0,pe=!!x.alphaHash,J=!!x.extensions,ye=_n;x.toneMapped&&(Q===null||Q.isXRRenderTarget===!0)&&(ye=t.toneMapping);let Se={shaderID:ee,shaderType:x.type,shaderName:x.name,vertexShader:Pt,fragmentShader:ze,defines:x.defines,customVertexShaderID:et,customFragmentShaderID:q,isRawShaderMaterial:x.isRawShaderMaterial===!0,glslVersion:x.glslVersion,precision:s,batching:ge,batchingColor:ge&&C._colorsTexture!==null,instancing:Ce,instancingColor:Ce&&C.instanceColor!==null,instancingMorph:Ce&&C.morphTexture!==null,outputColorSpace:Q===null?t.outputColorSpace:Q.isXRRenderTarget===!0?Q.texture.colorSpace:Et.workingColorSpace,alphaToCoverage:!!x.alphaToCoverage,map:Ue,matcap:Bt,envMap:Oe,envMapMode:Oe&&ne.mapping,envMapCubeUVHeight:K,aoMap:Ke,lightMap:gt,bumpMap:ke,normalMap:bt,displacementMap:Wt,emissiveMap:fn,normalMapObjectSpace:bt&&x.normalMapType===Mf,normalMapTangentSpace:bt&&x.normalMapType===vc,packedNormalMap:bt&&x.normalMapType===vc&&Tx(x.normalMap.format),metalnessMap:yt,roughnessMap:Nt,anisotropy:F,anisotropyMap:$,clearcoat:jt,clearcoatMap:ie,clearcoatNormalMap:re,clearcoatRoughnessMap:X,dispersion:at,retroreflection:P,iridescence:S,iridescenceMap:Z,iridescenceThicknessMap:oe,sheen:O,sheenColorMap:be,sheenRoughnessMap:le,specularMap:ae,specularColorMap:Ee,specularIntensityMap:Ae,transmission:k,transmissionMap:Re,thicknessMap:U,gradientMap:se,opaque:x.transparent===!1&&x.blending===Xn&&x.alphaToCoverage===!1,alphaMap:Y,alphaTest:ce,alphaHash:pe,combine:x.combine,mapUv:Ue&&g(x.map.channel),aoMapUv:Ke&&g(x.aoMap.channel),lightMapUv:gt&&g(x.lightMap.channel),bumpMapUv:ke&&g(x.bumpMap.channel),normalMapUv:bt&&g(x.normalMap.channel),displacementMapUv:Wt&&g(x.displacementMap.channel),emissiveMapUv:fn&&g(x.emissiveMap.channel),metalnessMapUv:yt&&g(x.metalnessMap.channel),roughnessMapUv:Nt&&g(x.roughnessMap.channel),anisotropyMapUv:$&&g(x.anisotropyMap.channel),clearcoatMapUv:ie&&g(x.clearcoatMap.channel),clearcoatNormalMapUv:re&&g(x.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:X&&g(x.clearcoatRoughnessMap.channel),iridescenceMapUv:Z&&g(x.iridescenceMap.channel),iridescenceThicknessMapUv:oe&&g(x.iridescenceThicknessMap.channel),sheenColorMapUv:be&&g(x.sheenColorMap.channel),sheenRoughnessMapUv:le&&g(x.sheenRoughnessMap.channel),specularMapUv:ae&&g(x.specularMap.channel),specularColorMapUv:Ee&&g(x.specularColorMap.channel),specularIntensityMapUv:Ae&&g(x.specularIntensityMap.channel),transmissionMapUv:Re&&g(x.transmissionMap.channel),thicknessMapUv:U&&g(x.thicknessMap.channel),alphaMapUv:Y&&g(x.alphaMap.channel),vertexTangents:!!B.attributes.tangent&&(bt||F),vertexNormals:!!B.attributes.normal,vertexColors:x.vertexColors,vertexAlphas:x.vertexColors===!0&&!!B.attributes.color&&B.attributes.color.itemSize===4,pointsUvs:C.isPoints===!0&&!!B.attributes.uv&&(Ue||Y),fog:!!I,useFog:x.fog===!0,fogExp2:!!I&&I.isFogExp2,flatShading:x.wireframe===!1&&(x.flatShading===!0||B.attributes.normal===void 0&&bt===!1&&(x.isMeshLambertMaterial||x.isMeshPhongMaterial||x.isMeshStandardMaterial||x.isMeshPhysicalMaterial)),sizeAttenuation:x.sizeAttenuation===!0,logarithmicDepthBuffer:u,reversedDepthBuffer:xe,skinning:C.isSkinnedMesh===!0,hasPositionAttribute:B.attributes.position!==void 0,morphTargets:B.morphAttributes.position!==void 0,morphNormals:B.morphAttributes.normal!==void 0,morphColors:B.morphAttributes.color!==void 0,morphTargetsCount:we,morphTextureStride:Me,numSunLights:A.sun.length,numDirLights:A.directional.length,numPointLights:A.point.length,numSpotLights:A.spot.length,numSpotLightMaps:A.spotLightMap.length,numRectAreaLights:A.rectArea.length,numHemiLights:A.hemi.length,numSunLightShadows:A.sunShadowMap.length,numDirLightShadows:A.directionalShadowMap.length,numPointLightShadows:A.pointShadowMap.length,numSpotLightShadows:A.spotShadowMap.length,numSpotLightShadowsWithMaps:A.numSpotLightShadowsWithMaps,numLightProbes:A.numLightProbes,numLightProbeGrids:L.length,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:x.dithering,shadowMapEnabled:t.shadowMap.enabled&&w.length>0,shadowMapType:t.shadowMap.type,toneMapping:ye,decodeVideoTexture:Ue&&x.map.isVideoTexture===!0&&Et.getTransfer(x.map.colorSpace)===ft,decodeVideoTextureEmissive:fn&&x.emissiveMap.isVideoTexture===!0&&Et.getTransfer(x.emissiveMap.colorSpace)===ft,premultipliedAlpha:x.premultipliedAlpha,doubleSided:x.side===dn,flipSided:x.side===$t,useDepthPacking:x.depthPacking>=0,depthPacking:x.depthPacking||0,index0AttributeName:x.index0AttributeName,extensionClipCullDistance:J&&x.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(J&&x.extensions.multiDraw===!0||ge)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:x.customProgramCacheKey()};return Se.vertexUv1s=l.has(1),Se.vertexUv2s=l.has(2),Se.vertexUv3s=l.has(3),l.clear(),Se}function d(x){let A=[];if(x.shaderID?A.push(x.shaderID):(A.push(x.customVertexShaderID),A.push(x.customFragmentShaderID)),x.defines!==void 0)for(let w in x.defines)A.push(w),A.push(x.defines[w]);return x.isRawShaderMaterial===!1&&(m(A,x),_(A,x),A.push(t.outputColorSpace)),A.push(x.customProgramCacheKey),A.join()}function m(x,A){x.push(A.precision),x.push(A.outputColorSpace),x.push(A.envMapMode),x.push(A.envMapCubeUVHeight),x.push(A.mapUv),x.push(A.alphaMapUv),x.push(A.lightMapUv),x.push(A.aoMapUv),x.push(A.bumpMapUv),x.push(A.normalMapUv),x.push(A.displacementMapUv),x.push(A.emissiveMapUv),x.push(A.metalnessMapUv),x.push(A.roughnessMapUv),x.push(A.anisotropyMapUv),x.push(A.clearcoatMapUv),x.push(A.clearcoatNormalMapUv),x.push(A.clearcoatRoughnessMapUv),x.push(A.iridescenceMapUv),x.push(A.iridescenceThicknessMapUv),x.push(A.sheenColorMapUv),x.push(A.sheenRoughnessMapUv),x.push(A.specularMapUv),x.push(A.specularColorMapUv),x.push(A.specularIntensityMapUv),x.push(A.transmissionMapUv),x.push(A.thicknessMapUv),x.push(A.combine),x.push(A.fogExp2),x.push(A.sizeAttenuation),x.push(A.morphTargetsCount),x.push(A.morphAttributeCount),x.push(A.numSunLights),x.push(A.numDirLights),x.push(A.numPointLights),x.push(A.numSpotLights),x.push(A.numSpotLightMaps),x.push(A.numHemiLights),x.push(A.numRectAreaLights),x.push(A.numSunLightShadows),x.push(A.numDirLightShadows),x.push(A.numPointLightShadows),x.push(A.numSpotLightShadows),x.push(A.numSpotLightShadowsWithMaps),x.push(A.numLightProbes),x.push(A.shadowMapType),x.push(A.toneMapping),x.push(A.numClippingPlanes),x.push(A.numClipIntersection),x.push(A.depthPacking)}function _(x,A){a.disableAll(),A.instancing&&a.enable(0),A.instancingColor&&a.enable(1),A.instancingMorph&&a.enable(2),A.matcap&&a.enable(3),A.envMap&&a.enable(4),A.normalMapObjectSpace&&a.enable(5),A.normalMapTangentSpace&&a.enable(6),A.clearcoat&&a.enable(7),A.iridescence&&a.enable(8),A.alphaTest&&a.enable(9),A.vertexColors&&a.enable(10),A.vertexAlphas&&a.enable(11),A.vertexUv1s&&a.enable(12),A.vertexUv2s&&a.enable(13),A.vertexUv3s&&a.enable(14),A.vertexTangents&&a.enable(15),A.anisotropy&&a.enable(16),A.alphaHash&&a.enable(17),A.batching&&a.enable(18),A.dispersion&&a.enable(19),A.retroreflection&&a.enable(24),A.batchingColor&&a.enable(20),A.gradientMap&&a.enable(21),A.packedNormalMap&&a.enable(22),A.vertexNormals&&a.enable(23),x.push(a.mask),a.disableAll(),A.fog&&a.enable(0),A.useFog&&a.enable(1),A.flatShading&&a.enable(2),A.logarithmicDepthBuffer&&a.enable(3),A.reversedDepthBuffer&&a.enable(4),A.skinning&&a.enable(5),A.morphTargets&&a.enable(6),A.morphNormals&&a.enable(7),A.morphColors&&a.enable(8),A.premultipliedAlpha&&a.enable(9),A.shadowMapEnabled&&a.enable(10),A.doubleSided&&a.enable(11),A.flipSided&&a.enable(12),A.useDepthPacking&&a.enable(13),A.dithering&&a.enable(14),A.transmission&&a.enable(15),A.sheen&&a.enable(16),A.opaque&&a.enable(17),A.pointsUvs&&a.enable(18),A.decodeVideoTexture&&a.enable(19),A.decodeVideoTextureEmissive&&a.enable(20),A.alphaToCoverage&&a.enable(21),A.numLightProbeGrids>0&&a.enable(22),A.hasPositionAttribute&&a.enable(23),x.push(a.mask)}function E(x){let A=h[x.type],w;if(A){let D=kn[A];w=Xf.clone(D.uniforms)}else w=x.uniforms;return w}function v(x,A){let w=p.get(A);return w!==void 0?++w.usedTimes:(w=new xx(t,A,x,r),f.push(w),p.set(A,w)),w}function T(x){if(--x.usedTimes===0){let A=f.indexOf(x);f[A]=f[f.length-1],f.pop(),p.delete(x.cacheKey),x.destroy()}}function M(x){c.remove(x)}function R(){c.dispose()}return{getParameters:b,getProgramCacheKey:d,getUniforms:E,acquireProgram:v,releaseProgram:T,releaseShaderCache:M,programs:f,dispose:R}}function Ex(){let t=new WeakMap;function e(a){return t.has(a)}function n(a){let c=t.get(a);return c===void 0&&(c={},t.set(a,c)),c}function i(a){t.delete(a)}function r(a,c,l){t.get(a)[c]=l}function o(){t=new WeakMap}return{has:e,get:n,remove:i,update:r,dispose:o}}function yx(t,e){return t.groupOrder!==e.groupOrder?t.groupOrder-e.groupOrder:t.renderOrder!==e.renderOrder?t.renderOrder-e.renderOrder:t.material.id!==e.material.id?t.material.id-e.material.id:t.materialVariant!==e.materialVariant?t.materialVariant-e.materialVariant:t.z!==e.z?t.z-e.z:t.id-e.id}function md(t,e){return t.groupOrder!==e.groupOrder?t.groupOrder-e.groupOrder:t.renderOrder!==e.renderOrder?t.renderOrder-e.renderOrder:t.z!==e.z?e.z-t.z:t.id-e.id}function gd(){let t=[],e=0,n=[],i=[],r=[];function o(){e=0,n.length=0,i.length=0,r.length=0}function a(s){let h=0;return s.isInstancedMesh&&(h+=2),s.isSkinnedMesh&&(h+=1),h}function c(s,h,g,b,d,m){let _=t[e];return _===void 0?(_={id:s.id,object:s,geometry:h,material:g,materialVariant:a(s),groupOrder:b,renderOrder:s.renderOrder,z:d,group:m},t[e]=_):(_.id=s.id,_.object=s,_.geometry=h,_.material=g,_.materialVariant=a(s),_.groupOrder=b,_.renderOrder=s.renderOrder,_.z=d,_.group=m),e++,_}function l(s,h,g,b,d,m,_){_.reversedDepth===!0&&(d=-d);let E=c(s,h,g,b,d,m);g.transmission>0?i.push(E):g.transparent===!0?r.push(E):n.push(E)}function f(s,h,g,b,d,m){let _=c(s,h,g,b,d,m);g.transmission>0?i.unshift(_):g.transparent===!0?r.unshift(_):n.unshift(_)}function p(s,h){n.length>1&&n.sort(s||yx),i.length>1&&i.sort(h||md),r.length>1&&r.sort(h||md)}function u(){for(let s=e,h=t.length;s<h;s++){let g=t[s];if(g.id===null)break;g.id=null,g.object=null,g.geometry=null,g.material=null,g.group=null}}return{opaque:n,transmissive:i,transparent:r,init:o,push:l,unshift:f,finish:u,sort:p}}function Mx(){let t=new WeakMap;function e(i,r){let o=t.get(i),a;return o===void 0?(a=new gd,t.set(i,[a])):r>=o.length?(a=new gd,o.push(a)):a=o[r],a}function n(){t=new WeakMap}return{get:e,dispose:n}}function Ax(){let t={};return{get:function(e){if(t[e.id]!==void 0)return t[e.id];let n;switch(e.type){case"SunLight":case"DirectionalLight":n={direction:new j,color:new Xe};break;case"SpotLight":n={position:new j,direction:new j,color:new Xe,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":n={position:new j,color:new Xe,distance:0,decay:0};break;case"HemisphereLight":n={direction:new j,skyColor:new Xe,groundColor:new Xe};break;case"RectAreaLight":n={color:new Xe,position:new j,halfWidth:new j,halfHeight:new j};break}return t[e.id]=n,n}}}function wx(){let t={};return{get:function(e){if(t[e.id]!==void 0)return t[e.id];let n;switch(e.type){case"SunLight":case"DirectionalLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ne};break;case"SpotLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ne};break;case"PointLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ne,shadowCameraNear:1,shadowCameraFar:1e3};break}return t[e.id]=n,n}}}var Rx=0;function Px(t,e){return(e.castShadow?2:0)-(t.castShadow?2:0)+(e.map?1:0)-(t.map?1:0)}function Cx(t){let e=new Ax,n=wx(),i={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let f=0;f<9;f++)i.probe.push(new j);let r=new j,o=new $e,a=new $e;function c(f){let p=0,u=0,s=0;for(let C=0;C<9;C++)i.probe[C].set(0,0,0);let h=0,g=0,b=0,d=0,m=0,_=0,E=0,v=0,T=0,M=0,R=0,x=0,A=0,w=0;f.sort(Px);for(let C=0,L=f.length;C<L;C++){let I=f[C],B=I.color,z=I.intensity,W=I.distance,ne=null;if(I.shadow&&I.shadow.map&&(I.shadow.map.texture.format===In?ne=I.shadow.map.texture:ne=I.shadow.map.depthTexture||I.shadow.map.texture),I.isAmbientLight)p+=B.r*z,u+=B.g*z,s+=B.b*z;else if(I.isLightProbe){for(let K=0;K<9;K++)i.probe[K].addScaledVector(I.sh.coefficients[K],z);w++}else if(I.isSunLight){let K=e.get(I);if(K.color.copy(I.color).multiplyScalar(I.intensity),I.castShadow){let ee=I.shadow,te=n.get(I);te.shadowIntensity=ee.intensity,te.shadowBias=ee.bias,te.shadowNormalBias=ee.normalBias,te.shadowRadius=ee.radius,te.shadowMapSize.copy(ee.mapSize).multiply(ee.getFrameExtents()),i.sunShadow[g]=te,i.sunShadowMap[g]=ne;let we=ee.getViewportCount();for(let Me=0;Me<we;Me++)i.sunShadowMatrix[b+Me]=ee.getMatrix(Me),i.sunShadowCascade[b+Me]=ee._cascadeData[Me];b+=we,g++}i.sun[h]=K,h++}else if(I.isDirectionalLight){let K=e.get(I);if(K.color.copy(I.color).multiplyScalar(I.intensity),I.castShadow){let ee=I.shadow,te=n.get(I);te.shadowIntensity=ee.intensity,te.shadowBias=ee.bias,te.shadowNormalBias=ee.normalBias,te.shadowRadius=ee.radius,te.shadowMapSize=ee.mapSize,i.directionalShadow[d]=te,i.directionalShadowMap[d]=ne,i.directionalShadowMatrix[d]=I.shadow.matrix,T++}i.directional[d]=K,d++}else if(I.isSpotLight){let K=e.get(I);K.position.setFromMatrixPosition(I.matrixWorld),K.color.copy(B).multiplyScalar(z),K.distance=W,K.coneCos=Math.cos(I.angle),K.penumbraCos=Math.cos(I.angle*(1-I.penumbra)),K.decay=I.decay,i.spot[_]=K;let ee=I.shadow;if(I.map&&(i.spotLightMap[x]=I.map,x++,ee.updateMatrices(I),I.castShadow&&A++),i.spotLightMatrix[_]=ee.matrix,I.castShadow){let te=n.get(I);te.shadowIntensity=ee.intensity,te.shadowBias=ee.bias,te.shadowNormalBias=ee.normalBias,te.shadowRadius=ee.radius,te.shadowMapSize=ee.mapSize,i.spotShadow[_]=te,i.spotShadowMap[_]=ne,R++}_++}else if(I.isRectAreaLight){let K=e.get(I);K.color.copy(B).multiplyScalar(z),K.halfWidth.set(I.width*.5,0,0),K.halfHeight.set(0,I.height*.5,0),i.rectArea[E]=K,E++}else if(I.isPointLight){let K=e.get(I);if(K.color.copy(I.color).multiplyScalar(I.intensity),K.distance=I.distance,K.decay=I.decay,I.castShadow){let ee=I.shadow,te=n.get(I);te.shadowIntensity=ee.intensity,te.shadowBias=ee.bias,te.shadowNormalBias=ee.normalBias,te.shadowRadius=ee.radius,te.shadowMapSize=ee.mapSize,te.shadowCameraNear=ee.camera.near,te.shadowCameraFar=ee.camera.far,i.pointShadow[m]=te,i.pointShadowMap[m]=ne,i.pointShadowMatrix[m]=I.shadow.matrix,M++}i.point[m]=K,m++}else if(I.isHemisphereLight){let K=e.get(I);K.skyColor.copy(I.color).multiplyScalar(z),K.groundColor.copy(I.groundColor).multiplyScalar(z),i.hemi[v]=K,v++}}E>0&&(t.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=ue.LTC_FLOAT_1,i.rectAreaLTC2=ue.LTC_FLOAT_2):(i.rectAreaLTC1=ue.LTC_HALF_1,i.rectAreaLTC2=ue.LTC_HALF_2)),i.ambient[0]=p,i.ambient[1]=u,i.ambient[2]=s;let D=i.hash;(D.sunLength!==h||D.directionalLength!==d||D.pointLength!==m||D.spotLength!==_||D.rectAreaLength!==E||D.hemiLength!==v||D.numSunShadows!==g||D.numDirectionalShadows!==T||D.numPointShadows!==M||D.numSpotShadows!==R||D.numSpotMaps!==x||D.numLightProbes!==w)&&(i.sun.length=h,i.directional.length=d,i.spot.length=_,i.rectArea.length=E,i.point.length=m,i.hemi.length=v,i.sunShadow.length=g,i.sunShadowMap.length=g,i.sunShadowMatrix.length=b,i.sunShadowCascade.length=b,i.directionalShadow.length=T,i.directionalShadowMap.length=T,i.directionalShadowMatrix.length=T,i.pointShadow.length=M,i.pointShadowMap.length=M,i.pointShadowMatrix.length=M,i.spotShadow.length=R,i.spotShadowMap.length=R,i.spotLightMatrix.length=R+x-A,i.spotLightMap.length=x,i.numSpotLightShadowsWithMaps=A,i.numLightProbes=w,D.sunLength=h,D.directionalLength=d,D.pointLength=m,D.spotLength=_,D.rectAreaLength=E,D.hemiLength=v,D.numSunShadows=g,D.numDirectionalShadows=T,D.numPointShadows=M,D.numSpotShadows=R,D.numSpotMaps=x,D.numLightProbes=w,i.version=Rx++)}function l(f,p){let u=0,s=0,h=0,g=0,b=0,d=0,m=p.matrixWorldInverse;for(let _=0,E=f.length;_<E;_++){let v=f[_];if(v.isSunLight){let T=i.sun[u];T.direction.setFromMatrixPosition(v.matrixWorld),T.direction.transformDirection(m),u++}else if(v.isDirectionalLight){let T=i.directional[s];T.direction.setFromMatrixPosition(v.matrixWorld),r.setFromMatrixPosition(v.target.matrixWorld),T.direction.sub(r),T.direction.transformDirection(m),s++}else if(v.isSpotLight){let T=i.spot[g];T.position.setFromMatrixPosition(v.matrixWorld),T.position.applyMatrix4(m),T.direction.setFromMatrixPosition(v.matrixWorld),r.setFromMatrixPosition(v.target.matrixWorld),T.direction.sub(r),T.direction.transformDirection(m),g++}else if(v.isRectAreaLight){let T=i.rectArea[b];T.position.setFromMatrixPosition(v.matrixWorld),T.position.applyMatrix4(m),a.identity(),o.copy(v.matrixWorld),o.premultiply(m),a.extractRotation(o),T.halfWidth.set(v.width*.5,0,0),T.halfHeight.set(0,v.height*.5,0),T.halfWidth.applyMatrix4(a),T.halfHeight.applyMatrix4(a),b++}else if(v.isPointLight){let T=i.point[h];T.position.setFromMatrixPosition(v.matrixWorld),T.position.applyMatrix4(m),h++}else if(v.isHemisphereLight){let T=i.hemi[d];T.direction.setFromMatrixPosition(v.matrixWorld),T.direction.transformDirection(m),d++}}}return{setup:c,setupView:l,state:i}}function _d(t){let e=new Cx(t),n=[],i=[],r=[];function o(s){u.camera=s,n.length=0,i.length=0,r.length=0}function a(s){n.push(s)}function c(s){i.push(s)}function l(s){r.push(s)}function f(){e.setup(n)}function p(s){e.setupView(n,s)}let u={lightsArray:n,shadowsArray:i,lightProbeGridArray:r,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:o,state:u,setupLights:f,setupLightsView:p,pushLight:a,pushShadow:c,pushLightProbeGrid:l}}function Ix(t){let e=new WeakMap;function n(r,o=0){let a=e.get(r),c;return a===void 0?(c=new _d(t),e.set(r,[c])):o>=a.length?(c=new _d(t),a.push(c)):c=a[o],c}function i(){e=new WeakMap}return{get:n,dispose:i}}var Dx=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Lx=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,Nx=[new j(1,0,0),new j(-1,0,0),new j(0,1,0),new j(0,-1,0),new j(0,0,1),new j(0,0,-1)],Ux=[new j(0,-1,0),new j(0,-1,0),new j(0,0,1),new j(0,0,-1),new j(0,-1,0),new j(0,-1,0)],vd=new $e,Xr=new j,Vc=new j;function Fx(t,e,n){let i=new Pc,r=new Ne,o=new Ne,a=new At,c=new Yf,l=new Kf,f={},p=n.maxTextureSize,u={[Cn]:$t,[$t]:Cn,[dn]:dn},s=new qt({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Ne},radius:{value:4}},vertexShader:Dx,fragmentShader:Lx}),h=s.clone();h.defines.HORIZONTAL_PASS=1;let g=new Xt;g.setAttribute("position",new Tt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let b=new hn(g,s),d=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Fr;let m=this.type;this.render=function(M,R,x){if(d.enabled===!1||d.autoUpdate===!1&&d.needsUpdate===!1||M.length===0)return;this.type===ku&&(it("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=Fr);let A=t.getRenderTarget(),w=t.getActiveCubeFace(),D=t.getActiveMipmapLevel(),C=t.state;C.setBlending(Ot),C.buffers.depth.getReversed()===!0?C.buffers.color.setClear(0,0,0,0):C.buffers.color.setClear(1,1,1,1),C.buffers.depth.setTest(!0),C.setScissorTest(!1);let L=m!==this.type;L&&R.traverse(function(I){I.material&&(Array.isArray(I.material)?I.material.forEach(B=>B.needsUpdate=!0):I.material.needsUpdate=!0)});for(let I=0,B=M.length;I<B;I++){let z=M[I],W=z.shadow;if(W===void 0){it("WebGLShadowMap:",z,"has no shadow.");continue}if(W.autoUpdate===!1&&W.needsUpdate===!1)continue;r.copy(W.mapSize);let ne=W.getFrameExtents();r.multiply(ne),o.copy(W.mapSize),(r.x>p||r.y>p)&&(r.x>p&&(o.x=Math.floor(p/ne.x),r.x=o.x*ne.x,W.mapSize.x=o.x),r.y>p&&(o.y=Math.floor(p/ne.y),r.y=o.y*ne.y,W.mapSize.y=o.y));let K=t.state.buffers.depth.getReversed();if(W.camera._reversedDepth=K,W.map===null||L===!0){if(W.map!==null&&(W.map.depthTexture!==null&&(W.map.depthTexture.dispose(),W.map.depthTexture=null),W.map.dispose()),this.type===Xi){if(z.isPointLight){it("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}W.map=new Dt(r.x,r.y,{format:In,type:Mt,minFilter:st,magFilter:st,generateMipmaps:!1}),W.map.texture.name=z.name+".shadowMap",W.map.depthTexture=new zr(r.x,r.y,Be),W.map.depthTexture.name=z.name+".shadowMapDepth",W.map.depthTexture.format=Ei,W.map.depthTexture.compareFunction=null,W.map.depthTexture.minFilter=Fe,W.map.depthTexture.magFilter=Fe}else z.isPointLight?(W.map=new Yo(r.x),W.map.depthTexture=new $f(r.x,on)):(W.map=new Dt(r.x,r.y),W.map.depthTexture=new zr(r.x,r.y,on)),W.map.depthTexture.name=z.name+".shadowMap",W.map.depthTexture.format=Ei,this.type===Fr?(W.map.depthTexture.compareFunction=K?Ho:Go,W.map.depthTexture.minFilter=st,W.map.depthTexture.magFilter=st):(W.map.depthTexture.compareFunction=null,W.map.depthTexture.minFilter=Fe,W.map.depthTexture.magFilter=Fe);W.camera.updateProjectionMatrix()}W.map.isWebGLCubeRenderTarget!==!0&&(W.map.width!==r.x||W.map.height!==r.y)&&W.map.setSize(r.x,r.y);let ee=W.map.isWebGLCubeRenderTarget?6:W.getViewportCount();z.isPointLight!==!0&&W.updateMatrices(z,x);for(let te=0;te<ee;te++){let we=W.getCamera(te);if(z.isPointLight){let Me=W.camera,Pt=W.matrix,ze=z.distance||Me.far;ze!==Me.far&&(Me.far=ze,Me.updateProjectionMatrix()),Xr.setFromMatrixPosition(z.matrixWorld),Me.position.copy(Xr),Vc.copy(Me.position),Vc.add(Nx[te]),Me.up.copy(Ux[te]),Me.lookAt(Vc),Me.updateMatrixWorld(),Pt.makeTranslation(-Xr.x,-Xr.y,-Xr.z),vd.multiplyMatrices(Me.projectionMatrix,Me.matrixWorldInverse),W._frustum.setFromProjectionMatrix(vd,Me.coordinateSystem,Me.reversedDepth)}if(W.map.isWebGLCubeRenderTarget)t.setRenderTarget(W.map,te),t.clear();else{te===0&&(t.setRenderTarget(W.map),t.clear());let Me=W.getViewport(te);a.set(o.x*Me.x,o.y*Me.y,o.x*Me.z,o.y*Me.w),C.viewport(a)}i=W.getFrustum(te),v(R,x,we,z,this.type)}W.isPointLightShadow!==!0&&this.type===Xi&&_(W,x),W.needsUpdate=!1}m=this.type,d.needsUpdate=!1,t.setRenderTarget(A,w,D)};function _(M,R){let x=e.update(b);s.defines.VSM_SAMPLES!==M.blurSamples&&(s.defines.VSM_SAMPLES=M.blurSamples,h.defines.VSM_SAMPLES=M.blurSamples,s.needsUpdate=!0,h.needsUpdate=!0),M.mapPass===null?M.mapPass=new Dt(r.x,r.y,{format:In,type:Mt}):(M.mapPass.width!==M.map.width||M.mapPass.height!==M.map.height)&&M.mapPass.setSize(M.map.width,M.map.height),s.uniforms.shadow_pass.value=M.map.depthTexture,s.uniforms.resolution.value.set(M.map.width,M.map.height),s.uniforms.radius.value=M.radius,t.setRenderTarget(M.mapPass),t.clear(),t.renderBufferDirect(R,null,x,s,b,null),h.uniforms.shadow_pass.value=M.mapPass.texture,h.uniforms.resolution.value.set(M.map.width,M.map.height),h.uniforms.radius.value=M.radius,t.setRenderTarget(M.map),t.clear(),t.renderBufferDirect(R,null,x,h,b,null)}function E(M,R,x,A){let w=null,D=x.isPointLight===!0?M.customDistanceMaterial:M.customDepthMaterial;if(D!==void 0)w=D;else if(w=x.isPointLight===!0?l:c,t.localClippingEnabled&&R.clipShadows===!0&&Array.isArray(R.clippingPlanes)&&R.clippingPlanes.length!==0||R.displacementMap&&R.displacementScale!==0||R.alphaMap&&R.alphaTest>0||R.map&&R.alphaTest>0||R.alphaToCoverage===!0){let C=w.uuid,L=R.uuid,I=f[C];I===void 0&&(I={},f[C]=I);let B=I[L];B===void 0&&(B=w.clone(),I[L]=B,R.addEventListener("dispose",T)),w=B}if(w.visible=R.visible,w.wireframe=R.wireframe,A===Xi?w.side=R.shadowSide!==null?R.shadowSide:R.side:w.side=R.shadowSide!==null?R.shadowSide:u[R.side],w.alphaMap=R.alphaMap,w.alphaTest=R.alphaToCoverage===!0?.5:R.alphaTest,w.map=R.map,w.clipShadows=R.clipShadows,w.clippingPlanes=R.clippingPlanes,w.clipIntersection=R.clipIntersection,w.displacementMap=R.displacementMap,w.displacementScale=R.displacementScale,w.displacementBias=R.displacementBias,w.wireframeLinewidth=R.wireframeLinewidth,w.linewidth=R.linewidth,x.isPointLight===!0&&w.isMeshDistanceMaterial===!0){let C=t.properties.get(w);C.light=x}return w}function v(M,R,x,A,w){if(M.visible===!1)return;if(M.layers.test(R.layers)&&(M.isMesh||M.isLine||M.isPoints)&&(M.castShadow||M.receiveShadow&&w===Xi)&&(!M.frustumCulled||M.intersectsFrustum(i))){M.modelViewMatrix.multiplyMatrices(x.matrixWorldInverse,M.matrixWorld);let L=e.update(M),I=M.material;if(Array.isArray(I)){let B=L.groups;for(let z=0,W=B.length;z<W;z++){let ne=B[z],K=I[ne.materialIndex];if(K&&K.visible){let ee=E(M,K,A,w);M.onBeforeShadow(t,M,R,x,L,ee,ne),t.renderBufferDirect(x,null,L,ee,M,ne),M.onAfterShadow(t,M,R,x,L,ee,ne)}}}else if(I.visible){let B=E(M,I,A,w);M.onBeforeShadow(t,M,R,x,L,B,null),t.renderBufferDirect(x,null,L,B,M,null),M.onAfterShadow(t,M,R,x,L,B,null)}}let C=M.children;for(let L=0,I=C.length;L<I;L++)v(C[L],R,x,A,w)}function T(M){M.target.removeEventListener("dispose",T);for(let x in f){let A=f[x],w=M.target.uuid;w in A&&(A[w].dispose(),delete A[w])}}}function Bx(t,e){function n(){let U=!1,se=new At,Y=null,ce=new At(0,0,0,0);return{setMask:function(pe){Y!==pe&&!U&&(t.colorMask(pe,pe,pe,pe),Y=pe)},setLocked:function(pe){U=pe},setClear:function(pe,J,ye,Se,_t){_t===!0&&(pe*=Se,J*=Se,ye*=Se),se.set(pe,J,ye,Se),ce.equals(se)===!1&&(t.clearColor(pe,J,ye,Se),ce.copy(se))},reset:function(){U=!1,Y=null,ce.set(-1,0,0,0)}}}function i(){let U=!1,se=!1,Y=null,ce=null,pe=null;return{setReversed:function(J){if(se!==J){let ye=e.get("EXT_clip_control");J?ye.clipControlEXT(ye.LOWER_LEFT_EXT,ye.ZERO_TO_ONE_EXT):ye.clipControlEXT(ye.LOWER_LEFT_EXT,ye.NEGATIVE_ONE_TO_ONE_EXT),se=J;let Se=pe;pe=null,this.setClear(Se)}},getReversed:function(){return se},setTest:function(J){J?Q(t.DEPTH_TEST):xe(t.DEPTH_TEST)},setMask:function(J){Y!==J&&!U&&(t.depthMask(J),Y=J)},setFunc:function(J){if(se&&(J=Bf[J]),ce!==J){switch(J){case lf:t.depthFunc(t.NEVER);break;case uf:t.depthFunc(t.ALWAYS);break;case ff:t.depthFunc(t.LESS);break;case Is:t.depthFunc(t.LEQUAL);break;case df:t.depthFunc(t.EQUAL);break;case pf:t.depthFunc(t.GEQUAL);break;case hf:t.depthFunc(t.GREATER);break;case mf:t.depthFunc(t.NOTEQUAL);break;default:t.depthFunc(t.LEQUAL)}ce=J}},setLocked:function(J){U=J},setClear:function(J){pe!==J&&(pe=J,se&&(J=1-J),t.clearDepth(J))},reset:function(){U=!1,Y=null,ce=null,pe=null,se=!1}}}function r(){let U=!1,se=null,Y=null,ce=null,pe=null,J=null,ye=null,Se=null,_t=null;return{setTest:function(tt){U||(tt?Q(t.STENCIL_TEST):xe(t.STENCIL_TEST))},setMask:function(tt){se!==tt&&!U&&(t.stencilMask(tt),se=tt)},setFunc:function(tt,Pn,Bn){(Y!==tt||ce!==Pn||pe!==Bn)&&(t.stencilFunc(tt,Pn,Bn),Y=tt,ce=Pn,pe=Bn)},setOp:function(tt,Pn,Bn){(J!==tt||ye!==Pn||Se!==Bn)&&(t.stencilOp(tt,Pn,Bn),J=tt,ye=Pn,Se=Bn)},setLocked:function(tt){U=tt},setClear:function(tt){_t!==tt&&(t.clearStencil(tt),_t=tt)},reset:function(){U=!1,se=null,Y=null,ce=null,pe=null,J=null,ye=null,Se=null,_t=null}}}let o=new n,a=new i,c=new r,l=new WeakMap,f=new WeakMap,p={},u={},s={},h=new WeakMap,g=[],b=null,d=!1,m=null,_=null,E=null,v=null,T=null,M=null,R=null,x=new Xe(0,0,0),A=0,w=!1,D=null,C=null,L=null,I=null,B=null,z=t.getParameter(t.MAX_COMBINED_TEXTURE_IMAGE_UNITS),W=!1,ne=0,K=t.getParameter(t.VERSION);K.indexOf("WebGL")!==-1?(ne=parseFloat(/^WebGL (\d)/.exec(K)[1]),W=ne>=1):K.indexOf("OpenGL ES")!==-1&&(ne=parseFloat(/^OpenGL ES (\d)/.exec(K)[1]),W=ne>=2);let ee=null,te={},we=t.getParameter(t.SCISSOR_BOX),Me=t.getParameter(t.VIEWPORT),Pt=new At().fromArray(we),ze=new At().fromArray(Me);function et(U,se,Y,ce){let pe=new Uint8Array(4),J=t.createTexture();t.bindTexture(U,J),t.texParameteri(U,t.TEXTURE_MIN_FILTER,t.NEAREST),t.texParameteri(U,t.TEXTURE_MAG_FILTER,t.NEAREST);for(let ye=0;ye<Y;ye++)U===t.TEXTURE_3D||U===t.TEXTURE_2D_ARRAY?t.texImage3D(se,0,t.RGBA,1,1,ce,0,t.RGBA,t.UNSIGNED_BYTE,pe):t.texImage2D(se+ye,0,t.RGBA,1,1,0,t.RGBA,t.UNSIGNED_BYTE,pe);return J}let q={};q[t.TEXTURE_2D]=et(t.TEXTURE_2D,t.TEXTURE_2D,1),q[t.TEXTURE_CUBE_MAP]=et(t.TEXTURE_CUBE_MAP,t.TEXTURE_CUBE_MAP_POSITIVE_X,6),q[t.TEXTURE_2D_ARRAY]=et(t.TEXTURE_2D_ARRAY,t.TEXTURE_2D_ARRAY,1,1),q[t.TEXTURE_3D]=et(t.TEXTURE_3D,t.TEXTURE_3D,1,1),o.setClear(0,0,0,1),a.setClear(1),c.setClear(0),Q(t.DEPTH_TEST),a.setFunc(Is),ke(!1),bt(Rs),Q(t.CULL_FACE),Ke(Ot);function Q(U){p[U]!==!0&&(t.enable(U),p[U]=!0)}function xe(U){p[U]!==!1&&(t.disable(U),p[U]=!1)}function Ce(U,se){return s[U]!==se?(t.bindFramebuffer(U,se),s[U]=se,U===t.DRAW_FRAMEBUFFER&&(s[t.FRAMEBUFFER]=se),U===t.FRAMEBUFFER&&(s[t.DRAW_FRAMEBUFFER]=se),!0):!1}function ge(U,se){let Y=g,ce=!1;if(U){Y=h.get(se),Y===void 0&&(Y=[],h.set(se,Y));let pe=U.textures;if(Y.length!==pe.length||Y[0]!==t.COLOR_ATTACHMENT0){for(let J=0,ye=pe.length;J<ye;J++)Y[J]=t.COLOR_ATTACHMENT0+J;Y.length=pe.length,ce=!0}}else Y[0]!==t.BACK&&(Y[0]=t.BACK,ce=!0);ce&&t.drawBuffers(Y)}function Ue(U){return b!==U?(t.useProgram(U),b=U,!0):!1}let Bt={[qi]:t.FUNC_ADD,[zu]:t.FUNC_SUBTRACT,[Wu]:t.FUNC_REVERSE_SUBTRACT};Bt[$u]=t.MIN,Bt[Xu]=t.MAX;let Oe={[qu]:t.ZERO,[Yu]:t.ONE,[Ku]:t.SRC_COLOR,[ju]:t.SRC_ALPHA,[rf]:t.SRC_ALPHA_SATURATE,[tf]:t.DST_COLOR,[Ju]:t.DST_ALPHA,[Zu]:t.ONE_MINUS_SRC_COLOR,[Qu]:t.ONE_MINUS_SRC_ALPHA,[nf]:t.ONE_MINUS_DST_COLOR,[ef]:t.ONE_MINUS_DST_ALPHA,[of]:t.CONSTANT_COLOR,[af]:t.ONE_MINUS_CONSTANT_COLOR,[sf]:t.CONSTANT_ALPHA,[cf]:t.ONE_MINUS_CONSTANT_ALPHA};function Ke(U,se,Y,ce,pe,J,ye,Se,_t,tt){if(U===Ot){d===!0&&(xe(t.BLEND),d=!1);return}if(d===!1&&(Q(t.BLEND),d=!0),U!==Vu){if(U!==m||tt!==w){if((_!==qi||T!==qi)&&(t.blendEquation(t.FUNC_ADD),_=qi,T=qi),tt)switch(U){case Xn:t.blendFuncSeparate(t.ONE,t.ONE_MINUS_SRC_ALPHA,t.ONE,t.ONE_MINUS_SRC_ALPHA);break;case Br:t.blendFunc(t.ONE,t.ONE);break;case Ps:t.blendFuncSeparate(t.ZERO,t.ONE_MINUS_SRC_COLOR,t.ZERO,t.ONE);break;case Cs:t.blendFuncSeparate(t.DST_COLOR,t.ONE_MINUS_SRC_ALPHA,t.ZERO,t.ONE);break;default:xt("WebGLState: Invalid blending: ",U);break}else switch(U){case Xn:t.blendFuncSeparate(t.SRC_ALPHA,t.ONE_MINUS_SRC_ALPHA,t.ONE,t.ONE_MINUS_SRC_ALPHA);break;case Br:t.blendFuncSeparate(t.SRC_ALPHA,t.ONE,t.ONE,t.ONE);break;case Ps:xt("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Cs:xt("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:xt("WebGLState: Invalid blending: ",U);break}E=null,v=null,M=null,R=null,x.set(0,0,0),A=0,m=U,w=tt}return}pe=pe||se,J=J||Y,ye=ye||ce,(se!==_||pe!==T)&&(t.blendEquationSeparate(Bt[se],Bt[pe]),_=se,T=pe),(Y!==E||ce!==v||J!==M||ye!==R)&&(t.blendFuncSeparate(Oe[Y],Oe[ce],Oe[J],Oe[ye]),E=Y,v=ce,M=J,R=ye),(Se.equals(x)===!1||_t!==A)&&(t.blendColor(Se.r,Se.g,Se.b,_t),x.copy(Se),A=_t),m=U,w=!1}function gt(U,se){U.side===dn?xe(t.CULL_FACE):Q(t.CULL_FACE);let Y=U.side===$t;se&&(Y=!Y),ke(Y),U.blending===Xn&&U.transparent===!1?Ke(Ot):Ke(U.blending,U.blendEquation,U.blendSrc,U.blendDst,U.blendEquationAlpha,U.blendSrcAlpha,U.blendDstAlpha,U.blendColor,U.blendAlpha,U.premultipliedAlpha),a.setFunc(U.depthFunc),a.setTest(U.depthTest),a.setMask(U.depthWrite),o.setMask(U.colorWrite);let ce=U.stencilWrite;c.setTest(ce),ce&&(c.setMask(U.stencilWriteMask),c.setFunc(U.stencilFunc,U.stencilRef,U.stencilFuncMask),c.setOp(U.stencilFail,U.stencilZFail,U.stencilZPass)),fn(U.polygonOffset,U.polygonOffsetFactor,U.polygonOffsetUnits),U.alphaToCoverage===!0?Q(t.SAMPLE_ALPHA_TO_COVERAGE):xe(t.SAMPLE_ALPHA_TO_COVERAGE)}function ke(U){D!==U&&(U?t.frontFace(t.CW):t.frontFace(t.CCW),D=U)}function bt(U){U!==Gu?(Q(t.CULL_FACE),U!==C&&(U===Rs?t.cullFace(t.BACK):U===Hu?t.cullFace(t.FRONT):t.cullFace(t.FRONT_AND_BACK))):xe(t.CULL_FACE),C=U}function Wt(U){U!==L&&(W&&t.lineWidth(U),L=U)}function fn(U,se,Y){U?(Q(t.POLYGON_OFFSET_FILL),(I!==se||B!==Y)&&(I=se,B=Y,a.getReversed()&&(se=-se),t.polygonOffset(se,Y))):xe(t.POLYGON_OFFSET_FILL)}function yt(U){U?Q(t.SCISSOR_TEST):xe(t.SCISSOR_TEST)}function Nt(U){U===void 0&&(U=t.TEXTURE0+z-1),ee!==U&&(t.activeTexture(U),ee=U)}function F(U,se,Y){Y===void 0&&(ee===null?Y=t.TEXTURE0+z-1:Y=ee);let ce=te[Y];ce===void 0&&(ce={type:void 0,texture:void 0},te[Y]=ce),(ce.type!==U||ce.texture!==se)&&(ee!==Y&&(t.activeTexture(Y),ee=Y),t.bindTexture(U,se||q[U]),ce.type=U,ce.texture=se)}function jt(){let U=te[ee];U!==void 0&&U.type!==void 0&&(t.bindTexture(U.type,null),U.type=void 0,U.texture=void 0)}function at(){try{t.compressedTexImage2D(...arguments)}catch(U){xt("WebGLState:",U)}}function P(){try{t.compressedTexImage3D(...arguments)}catch(U){xt("WebGLState:",U)}}function S(){try{t.texSubImage2D(...arguments)}catch(U){xt("WebGLState:",U)}}function O(){try{t.texSubImage3D(...arguments)}catch(U){xt("WebGLState:",U)}}function k(){try{t.compressedTexSubImage2D(...arguments)}catch(U){xt("WebGLState:",U)}}function $(){try{t.compressedTexSubImage3D(...arguments)}catch(U){xt("WebGLState:",U)}}function ie(){try{t.texStorage2D(...arguments)}catch(U){xt("WebGLState:",U)}}function re(){try{t.texStorage3D(...arguments)}catch(U){xt("WebGLState:",U)}}function X(){try{t.texImage2D(...arguments)}catch(U){xt("WebGLState:",U)}}function Z(){try{t.texImage3D(...arguments)}catch(U){xt("WebGLState:",U)}}function oe(U){return u[U]!==void 0?u[U]:t.getParameter(U)}function be(U,se){u[U]!==se&&(t.pixelStorei(U,se),u[U]=se)}function le(U){Pt.equals(U)===!1&&(t.scissor(U.x,U.y,U.z,U.w),Pt.copy(U))}function ae(U){ze.equals(U)===!1&&(t.viewport(U.x,U.y,U.z,U.w),ze.copy(U))}function Ee(U,se){let Y=f.get(se);Y===void 0&&(Y=new WeakMap,f.set(se,Y));let ce=Y.get(U);ce===void 0&&(ce=t.getUniformBlockIndex(se,U.name),Y.set(U,ce))}function Ae(U,se){let ce=f.get(se).get(U);l.get(se)!==ce&&(t.uniformBlockBinding(se,ce,U.__bindingPointIndex),l.set(se,ce))}function Re(){t.disable(t.BLEND),t.disable(t.CULL_FACE),t.disable(t.DEPTH_TEST),t.disable(t.POLYGON_OFFSET_FILL),t.disable(t.SCISSOR_TEST),t.disable(t.STENCIL_TEST),t.disable(t.SAMPLE_ALPHA_TO_COVERAGE),t.blendEquation(t.FUNC_ADD),t.blendFunc(t.ONE,t.ZERO),t.blendFuncSeparate(t.ONE,t.ZERO,t.ONE,t.ZERO),t.blendColor(0,0,0,0),t.colorMask(!0,!0,!0,!0),t.clearColor(0,0,0,0),t.depthMask(!0),t.depthFunc(t.LESS),a.setReversed(!1),t.clearDepth(1),t.stencilMask(4294967295),t.stencilFunc(t.ALWAYS,0,4294967295),t.stencilOp(t.KEEP,t.KEEP,t.KEEP),t.clearStencil(0),t.cullFace(t.BACK),t.frontFace(t.CCW),t.polygonOffset(0,0),t.activeTexture(t.TEXTURE0),t.bindFramebuffer(t.FRAMEBUFFER,null),t.bindFramebuffer(t.DRAW_FRAMEBUFFER,null),t.bindFramebuffer(t.READ_FRAMEBUFFER,null),t.useProgram(null),t.lineWidth(1),t.scissor(0,0,t.canvas.width,t.canvas.height),t.viewport(0,0,t.canvas.width,t.canvas.height),t.pixelStorei(t.PACK_ALIGNMENT,4),t.pixelStorei(t.UNPACK_ALIGNMENT,4),t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,!1),t.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),t.pixelStorei(t.UNPACK_COLORSPACE_CONVERSION_WEBGL,t.BROWSER_DEFAULT_WEBGL),t.pixelStorei(t.PACK_ROW_LENGTH,0),t.pixelStorei(t.PACK_SKIP_PIXELS,0),t.pixelStorei(t.PACK_SKIP_ROWS,0),t.pixelStorei(t.UNPACK_ROW_LENGTH,0),t.pixelStorei(t.UNPACK_IMAGE_HEIGHT,0),t.pixelStorei(t.UNPACK_SKIP_PIXELS,0),t.pixelStorei(t.UNPACK_SKIP_ROWS,0),t.pixelStorei(t.UNPACK_SKIP_IMAGES,0),p={},u={},ee=null,te={},s={},h=new WeakMap,g=[],b=null,d=!1,m=null,_=null,E=null,v=null,T=null,M=null,R=null,x=new Xe(0,0,0),A=0,w=!1,D=null,C=null,L=null,I=null,B=null,Pt.set(0,0,t.canvas.width,t.canvas.height),ze.set(0,0,t.canvas.width,t.canvas.height),o.reset(),a.reset(),c.reset()}return{buffers:{color:o,depth:a,stencil:c},enable:Q,disable:xe,bindFramebuffer:Ce,drawBuffers:ge,useProgram:Ue,setBlending:Ke,setMaterial:gt,setFlipSided:ke,setCullFace:bt,setLineWidth:Wt,setPolygonOffset:fn,setScissorTest:yt,activeTexture:Nt,bindTexture:F,unbindTexture:jt,compressedTexImage2D:at,compressedTexImage3D:P,texImage2D:X,texImage3D:Z,pixelStorei:be,getParameter:oe,updateUBOMapping:Ee,uniformBlockBinding:Ae,texStorage2D:ie,texStorage3D:re,texSubImage2D:S,texSubImage3D:O,compressedTexSubImage2D:k,compressedTexSubImage3D:$,scissor:le,viewport:ae,reset:Re}}function Ox(t,e,n,i,r,o,a){let c=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),f=new Ne,p=new WeakMap,u=new Set,s,h=new WeakMap,g=!1;try{g=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function b(P,S){return g?new OffscreenCanvas(P,S):Lf("canvas")}function d(P,S,O){let k=1,$=at(P);if(($.width>O||$.height>O)&&(k=O/Math.max($.width,$.height)),k<1)if(typeof HTMLImageElement<"u"&&P instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&P instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&P instanceof ImageBitmap||typeof VideoFrame<"u"&&P instanceof VideoFrame){let ie=Math.floor(k*$.width),re=Math.floor(k*$.height);s===void 0&&(s=b(ie,re));let X=S?b(ie,re):s;return X.width=ie,X.height=re,X.getContext("2d").drawImage(P,0,0,ie,re),it("WebGLRenderer: Texture has been resized from ("+$.width+"x"+$.height+") to ("+ie+"x"+re+")."),X}else return"data"in P&&it("WebGLRenderer: Image in DataTexture is too big ("+$.width+"x"+$.height+")."),P;return P}function m(P){return P.generateMipmaps}function _(P){t.generateMipmap(P)}function E(P){return P.isWebGLCubeRenderTarget?t.TEXTURE_CUBE_MAP:P.isWebGL3DRenderTarget?t.TEXTURE_3D:P.isWebGLArrayRenderTarget||P.isCompressedArrayTexture?t.TEXTURE_2D_ARRAY:t.TEXTURE_2D}function v(P,S,O,k,$,ie=!1){if(P!==null){if(t[P]!==void 0)return t[P];it("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+P+"'")}let re;k&&(re=e.get("EXT_texture_norm16"),re||it("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let X=S;if(S===t.RED&&(O===t.FLOAT&&(X=t.R32F),O===t.HALF_FLOAT&&(X=t.R16F),O===t.UNSIGNED_BYTE&&(X=t.R8),O===t.UNSIGNED_SHORT&&re&&(X=re.R16_EXT),O===t.SHORT&&re&&(X=re.R16_SNORM_EXT)),S===t.RED_INTEGER&&(O===t.UNSIGNED_BYTE&&(X=t.R8UI),O===t.UNSIGNED_SHORT&&(X=t.R16UI),O===t.UNSIGNED_INT&&(X=t.R32UI),O===t.BYTE&&(X=t.R8I),O===t.SHORT&&(X=t.R16I),O===t.INT&&(X=t.R32I)),S===t.RG&&(O===t.FLOAT&&(X=t.RG32F),O===t.HALF_FLOAT&&(X=t.RG16F),O===t.UNSIGNED_BYTE&&(X=t.RG8),O===t.UNSIGNED_SHORT&&re&&(X=re.RG16_EXT),O===t.SHORT&&re&&(X=re.RG16_SNORM_EXT)),S===t.RG_INTEGER&&(O===t.UNSIGNED_BYTE&&(X=t.RG8UI),O===t.UNSIGNED_SHORT&&(X=t.RG16UI),O===t.UNSIGNED_INT&&(X=t.RG32UI),O===t.BYTE&&(X=t.RG8I),O===t.SHORT&&(X=t.RG16I),O===t.INT&&(X=t.RG32I)),S===t.RGB_INTEGER&&(O===t.UNSIGNED_BYTE&&(X=t.RGB8UI),O===t.UNSIGNED_SHORT&&(X=t.RGB16UI),O===t.UNSIGNED_INT&&(X=t.RGB32UI),O===t.BYTE&&(X=t.RGB8I),O===t.SHORT&&(X=t.RGB16I),O===t.INT&&(X=t.RGB32I)),S===t.RGBA_INTEGER&&(O===t.UNSIGNED_BYTE&&(X=t.RGBA8UI),O===t.UNSIGNED_SHORT&&(X=t.RGBA16UI),O===t.UNSIGNED_INT&&(X=t.RGBA32UI),O===t.BYTE&&(X=t.RGBA8I),O===t.SHORT&&(X=t.RGBA16I),O===t.INT&&(X=t.RGBA32I)),S===t.RGB&&(O===t.UNSIGNED_SHORT&&re&&(X=re.RGB16_EXT),O===t.SHORT&&re&&(X=re.RGB16_SNORM_EXT),O===t.UNSIGNED_INT_5_9_9_9_REV&&(X=t.RGB9_E5),O===t.UNSIGNED_INT_10F_11F_11F_REV&&(X=t.R11F_G11F_B10F)),S===t.RGBA){let Z=ie?Sc:Et.getTransfer($);O===t.FLOAT&&(X=t.RGBA32F),O===t.HALF_FLOAT&&(X=t.RGBA16F),O===t.UNSIGNED_BYTE&&(X=Z===ft?t.SRGB8_ALPHA8:t.RGBA8),O===t.UNSIGNED_SHORT&&re&&(X=re.RGBA16_EXT),O===t.SHORT&&re&&(X=re.RGBA16_SNORM_EXT),O===t.UNSIGNED_SHORT_4_4_4_4&&(X=t.RGBA4),O===t.UNSIGNED_SHORT_5_5_5_1&&(X=t.RGB5_A1)}return(X===t.R16F||X===t.R32F||X===t.RG16F||X===t.RG32F||X===t.RGBA16F||X===t.RGBA32F)&&e.get("EXT_color_buffer_float"),X}function T(P,S){let O;return P?S===null||S===on||S===Ki?O=t.DEPTH24_STENCIL8:S===Be?O=t.DEPTH32F_STENCIL8:S===Ti&&(O=t.DEPTH24_STENCIL8,it("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):S===null||S===on||S===Ki?O=t.DEPTH_COMPONENT24:S===Be?O=t.DEPTH_COMPONENT32F:S===Ti&&(O=t.DEPTH_COMPONENT16),O}function M(P,S){return m(P)===!0||P.isFramebufferTexture&&P.minFilter!==Fe&&P.minFilter!==st?Math.log2(Math.max(S.width,S.height))+1:P.mipmaps!==void 0&&P.mipmaps.length>0?P.mipmaps.length:P.isCompressedTexture&&Array.isArray(P.image)?S.mipmaps.length:1}function R(P){let S=P.target;S.removeEventListener("dispose",R),A(S),S.isVideoTexture&&p.delete(S),S.isHTMLTexture&&u.delete(S)}function x(P){let S=P.target;S.removeEventListener("dispose",x),D(S)}function A(P){let S=i.get(P);if(S.__webglInit===void 0)return;let O=P.source,k=h.get(O);if(k){let $=k[S.__cacheKey];$.usedTimes--,$.usedTimes===0&&w(P),Object.keys(k).length===0&&h.delete(O)}i.remove(P)}function w(P){let S=i.get(P);t.deleteTexture(S.__webglTexture);let O=P.source,k=h.get(O);delete k[S.__cacheKey],a.memory.textures--}function D(P){let S=i.get(P);if(P.depthTexture&&(P.depthTexture.dispose(),i.remove(P.depthTexture)),P.isWebGLCubeRenderTarget)for(let k=0;k<6;k++){if(Array.isArray(S.__webglFramebuffer[k]))for(let $=0;$<S.__webglFramebuffer[k].length;$++)t.deleteFramebuffer(S.__webglFramebuffer[k][$]);else t.deleteFramebuffer(S.__webglFramebuffer[k]);S.__webglDepthbuffer&&t.deleteRenderbuffer(S.__webglDepthbuffer[k])}else{if(Array.isArray(S.__webglFramebuffer))for(let k=0;k<S.__webglFramebuffer.length;k++)t.deleteFramebuffer(S.__webglFramebuffer[k]);else t.deleteFramebuffer(S.__webglFramebuffer);if(S.__webglDepthbuffer&&t.deleteRenderbuffer(S.__webglDepthbuffer),S.__webglMultisampledFramebuffer&&t.deleteFramebuffer(S.__webglMultisampledFramebuffer),S.__webglColorRenderbuffer)for(let k=0;k<S.__webglColorRenderbuffer.length;k++)S.__webglColorRenderbuffer[k]&&t.deleteRenderbuffer(S.__webglColorRenderbuffer[k]);S.__webglDepthRenderbuffer&&t.deleteRenderbuffer(S.__webglDepthRenderbuffer)}let O=P.textures;for(let k=0,$=O.length;k<$;k++){let ie=i.get(O[k]);ie.__webglTexture&&(t.deleteTexture(ie.__webglTexture),a.memory.textures--),i.remove(O[k])}i.remove(P)}let C=0;function L(){C=0}function I(){return C}function B(P){C=P}function z(){let P=C;return P>=r.maxTextures&&it("WebGLTextures: Trying to use "+(P+1)+" texture units while this GPU supports only "+r.maxTextures),C+=1,P}function W(P){let S=[];return S.push(P.wrapS),S.push(P.wrapT),S.push(P.wrapR||0),S.push(P.magFilter),S.push(P.minFilter),S.push(P.anisotropy),S.push(P.internalFormat),S.push(P.format),S.push(P.type),S.push(P.generateMipmaps),S.push(P.premultiplyAlpha),S.push(P.flipY),S.push(P.unpackAlignment),S.push(P.colorSpace),S.join()}function ne(P,S){let O=i.get(P);if(P.isVideoTexture&&F(P),P.isRenderTargetTexture===!1&&P.isExternalTexture!==!0&&P.version>0&&O.__version!==P.version){let k=P.image;if(k===null)it("WebGLRenderer: Texture marked for update but no image data found.");else if(k.complete===!1)it("WebGLRenderer: Texture marked for update but image is incomplete");else{xe(O,P,S);return}}else P.isExternalTexture&&(O.__webglTexture=P.sourceTexture?P.sourceTexture:null);n.bindTexture(t.TEXTURE_2D,O.__webglTexture,t.TEXTURE0+S)}function K(P,S){let O=i.get(P);if(P.isRenderTargetTexture===!1&&P.version>0&&O.__version!==P.version){xe(O,P,S);return}else P.isExternalTexture&&(O.__webglTexture=P.sourceTexture?P.sourceTexture:null);n.bindTexture(t.TEXTURE_2D_ARRAY,O.__webglTexture,t.TEXTURE0+S)}function ee(P,S){let O=i.get(P);if(P.isRenderTargetTexture===!1&&P.version>0&&O.__version!==P.version){xe(O,P,S);return}n.bindTexture(t.TEXTURE_3D,O.__webglTexture,t.TEXTURE0+S)}function te(P,S){let O=i.get(P);if(P.isCubeDepthTexture!==!0&&P.version>0&&O.__version!==P.version){Ce(O,P,S);return}n.bindTexture(t.TEXTURE_CUBE_MAP,O.__webglTexture,t.TEXTURE0+S)}let we={[pn]:t.REPEAT,[Kt]:t.CLAMP_TO_EDGE,[xf]:t.MIRRORED_REPEAT},Me={[Fe]:t.NEAREST,[Sf]:t.NEAREST_MIPMAP_NEAREST,[Gr]:t.NEAREST_MIPMAP_LINEAR,[st]:t.LINEAR,[Io]:t.LINEAR_MIPMAP_NEAREST,[Si]:t.LINEAR_MIPMAP_LINEAR},Pt={[wf]:t.NEVER,[Df]:t.ALWAYS,[Rf]:t.LESS,[Go]:t.LEQUAL,[Pf]:t.EQUAL,[Ho]:t.GEQUAL,[Cf]:t.GREATER,[If]:t.NOTEQUAL};function ze(P,S){if(S.type===Be&&e.has("OES_texture_float_linear")===!1&&(S.magFilter===st||S.magFilter===Io||S.magFilter===Gr||S.magFilter===Si||S.minFilter===st||S.minFilter===Io||S.minFilter===Gr||S.minFilter===Si)&&it("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),t.texParameteri(P,t.TEXTURE_WRAP_S,we[S.wrapS]),t.texParameteri(P,t.TEXTURE_WRAP_T,we[S.wrapT]),(P===t.TEXTURE_3D||P===t.TEXTURE_2D_ARRAY)&&t.texParameteri(P,t.TEXTURE_WRAP_R,we[S.wrapR]),t.texParameteri(P,t.TEXTURE_MAG_FILTER,Me[S.magFilter]),t.texParameteri(P,t.TEXTURE_MIN_FILTER,Me[S.minFilter]),S.compareFunction&&(t.texParameteri(P,t.TEXTURE_COMPARE_MODE,t.COMPARE_REF_TO_TEXTURE),t.texParameteri(P,t.TEXTURE_COMPARE_FUNC,Pt[S.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(S.magFilter===Fe||S.minFilter!==Gr&&S.minFilter!==Si||S.type===Be&&e.has("OES_texture_float_linear")===!1)return;if(S.anisotropy>1||i.get(S).__currentAnisotropy){let O=e.get("EXT_texture_filter_anisotropic");t.texParameterf(P,O.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(S.anisotropy,r.getMaxAnisotropy())),i.get(S).__currentAnisotropy=S.anisotropy}}}function et(P,S){let O=!1;P.__webglInit===void 0&&(P.__webglInit=!0,S.addEventListener("dispose",R));let k=S.source,$=h.get(k);$===void 0&&($={},h.set(k,$));let ie=W(S);if(ie!==P.__cacheKey){$[ie]===void 0&&($[ie]={texture:t.createTexture(),usedTimes:0},a.memory.textures++,O=!0),$[ie].usedTimes++;let re=$[P.__cacheKey];re!==void 0&&($[P.__cacheKey].usedTimes--,re.usedTimes===0&&w(S)),P.__cacheKey=ie,P.__webglTexture=$[ie].texture}return O}function q(P,S,O){return Math.floor(Math.floor(P/O)/S)}function Q(P,S,O,k){let ie=P.updateRanges;if(ie.length===0)n.texSubImage2D(t.TEXTURE_2D,0,0,0,S.width,S.height,O,k,S.data);else{ie.sort((be,le)=>be.start-le.start);let re=0;for(let be=1;be<ie.length;be++){let le=ie[re],ae=ie[be],Ee=le.start+le.count,Ae=q(ae.start,S.width,4),Re=q(le.start,S.width,4);ae.start<=Ee+1&&Ae===Re&&q(ae.start+ae.count-1,S.width,4)===Ae?le.count=Math.max(le.count,ae.start+ae.count-le.start):(++re,ie[re]=ae)}ie.length=re+1;let X=n.getParameter(t.UNPACK_ROW_LENGTH),Z=n.getParameter(t.UNPACK_SKIP_PIXELS),oe=n.getParameter(t.UNPACK_SKIP_ROWS);n.pixelStorei(t.UNPACK_ROW_LENGTH,S.width);for(let be=0,le=ie.length;be<le;be++){let ae=ie[be],Ee=Math.floor(ae.start/4),Ae=Math.ceil(ae.count/4),Re=Ee%S.width,U=Math.floor(Ee/S.width),se=Ae,Y=1;n.pixelStorei(t.UNPACK_SKIP_PIXELS,Re),n.pixelStorei(t.UNPACK_SKIP_ROWS,U),n.texSubImage2D(t.TEXTURE_2D,0,Re,U,se,Y,O,k,S.data)}P.clearUpdateRanges(),n.pixelStorei(t.UNPACK_ROW_LENGTH,X),n.pixelStorei(t.UNPACK_SKIP_PIXELS,Z),n.pixelStorei(t.UNPACK_SKIP_ROWS,oe)}}function xe(P,S,O){let k=t.TEXTURE_2D;(S.isDataArrayTexture||S.isCompressedArrayTexture)&&(k=t.TEXTURE_2D_ARRAY),S.isData3DTexture&&(k=t.TEXTURE_3D);let $=et(P,S),ie=S.source;n.bindTexture(k,P.__webglTexture,t.TEXTURE0+O);let re=i.get(ie);if(ie.version!==re.__version||$===!0){if(n.activeTexture(t.TEXTURE0+O),(typeof ImageBitmap<"u"&&S.image instanceof ImageBitmap)===!1){let Y=Et.getPrimaries(Et.workingColorSpace),ce=S.colorSpace===wi?null:Et.getPrimaries(S.colorSpace),pe=S.colorSpace===wi||Y===ce?t.NONE:t.BROWSER_DEFAULT_WEBGL;n.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,S.flipY),n.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),n.pixelStorei(t.UNPACK_COLORSPACE_CONVERSION_WEBGL,pe)}n.pixelStorei(t.UNPACK_ALIGNMENT,S.unpackAlignment);let Z=d(S.image,!1,r.maxTextureSize);Z=jt(S,Z);let oe=o.convert(S.format,S.colorSpace),be=o.convert(S.type),le=v(S.internalFormat,oe,be,S.normalized,S.colorSpace,S.isVideoTexture);ze(k,S);let ae,Ee=S.mipmaps,Ae=S.isVideoTexture!==!0,Re=re.__version===void 0||$===!0,U=ie.dataReady,se=M(S,Z);if(S.isDepthTexture)le=T(S.format===yi,S.type),Re&&(Ae?n.texStorage2D(t.TEXTURE_2D,1,le,Z.width,Z.height):n.texImage2D(t.TEXTURE_2D,0,le,Z.width,Z.height,0,oe,be,null));else if(S.isDataTexture)if(Ee.length>0){Ae&&Re&&n.texStorage2D(t.TEXTURE_2D,se,le,Ee[0].width,Ee[0].height);for(let Y=0,ce=Ee.length;Y<ce;Y++)ae=Ee[Y],Ae?U&&n.texSubImage2D(t.TEXTURE_2D,Y,0,0,ae.width,ae.height,oe,be,ae.data):n.texImage2D(t.TEXTURE_2D,Y,le,ae.width,ae.height,0,oe,be,ae.data);S.generateMipmaps=!1}else Ae?(Re&&n.texStorage2D(t.TEXTURE_2D,se,le,Z.width,Z.height),U&&Q(S,Z,oe,be)):n.texImage2D(t.TEXTURE_2D,0,le,Z.width,Z.height,0,oe,be,Z.data);else if(S.isCompressedTexture)if(S.isCompressedArrayTexture){Ae&&Re&&n.texStorage3D(t.TEXTURE_2D_ARRAY,se,le,Ee[0].width,Ee[0].height,Z.depth);for(let Y=0,ce=Ee.length;Y<ce;Y++)if(ae=Ee[Y],S.format!==Pe)if(oe!==null)if(Ae){if(U)if(S.layerUpdates.size>0){let pe=Fc(ae.width,ae.height,S.format,S.type);for(let J of S.layerUpdates){let ye=ae.data.subarray(J*pe/ae.data.BYTES_PER_ELEMENT,(J+1)*pe/ae.data.BYTES_PER_ELEMENT);n.compressedTexSubImage3D(t.TEXTURE_2D_ARRAY,Y,0,0,J,ae.width,ae.height,1,oe,ye)}}else n.compressedTexSubImage3D(t.TEXTURE_2D_ARRAY,Y,0,0,0,ae.width,ae.height,Z.depth,oe,ae.data)}else n.compressedTexImage3D(t.TEXTURE_2D_ARRAY,Y,le,ae.width,ae.height,Z.depth,0,ae.data,0,0);else it("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Ae?U&&n.texSubImage3D(t.TEXTURE_2D_ARRAY,Y,0,0,0,ae.width,ae.height,Z.depth,oe,be,ae.data):n.texImage3D(t.TEXTURE_2D_ARRAY,Y,le,ae.width,ae.height,Z.depth,0,oe,be,ae.data);S.layerUpdates.size>0&&S.clearLayerUpdates()}else{Ae&&Re&&n.texStorage2D(t.TEXTURE_2D,se,le,Ee[0].width,Ee[0].height);for(let Y=0,ce=Ee.length;Y<ce;Y++)ae=Ee[Y],S.format!==Pe?oe!==null?Ae?U&&n.compressedTexSubImage2D(t.TEXTURE_2D,Y,0,0,ae.width,ae.height,oe,ae.data):n.compressedTexImage2D(t.TEXTURE_2D,Y,le,ae.width,ae.height,0,ae.data):it("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ae?U&&n.texSubImage2D(t.TEXTURE_2D,Y,0,0,ae.width,ae.height,oe,be,ae.data):n.texImage2D(t.TEXTURE_2D,Y,le,ae.width,ae.height,0,oe,be,ae.data)}else if(S.isDataArrayTexture)if(Ae){if(Re&&n.texStorage3D(t.TEXTURE_2D_ARRAY,se,le,Z.width,Z.height,Z.depth),U)if(S.layerUpdates.size>0){let Y=Fc(Z.width,Z.height,S.format,S.type);for(let ce of S.layerUpdates){let pe=Z.data.subarray(ce*Y/Z.data.BYTES_PER_ELEMENT,(ce+1)*Y/Z.data.BYTES_PER_ELEMENT);n.texSubImage3D(t.TEXTURE_2D_ARRAY,0,0,0,ce,Z.width,Z.height,1,oe,be,pe)}S.clearLayerUpdates()}else n.texSubImage3D(t.TEXTURE_2D_ARRAY,0,0,0,0,Z.width,Z.height,Z.depth,oe,be,Z.data)}else n.texImage3D(t.TEXTURE_2D_ARRAY,0,le,Z.width,Z.height,Z.depth,0,oe,be,Z.data);else if(S.isData3DTexture)Ae?(Re&&n.texStorage3D(t.TEXTURE_3D,se,le,Z.width,Z.height,Z.depth),U&&n.texSubImage3D(t.TEXTURE_3D,0,0,0,0,Z.width,Z.height,Z.depth,oe,be,Z.data)):n.texImage3D(t.TEXTURE_3D,0,le,Z.width,Z.height,Z.depth,0,oe,be,Z.data);else if(S.isFramebufferTexture){if(Re)if(Ae)n.texStorage2D(t.TEXTURE_2D,se,le,Z.width,Z.height);else{let Y=Z.width,ce=Z.height;for(let pe=0;pe<se;pe++)n.texImage2D(t.TEXTURE_2D,pe,le,Y,ce,0,oe,be,null),Y>>=1,ce>>=1}}else if(S.isHTMLTexture){if("texElementImage2D"in t){let Y=t.canvas;if(Y.hasAttribute("layoutsubtree")||Y.setAttribute("layoutsubtree","true"),Z.parentNode!==Y){Y.appendChild(Z),u.add(S),Y.onpaint=ce=>{let pe=ce.changedElements;for(let J of u)pe.includes(J.image)&&(J.needsUpdate=!0)},Y.requestPaint();return}if(t.texElementImage2D.length===3)t.texElementImage2D(t.TEXTURE_2D,t.RGBA8,Z);else{let pe=t.RGBA,J=t.RGBA,ye=t.UNSIGNED_BYTE;t.texElementImage2D(t.TEXTURE_2D,0,pe,J,ye,Z)}t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.CLAMP_TO_EDGE)}}else if(Ee.length>0){if(Ae&&Re){let Y=at(Ee[0]);n.texStorage2D(t.TEXTURE_2D,se,le,Y.width,Y.height)}for(let Y=0,ce=Ee.length;Y<ce;Y++)ae=Ee[Y],Ae?U&&n.texSubImage2D(t.TEXTURE_2D,Y,0,0,oe,be,ae):n.texImage2D(t.TEXTURE_2D,Y,le,oe,be,ae);S.generateMipmaps=!1}else if(Ae){if(Re){let Y=at(Z);n.texStorage2D(t.TEXTURE_2D,se,le,Y.width,Y.height)}U&&n.texSubImage2D(t.TEXTURE_2D,0,0,0,oe,be,Z)}else n.texImage2D(t.TEXTURE_2D,0,le,oe,be,Z);m(S)&&_(k),re.__version=ie.version,S.onUpdate&&S.onUpdate(S)}P.__version=S.version}function Ce(P,S,O){if(S.image.length!==6)return;let k=et(P,S),$=S.source;n.bindTexture(t.TEXTURE_CUBE_MAP,P.__webglTexture,t.TEXTURE0+O);let ie=i.get($);if($.version!==ie.__version||k===!0){n.activeTexture(t.TEXTURE0+O);let re=Et.getPrimaries(Et.workingColorSpace),X=S.colorSpace===wi?null:Et.getPrimaries(S.colorSpace),Z=S.colorSpace===wi||re===X?t.NONE:t.BROWSER_DEFAULT_WEBGL;n.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,S.flipY),n.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),n.pixelStorei(t.UNPACK_ALIGNMENT,S.unpackAlignment),n.pixelStorei(t.UNPACK_COLORSPACE_CONVERSION_WEBGL,Z);let oe=S.isCompressedTexture||S.image[0].isCompressedTexture,be=S.image[0]&&S.image[0].isDataTexture,le=[];for(let J=0;J<6;J++)!oe&&!be?le[J]=d(S.image[J],!0,r.maxCubemapSize):le[J]=be?S.image[J].image:S.image[J],le[J]=jt(S,le[J]);let ae=le[0],Ee=o.convert(S.format,S.colorSpace),Ae=o.convert(S.type),Re=v(S.internalFormat,Ee,Ae,S.normalized,S.colorSpace),U=S.isVideoTexture!==!0,se=ie.__version===void 0||k===!0,Y=$.dataReady,ce=M(S,ae);ze(t.TEXTURE_CUBE_MAP,S);let pe;if(oe){U&&se&&n.texStorage2D(t.TEXTURE_CUBE_MAP,ce,Re,ae.width,ae.height);for(let J=0;J<6;J++){pe=le[J].mipmaps;for(let ye=0;ye<pe.length;ye++){let Se=pe[ye];S.format!==Pe?Ee!==null?U?Y&&n.compressedTexSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+J,ye,0,0,Se.width,Se.height,Ee,Se.data):n.compressedTexImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+J,ye,Re,Se.width,Se.height,0,Se.data):it("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):U?Y&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+J,ye,0,0,Se.width,Se.height,Ee,Ae,Se.data):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+J,ye,Re,Se.width,Se.height,0,Ee,Ae,Se.data)}}}else{if(pe=S.mipmaps,U&&se){pe.length>0&&ce++;let J=at(le[0]);n.texStorage2D(t.TEXTURE_CUBE_MAP,ce,Re,J.width,J.height)}for(let J=0;J<6;J++)if(be){U?Y&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,0,0,le[J].width,le[J].height,Ee,Ae,le[J].data):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,Re,le[J].width,le[J].height,0,Ee,Ae,le[J].data);for(let ye=0;ye<pe.length;ye++){let _t=pe[ye].image[J].image;U?Y&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+J,ye+1,0,0,_t.width,_t.height,Ee,Ae,_t.data):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+J,ye+1,Re,_t.width,_t.height,0,Ee,Ae,_t.data)}}else{U?Y&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,0,0,Ee,Ae,le[J]):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,Re,Ee,Ae,le[J]);for(let ye=0;ye<pe.length;ye++){let Se=pe[ye];U?Y&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+J,ye+1,0,0,Ee,Ae,Se.image[J]):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+J,ye+1,Re,Ee,Ae,Se.image[J])}}}m(S)&&_(t.TEXTURE_CUBE_MAP),ie.__version=$.version,S.onUpdate&&S.onUpdate(S)}P.__version=S.version}function ge(P,S,O,k,$,ie){let re=o.convert(O.format,O.colorSpace),X=o.convert(O.type),Z=v(O.internalFormat,re,X,O.normalized,O.colorSpace),oe=i.get(S),be=i.get(O);if(be.__renderTarget=S,!oe.__hasExternalTextures){let le=Math.max(1,S.width>>ie),ae=Math.max(1,S.height>>ie);$===t.TEXTURE_3D||$===t.TEXTURE_2D_ARRAY?n.texImage3D($,ie,Z,le,ae,S.depth,0,re,X,null):n.texImage2D($,ie,Z,le,ae,0,re,X,null)}n.bindFramebuffer(t.FRAMEBUFFER,P),Nt(S)?c.framebufferTexture2DMultisampleEXT(t.FRAMEBUFFER,k,$,be.__webglTexture,0,yt(S)):($===t.TEXTURE_2D||$>=t.TEXTURE_CUBE_MAP_POSITIVE_X&&$<=t.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&t.framebufferTexture2D(t.FRAMEBUFFER,k,$,be.__webglTexture,ie),n.bindFramebuffer(t.FRAMEBUFFER,null)}function Ue(P,S,O){if(t.bindRenderbuffer(t.RENDERBUFFER,P),S.depthBuffer){let k=S.depthTexture,$=k&&k.isDepthTexture?k.type:null,ie=T(S.stencilBuffer,$),re=S.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT;Nt(S)?c.renderbufferStorageMultisampleEXT(t.RENDERBUFFER,yt(S),ie,S.width,S.height):O?t.renderbufferStorageMultisample(t.RENDERBUFFER,yt(S),ie,S.width,S.height):t.renderbufferStorage(t.RENDERBUFFER,ie,S.width,S.height),t.framebufferRenderbuffer(t.FRAMEBUFFER,re,t.RENDERBUFFER,P)}else{let k=S.textures;for(let $=0;$<k.length;$++){let ie=k[$],re=o.convert(ie.format,ie.colorSpace),X=o.convert(ie.type),Z=v(ie.internalFormat,re,X,ie.normalized,ie.colorSpace);Nt(S)?c.renderbufferStorageMultisampleEXT(t.RENDERBUFFER,yt(S),Z,S.width,S.height):O?t.renderbufferStorageMultisample(t.RENDERBUFFER,yt(S),Z,S.width,S.height):t.renderbufferStorage(t.RENDERBUFFER,Z,S.width,S.height)}}t.bindRenderbuffer(t.RENDERBUFFER,null)}function Bt(P,S,O){let k=S.isWebGLCubeRenderTarget===!0;if(n.bindFramebuffer(t.FRAMEBUFFER,P),!(S.depthTexture&&S.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");let $=i.get(S.depthTexture);if($.__renderTarget=S,(!$.__webglTexture||S.depthTexture.image.width!==S.width||S.depthTexture.image.height!==S.height)&&(S.depthTexture.image.width=S.width,S.depthTexture.image.height=S.height,S.depthTexture.needsUpdate=!0),k){if($.__webglInit===void 0&&($.__webglInit=!0,S.depthTexture.addEventListener("dispose",R)),$.__webglTexture===void 0){$.__webglTexture=t.createTexture(),n.bindTexture(t.TEXTURE_CUBE_MAP,$.__webglTexture),ze(t.TEXTURE_CUBE_MAP,S.depthTexture);let oe=o.convert(S.depthTexture.format),be=o.convert(S.depthTexture.type),le;S.depthTexture.format===Ei?le=t.DEPTH_COMPONENT24:S.depthTexture.format===yi&&(le=t.DEPTH24_STENCIL8);for(let ae=0;ae<6;ae++)t.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+ae,0,le,S.width,S.height,0,oe,be,null)}}else ne(S.depthTexture,0);let ie=$.__webglTexture,re=yt(S),X=k?t.TEXTURE_CUBE_MAP_POSITIVE_X+O:t.TEXTURE_2D,Z=S.depthTexture.format===yi?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT;if(S.depthTexture.format===Ei)Nt(S)?c.framebufferTexture2DMultisampleEXT(t.FRAMEBUFFER,Z,X,ie,0,re):t.framebufferTexture2D(t.FRAMEBUFFER,Z,X,ie,0);else if(S.depthTexture.format===yi)Nt(S)?c.framebufferTexture2DMultisampleEXT(t.FRAMEBUFFER,Z,X,ie,0,re):t.framebufferTexture2D(t.FRAMEBUFFER,Z,X,ie,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function Oe(P){let S=i.get(P),O=P.isWebGLCubeRenderTarget===!0;if(S.__boundDepthTexture!==P.depthTexture){let k=P.depthTexture;if(S.__depthDisposeCallback&&S.__depthDisposeCallback(),k){let $=()=>{delete S.__boundDepthTexture,delete S.__depthDisposeCallback,k.removeEventListener("dispose",$)};k.addEventListener("dispose",$),S.__depthDisposeCallback=$}S.__boundDepthTexture=k}if(P.depthTexture&&!S.__autoAllocateDepthBuffer)if(O)for(let k=0;k<6;k++)Bt(S.__webglFramebuffer[k],P,k);else{let k=P.texture.mipmaps;k&&k.length>0?Bt(S.__webglFramebuffer[0],P,0):Bt(S.__webglFramebuffer,P,0)}else if(O){S.__webglDepthbuffer=[];for(let k=0;k<6;k++)if(n.bindFramebuffer(t.FRAMEBUFFER,S.__webglFramebuffer[k]),S.__webglDepthbuffer[k]===void 0)S.__webglDepthbuffer[k]=t.createRenderbuffer(),Ue(S.__webglDepthbuffer[k],P,!1);else{let $=P.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT,ie=S.__webglDepthbuffer[k];t.bindRenderbuffer(t.RENDERBUFFER,ie),t.framebufferRenderbuffer(t.FRAMEBUFFER,$,t.RENDERBUFFER,ie)}}else{let k=P.texture.mipmaps;if(k&&k.length>0?n.bindFramebuffer(t.FRAMEBUFFER,S.__webglFramebuffer[0]):n.bindFramebuffer(t.FRAMEBUFFER,S.__webglFramebuffer),S.__webglDepthbuffer===void 0)S.__webglDepthbuffer=t.createRenderbuffer(),Ue(S.__webglDepthbuffer,P,!1);else{let $=P.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT,ie=S.__webglDepthbuffer;t.bindRenderbuffer(t.RENDERBUFFER,ie),t.framebufferRenderbuffer(t.FRAMEBUFFER,$,t.RENDERBUFFER,ie)}}n.bindFramebuffer(t.FRAMEBUFFER,null)}function Ke(P,S,O){let k=i.get(P);S!==void 0&&ge(k.__webglFramebuffer,P,P.texture,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,0),O!==void 0&&Oe(P)}function gt(P){let S=P.texture,O=i.get(P),k=i.get(S);P.addEventListener("dispose",x);let $=P.textures,ie=P.isWebGLCubeRenderTarget===!0,re=$.length>1;if(re||(k.__webglTexture===void 0&&(k.__webglTexture=t.createTexture()),k.__version=S.version,a.memory.textures++),ie){O.__webglFramebuffer=[];for(let X=0;X<6;X++)if(S.mipmaps&&S.mipmaps.length>0){O.__webglFramebuffer[X]=[];for(let Z=0;Z<S.mipmaps.length;Z++)O.__webglFramebuffer[X][Z]=t.createFramebuffer()}else O.__webglFramebuffer[X]=t.createFramebuffer()}else{if(S.mipmaps&&S.mipmaps.length>0){O.__webglFramebuffer=[];for(let X=0;X<S.mipmaps.length;X++)O.__webglFramebuffer[X]=t.createFramebuffer()}else O.__webglFramebuffer=t.createFramebuffer();if(re)for(let X=0,Z=$.length;X<Z;X++){let oe=i.get($[X]);oe.__webglTexture===void 0&&(oe.__webglTexture=t.createTexture(),a.memory.textures++)}if(P.samples>0&&Nt(P)===!1){O.__webglMultisampledFramebuffer=t.createFramebuffer(),O.__webglColorRenderbuffer=[],n.bindFramebuffer(t.FRAMEBUFFER,O.__webglMultisampledFramebuffer);for(let X=0;X<$.length;X++){let Z=$[X];O.__webglColorRenderbuffer[X]=t.createRenderbuffer(),t.bindRenderbuffer(t.RENDERBUFFER,O.__webglColorRenderbuffer[X]);let oe=o.convert(Z.format,Z.colorSpace),be=o.convert(Z.type),le=v(Z.internalFormat,oe,be,Z.normalized,Z.colorSpace,P.isXRRenderTarget===!0),ae=yt(P);t.renderbufferStorageMultisample(t.RENDERBUFFER,ae,le,P.width,P.height),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0+X,t.RENDERBUFFER,O.__webglColorRenderbuffer[X])}t.bindRenderbuffer(t.RENDERBUFFER,null),P.depthBuffer&&(O.__webglDepthRenderbuffer=t.createRenderbuffer(),Ue(O.__webglDepthRenderbuffer,P,!0)),n.bindFramebuffer(t.FRAMEBUFFER,null)}}if(ie){n.bindTexture(t.TEXTURE_CUBE_MAP,k.__webglTexture),ze(t.TEXTURE_CUBE_MAP,S);for(let X=0;X<6;X++)if(S.mipmaps&&S.mipmaps.length>0)for(let Z=0;Z<S.mipmaps.length;Z++)ge(O.__webglFramebuffer[X][Z],P,S,t.COLOR_ATTACHMENT0,t.TEXTURE_CUBE_MAP_POSITIVE_X+X,Z);else ge(O.__webglFramebuffer[X],P,S,t.COLOR_ATTACHMENT0,t.TEXTURE_CUBE_MAP_POSITIVE_X+X,0);m(S)&&_(t.TEXTURE_CUBE_MAP),n.unbindTexture()}else if(re){for(let X=0,Z=$.length;X<Z;X++){let oe=$[X],be=i.get(oe),le=t.TEXTURE_2D;(P.isWebGL3DRenderTarget||P.isWebGLArrayRenderTarget)&&(le=P.isWebGL3DRenderTarget?t.TEXTURE_3D:t.TEXTURE_2D_ARRAY),n.bindTexture(le,be.__webglTexture),ze(le,oe),ge(O.__webglFramebuffer,P,oe,t.COLOR_ATTACHMENT0+X,le,0),m(oe)&&_(le)}n.unbindTexture()}else{let X=t.TEXTURE_2D;if((P.isWebGL3DRenderTarget||P.isWebGLArrayRenderTarget)&&(X=P.isWebGL3DRenderTarget?t.TEXTURE_3D:t.TEXTURE_2D_ARRAY),n.bindTexture(X,k.__webglTexture),ze(X,S),S.mipmaps&&S.mipmaps.length>0)for(let Z=0;Z<S.mipmaps.length;Z++)ge(O.__webglFramebuffer[Z],P,S,t.COLOR_ATTACHMENT0,X,Z);else ge(O.__webglFramebuffer,P,S,t.COLOR_ATTACHMENT0,X,0);m(S)&&_(X),n.unbindTexture()}P.depthBuffer&&Oe(P)}function ke(P){let S=P.textures;for(let O=0,k=S.length;O<k;O++){let $=S[O];if(m($)){let ie=E(P),re=i.get($).__webglTexture;n.bindTexture(ie,re),_(ie),n.unbindTexture()}}}let bt=[],Wt=[];function fn(P){if(P.samples>0){if(Nt(P)===!1){let S=P.textures,O=P.width,k=P.height,$=t.COLOR_BUFFER_BIT,ie=P.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT,re=i.get(P),X=S.length>1;if(X)for(let oe=0;oe<S.length;oe++)n.bindFramebuffer(t.FRAMEBUFFER,re.__webglMultisampledFramebuffer),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0+oe,t.RENDERBUFFER,null),n.bindFramebuffer(t.FRAMEBUFFER,re.__webglFramebuffer),t.framebufferTexture2D(t.DRAW_FRAMEBUFFER,t.COLOR_ATTACHMENT0+oe,t.TEXTURE_2D,null,0);n.bindFramebuffer(t.READ_FRAMEBUFFER,re.__webglMultisampledFramebuffer);let Z=P.texture.mipmaps;Z&&Z.length>0?n.bindFramebuffer(t.DRAW_FRAMEBUFFER,re.__webglFramebuffer[0]):n.bindFramebuffer(t.DRAW_FRAMEBUFFER,re.__webglFramebuffer);for(let oe=0;oe<S.length;oe++){if(P.resolveDepthBuffer&&(P.depthBuffer&&($|=t.DEPTH_BUFFER_BIT),P.stencilBuffer&&P.resolveStencilBuffer&&($|=t.STENCIL_BUFFER_BIT)),X){t.framebufferRenderbuffer(t.READ_FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.RENDERBUFFER,re.__webglColorRenderbuffer[oe]);let be=i.get(S[oe]).__webglTexture;t.framebufferTexture2D(t.DRAW_FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,be,0)}t.blitFramebuffer(0,0,O,k,0,0,O,k,$,t.NEAREST),l===!0&&(bt.length=0,Wt.length=0,bt.push(t.COLOR_ATTACHMENT0+oe),P.depthBuffer&&P.storeMultisampledDepthBuffer===!1&&(bt.push(ie),Wt.push(ie),t.invalidateFramebuffer(t.DRAW_FRAMEBUFFER,Wt)),t.invalidateFramebuffer(t.READ_FRAMEBUFFER,bt))}if(n.bindFramebuffer(t.READ_FRAMEBUFFER,null),n.bindFramebuffer(t.DRAW_FRAMEBUFFER,null),X)for(let oe=0;oe<S.length;oe++){n.bindFramebuffer(t.FRAMEBUFFER,re.__webglMultisampledFramebuffer),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0+oe,t.RENDERBUFFER,re.__webglColorRenderbuffer[oe]);let be=i.get(S[oe]).__webglTexture;n.bindFramebuffer(t.FRAMEBUFFER,re.__webglFramebuffer),t.framebufferTexture2D(t.DRAW_FRAMEBUFFER,t.COLOR_ATTACHMENT0+oe,t.TEXTURE_2D,be,0)}n.bindFramebuffer(t.DRAW_FRAMEBUFFER,re.__webglMultisampledFramebuffer)}else if(P.depthBuffer&&P.storeMultisampledDepthBuffer===!1&&l){let S=P.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT;t.invalidateFramebuffer(t.DRAW_FRAMEBUFFER,[S])}}}function yt(P){return Math.min(r.maxSamples,P.samples)}function Nt(P){let S=i.get(P);return P.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&S.__useRenderToTexture!==!1}function F(P){let S=a.render.frame;p.get(P)!==S&&(p.set(P,S),P.update())}function jt(P,S){let O=P.colorSpace,k=P.format,$=P.type;return P.isCompressedTexture===!0||P.isVideoTexture===!0||O!==xc&&O!==wi&&(Et.getTransfer(O)===ft?(k!==Pe||$!==Jt)&&it("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):xt("WebGLTextures: Unsupported texture color space:",O)),S}function at(P){return typeof HTMLImageElement<"u"&&P instanceof HTMLImageElement?(f.width=P.naturalWidth||P.width,f.height=P.naturalHeight||P.height):typeof VideoFrame<"u"&&P instanceof VideoFrame?(f.width=P.displayWidth,f.height=P.displayHeight):(f.width=P.width,f.height=P.height),f}this.allocateTextureUnit=z,this.resetTextureUnits=L,this.getTextureUnits=I,this.setTextureUnits=B,this.setTexture2D=ne,this.setTexture2DArray=K,this.setTexture3D=ee,this.setTextureCube=te,this.rebindTextures=Ke,this.setupRenderTarget=gt,this.updateRenderTargetMipmap=ke,this.updateMultisampleRenderTarget=fn,this.setupDepthRenderbuffer=Oe,this.setupFrameBufferTexture=ge,this.useMultisampledRTT=Nt,this.isReversedDepthBuffer=function(){return n.buffers.depth.getReversed()}}function Gx(t,e){function n(i,r=wi){let o,a=Et.getTransfer(r);if(i===Jt)return t.UNSIGNED_BYTE;if(i===Hs)return t.UNSIGNED_SHORT_4_4_4_4;if(i===ks)return t.UNSIGNED_SHORT_5_5_5_1;if(i===Tf)return t.UNSIGNED_INT_5_9_9_9_REV;if(i===bf)return t.UNSIGNED_INT_10F_11F_11F_REV;if(i===Hr)return t.BYTE;if(i===Do)return t.SHORT;if(i===Ti)return t.UNSIGNED_SHORT;if(i===bi)return t.INT;if(i===on)return t.UNSIGNED_INT;if(i===Be)return t.FLOAT;if(i===Mt)return t.HALF_FLOAT;if(i===Ef)return t.ALPHA;if(i===yf)return t.RGB;if(i===Pe)return t.RGBA;if(i===Ei)return t.DEPTH_COMPONENT;if(i===yi)return t.DEPTH_STENCIL;if(i===qn)return t.RED;if(i===kr)return t.RED_INTEGER;if(i===In)return t.RG;if(i===Mi)return t.RG_INTEGER;if(i===Ai)return t.RGBA_INTEGER;if(i===Lo||i===No||i===Uo||i===Fo)if(a===ft)if(o=e.get("WEBGL_compressed_texture_s3tc_srgb"),o!==null){if(i===Lo)return o.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===No)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===Uo)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===Fo)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(o=e.get("WEBGL_compressed_texture_s3tc"),o!==null){if(i===Lo)return o.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===No)return o.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===Uo)return o.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===Fo)return o.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===Vs||i===zs||i===Ws||i===$s)if(o=e.get("WEBGL_compressed_texture_pvrtc"),o!==null){if(i===Vs)return o.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===zs)return o.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===Ws)return o.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===$s)return o.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===Xs||i===qs||i===Ys||i===Ks||i===Zs||i===Bo||i===js)if(o=e.get("WEBGL_compressed_texture_etc"),o!==null){if(i===Xs||i===qs)return a===ft?o.COMPRESSED_SRGB8_ETC2:o.COMPRESSED_RGB8_ETC2;if(i===Ys)return a===ft?o.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:o.COMPRESSED_RGBA8_ETC2_EAC;if(i===Ks)return o.COMPRESSED_R11_EAC;if(i===Zs)return o.COMPRESSED_SIGNED_R11_EAC;if(i===Bo)return o.COMPRESSED_RG11_EAC;if(i===js)return o.COMPRESSED_SIGNED_RG11_EAC}else return null;if(i===Qs||i===Js||i===ec||i===tc||i===nc||i===ic||i===rc||i===oc||i===ac||i===sc||i===cc||i===lc||i===uc||i===fc)if(o=e.get("WEBGL_compressed_texture_astc"),o!==null){if(i===Qs)return a===ft?o.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:o.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===Js)return a===ft?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:o.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===ec)return a===ft?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:o.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===tc)return a===ft?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:o.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===nc)return a===ft?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:o.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===ic)return a===ft?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:o.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===rc)return a===ft?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:o.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===oc)return a===ft?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:o.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===ac)return a===ft?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:o.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===sc)return a===ft?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:o.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===cc)return a===ft?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:o.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===lc)return a===ft?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:o.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===uc)return a===ft?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:o.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===fc)return a===ft?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:o.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===dc||i===pc||i===hc)if(o=e.get("EXT_texture_compression_bptc"),o!==null){if(i===dc)return a===ft?o.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:o.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===pc)return o.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===hc)return o.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===mc||i===gc||i===Oo||i===_c)if(o=e.get("EXT_texture_compression_rgtc"),o!==null){if(i===mc)return o.COMPRESSED_RED_RGTC1_EXT;if(i===gc)return o.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===Oo)return o.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===_c)return o.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===Ki?t.UNSIGNED_INT_24_8:t[i]!==void 0?t[i]:null}return{convert:n}}var Hx=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,kx=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,Zc=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,n){if(this.texture===null){let i=new Ic(e.texture);(e.depthNear!==n.depthNear||e.depthFar!==n.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){let n=e.cameras[0].viewport,i=new qt({vertexShader:Hx,fragmentShader:kx,uniforms:{depthColor:{value:this.texture},depthWidth:{value:n.z},depthHeight:{value:n.w}}});this.mesh=new hn(new Dc(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},jc=class extends Of{constructor(e,n){super();let i=this,r=null,o=1,a=null,c="local-floor",l=1,f=null,p=null,u=null,s=null,h=null,g=null,b=typeof XRWebGLBinding<"u",d=new Zc,m={},_=n.getContextAttributes(),E=null,v=null,T=[],M=[],R=new Ne,x=null,A=null,w=new Yn;w.viewport=new At;let D=new Yn;D.viewport=new At;let C=[w,D],L=new jf,I=null,B=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(q){let Q=T[q];return Q===void 0&&(Q=new ko,T[q]=Q),Q.getTargetRaySpace()},this.getControllerGrip=function(q){let Q=T[q];return Q===void 0&&(Q=new ko,T[q]=Q),Q.getGripSpace()},this.getHand=function(q){let Q=T[q];return Q===void 0&&(Q=new ko,T[q]=Q),Q.getHandSpace()};function z(q){let Q=M.indexOf(q.inputSource);if(Q===-1)return;let xe=T[Q];xe!==void 0&&(xe.update(q.inputSource,q.frame,f||a),xe.dispatchEvent({type:q.type,data:q.inputSource}))}function W(){r.removeEventListener("select",z),r.removeEventListener("selectstart",z),r.removeEventListener("selectend",z),r.removeEventListener("squeeze",z),r.removeEventListener("squeezestart",z),r.removeEventListener("squeezeend",z),r.removeEventListener("end",W),r.removeEventListener("inputsourceschange",ne);for(let q=0;q<T.length;q++){let Q=M[q];Q!==null&&(M[q]=null,T[q].disconnect(Q))}I=null,B=null,d.reset();for(let q in m)delete m[q];if(e.setRenderTarget(E),h=null,s=null,u=null,r=null,v=null,et.stop(),i.isPresenting=!1,e.setPixelRatio(x),e.setSize(R.width,R.height,!1),A!==null){let q=A.camera;q.fov=A.fov,q.zoom=A.zoom,q.updateProjectionMatrix(),A=null}i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(q){o=q,i.isPresenting===!0&&it("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(q){c=q,i.isPresenting===!0&&it("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return f||a},this.setReferenceSpace=function(q){f=q},this.getBaseLayer=function(){return s!==null?s:h},this.getBinding=function(){return u===null&&b&&(u=new XRWebGLBinding(r,n)),u},this.getFrame=function(){return g},this.getSession=function(){return r},this.setSession=async function(q){if(r=q,r!==null){if(E=e.getRenderTarget(),r.addEventListener("select",z),r.addEventListener("selectstart",z),r.addEventListener("selectend",z),r.addEventListener("squeeze",z),r.addEventListener("squeezestart",z),r.addEventListener("squeezeend",z),r.addEventListener("end",W),r.addEventListener("inputsourceschange",ne),_.xrCompatible!==!0&&await n.makeXRCompatible(),x=e.getPixelRatio(),e.getSize(R),b&&"createProjectionLayer"in XRWebGLBinding.prototype){let xe=null,Ce=null,ge=null;_.depth&&(ge=_.stencil?n.DEPTH24_STENCIL8:n.DEPTH_COMPONENT24,xe=_.stencil?yi:Ei,Ce=_.stencil?Ki:on);let Ue={colorFormat:n.RGBA8,depthFormat:ge,scaleFactor:o};u=this.getBinding(),s=u.createProjectionLayer(Ue),r.updateRenderState({layers:[s]}),e.setPixelRatio(1),e.setSize(s.textureWidth,s.textureHeight,!1),v=new Dt(s.textureWidth,s.textureHeight,{format:Pe,type:Jt,depthTexture:new zr(s.textureWidth,s.textureHeight,Ce,void 0,void 0,void 0,void 0,void 0,void 0,xe),stencilBuffer:_.stencil,colorSpace:e.outputColorSpace,samples:_.antialias?4:0,resolveDepthBuffer:s.ignoreDepthValues===!1,resolveStencilBuffer:s.ignoreDepthValues===!1,storeMultisampledDepthBuffer:s.ignoreDepthValues===!1,storeMultisampledStencilBuffer:s.ignoreDepthValues===!1})}else{let xe={antialias:_.antialias,alpha:!0,depth:_.depth,stencil:_.stencil,framebufferScaleFactor:o};h=new XRWebGLLayer(r,n,xe),r.updateRenderState({baseLayer:h}),e.setPixelRatio(1),e.setSize(h.framebufferWidth,h.framebufferHeight,!1),v=new Dt(h.framebufferWidth,h.framebufferHeight,{format:Pe,type:Jt,colorSpace:e.outputColorSpace,stencilBuffer:_.stencil,resolveDepthBuffer:h.ignoreDepthValues===!1,resolveStencilBuffer:h.ignoreDepthValues===!1,storeMultisampledDepthBuffer:h.ignoreDepthValues===!1,storeMultisampledStencilBuffer:h.ignoreDepthValues===!1})}v.isXRRenderTarget=!0,this.setFoveation(l),f=null,a=await r.requestReferenceSpace(c),et.setContext(r),et.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return d.getDepthTexture()};function ne(q){for(let Q=0;Q<q.removed.length;Q++){let xe=q.removed[Q],Ce=M.indexOf(xe);Ce>=0&&(M[Ce]=null,T[Ce].disconnect(xe))}for(let Q=0;Q<q.added.length;Q++){let xe=q.added[Q],Ce=M.indexOf(xe);if(Ce===-1){for(let Ue=0;Ue<T.length;Ue++)if(Ue>=M.length){M.push(xe),Ce=Ue;break}else if(M[Ue]===null){M[Ue]=xe,Ce=Ue;break}if(Ce===-1)break}let ge=T[Ce];ge&&ge.connect(xe)}}let K=new j,ee=new j;function te(q,Q,xe){K.setFromMatrixPosition(Q.matrixWorld),ee.setFromMatrixPosition(xe.matrixWorld);let Ce=K.distanceTo(ee),ge=Q.projectionMatrix.elements,Ue=xe.projectionMatrix.elements,Bt=ge[14]/(ge[10]-1),Oe=ge[14]/(ge[10]+1),Ke=(ge[9]+1)/ge[5],gt=(ge[9]-1)/ge[5],ke=(ge[8]-1)/ge[0],bt=(Ue[8]+1)/Ue[0],Wt=Bt*ke,fn=Bt*bt,yt=Ce/(-ke+bt),Nt=yt*-ke;if(Q.matrixWorld.decompose(q.position,q.quaternion,q.scale),q.translateX(Nt),q.translateZ(yt),q.matrixWorld.compose(q.position,q.quaternion,q.scale),q.matrixWorldInverse.copy(q.matrixWorld).invert(),ge[10]===-1)q.projectionMatrix.copy(Q.projectionMatrix),q.projectionMatrixInverse.copy(Q.projectionMatrixInverse);else{let F=Bt+yt,jt=Oe+yt,at=Wt-Nt,P=fn+(Ce-Nt),S=Ke*Oe/jt*F,O=gt*Oe/jt*F;q.projectionMatrix.makePerspective(at,P,S,O,F,jt),q.projectionMatrixInverse.copy(q.projectionMatrix).invert()}}function we(q,Q){Q===null?q.matrixWorld.copy(q.matrix):q.matrixWorld.multiplyMatrices(Q.matrixWorld,q.matrix),q.matrixWorldInverse.copy(q.matrixWorld).invert()}this.updateCamera=function(q){if(r===null)return;let Q=q.near,xe=q.far;d.texture!==null&&(d.depthNear>0&&(Q=d.depthNear),d.depthFar>0&&(xe=d.depthFar)),L.near=D.near=w.near=Q,L.far=D.far=w.far=xe,(I!==L.near||B!==L.far)&&(r.updateRenderState({depthNear:L.near,depthFar:L.far}),I=L.near,B=L.far),L.layers.mask=q.layers.mask|6,w.layers.mask=L.layers.mask&-5,D.layers.mask=L.layers.mask&-3;let Ce=q.parent,ge=L.cameras;we(L,Ce);for(let Ue=0;Ue<ge.length;Ue++)we(ge[Ue],Ce);ge.length===2?te(L,w,D):L.projectionMatrix.copy(w.projectionMatrix),A===null&&q.isPerspectiveCamera&&(A={camera:q,fov:q.fov,zoom:q.zoom}),Me(q,L,Ce)};function Me(q,Q,xe){xe===null?q.matrix.copy(Q.matrixWorld):(q.matrix.copy(xe.matrixWorld),q.matrix.invert(),q.matrix.multiply(Q.matrixWorld)),q.matrix.decompose(q.position,q.quaternion,q.scale),q.updateMatrixWorld(!0),q.projectionMatrix.copy(Q.projectionMatrix),q.projectionMatrixInverse.copy(Q.projectionMatrixInverse),q.isPerspectiveCamera&&(q.fov=Gf*2*Math.atan(1/q.projectionMatrix.elements[5]),q.zoom=1)}this.getCamera=function(){return L},this.getFoveation=function(){if(!(s===null&&h===null))return l},this.setFoveation=function(q){l=q,s!==null&&(s.fixedFoveation=q),h!==null&&h.fixedFoveation!==void 0&&(h.fixedFoveation=q)},this.hasDepthSensing=function(){return d.texture!==null},this.getDepthSensingMesh=function(){return d.getMesh(L)},this.getCameraTexture=function(q){return m[q]};let Pt=null;function ze(q,Q){if(p=Q.getViewerPose(f||a),g=Q,p!==null){let xe=p.views;h!==null&&(e.setRenderTargetFramebuffer(v,h.framebuffer),e.setRenderTarget(v));let Ce=!1;xe.length!==L.cameras.length&&(L.cameras.length=0,Ce=!0);for(let Oe=0;Oe<xe.length;Oe++){let Ke=xe[Oe],gt=null;if(h!==null)gt=h.getViewport(Ke);else{let bt=u.getViewSubImage(s,Ke);gt=bt.viewport,Oe===0&&(e.setRenderTargetTextures(v,bt.colorTexture,bt.depthStencilTexture),e.setRenderTarget(v))}let ke=C[Oe];ke===void 0&&(ke=new Yn,ke.layers.enable(Oe),ke.viewport=new At,C[Oe]=ke),ke.matrix.fromArray(Ke.transform.matrix),ke.matrix.decompose(ke.position,ke.quaternion,ke.scale),ke.projectionMatrix.fromArray(Ke.projectionMatrix),ke.projectionMatrixInverse.copy(ke.projectionMatrix).invert(),ke.viewport.set(gt.x,gt.y,gt.width,gt.height),Oe===0&&(L.matrix.copy(ke.matrix),L.matrix.decompose(L.position,L.quaternion,L.scale)),Ce===!0&&L.cameras.push(ke)}let ge=r.enabledFeatures;if(ge&&ge.includes("depth-sensing")&&r.depthUsage=="gpu-optimized"&&b){u=i.getBinding();let Oe=u.getDepthInformation(xe[0]);Oe&&Oe.isValid&&Oe.texture&&d.init(Oe,r.renderState)}if(ge&&ge.includes("camera-access")&&b){e.state.unbindTexture(),u=i.getBinding();for(let Oe=0;Oe<xe.length;Oe++){let Ke=xe[Oe].camera;if(Ke){let gt=m[Ke];gt||(gt=new Ic,m[Ke]=gt);let ke=u.getCameraImage(Ke);gt.sourceTexture=ke}}}}for(let xe=0;xe<T.length;xe++){let Ce=M[xe],ge=T[xe];Ce!==null&&ge!==void 0&&ge.update(Ce,Q,f||a)}Pt&&Pt(q,Q),Q.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:Q}),g=null}let et=new xd;et.setAnimationLoop(ze),this.setAnimationLoop=function(q){Pt=q},this.dispose=function(){}}},Vx=new $e,Md=new He;Md.set(-1,0,0,0,1,0,0,0,1);function zx(t,e){function n(d,m){d.matrixAutoUpdate===!0&&d.updateMatrix(),m.value.copy(d.matrix)}function i(d,m){m.color.getRGB(d.fogColor.value,Lc(t)),m.isFog?(d.fogNear.value=m.near,d.fogFar.value=m.far):m.isFogExp2&&(d.fogDensity.value=m.density)}function r(d,m,_,E,v){m.isNodeMaterial?m.uniformsNeedUpdate=!1:m.isMeshBasicMaterial?o(d,m):m.isMeshLambertMaterial?(o(d,m),m.envMap&&(d.envMapIntensity.value=m.envMapIntensity)):m.isMeshToonMaterial?(o(d,m),u(d,m)):m.isMeshPhongMaterial?(o(d,m),p(d,m),m.envMap&&(d.envMapIntensity.value=m.envMapIntensity)):m.isMeshStandardMaterial?(o(d,m),s(d,m),m.isMeshPhysicalMaterial&&h(d,m,v)):m.isMeshMatcapMaterial?(o(d,m),g(d,m)):m.isMeshDepthMaterial?o(d,m):m.isMeshDistanceMaterial?(o(d,m),b(d,m)):m.isMeshNormalMaterial?o(d,m):m.isLineBasicMaterial?(a(d,m),m.isLineDashedMaterial&&c(d,m)):m.isPointsMaterial?l(d,m,_,E):m.isSpriteMaterial?f(d,m):m.isShadowMaterial?(d.color.value.copy(m.color),d.opacity.value=m.opacity):m.isShaderMaterial&&(m.uniformsNeedUpdate=!1)}function o(d,m){d.opacity.value=m.opacity,m.color&&d.diffuse.value.copy(m.color),m.emissive&&d.emissive.value.copy(m.emissive).multiplyScalar(m.emissiveIntensity),m.map&&(d.map.value=m.map,n(m.map,d.mapTransform)),m.alphaMap&&(d.alphaMap.value=m.alphaMap,n(m.alphaMap,d.alphaMapTransform)),m.bumpMap&&(d.bumpMap.value=m.bumpMap,n(m.bumpMap,d.bumpMapTransform),d.bumpScale.value=m.bumpScale,m.side===$t&&(d.bumpScale.value*=-1)),m.normalMap&&(d.normalMap.value=m.normalMap,n(m.normalMap,d.normalMapTransform),d.normalScale.value.copy(m.normalScale),m.side===$t&&d.normalScale.value.negate()),m.displacementMap&&(d.displacementMap.value=m.displacementMap,n(m.displacementMap,d.displacementMapTransform),d.displacementScale.value=m.displacementScale,d.displacementBias.value=m.displacementBias),m.emissiveMap&&(d.emissiveMap.value=m.emissiveMap,n(m.emissiveMap,d.emissiveMapTransform)),m.specularMap&&(d.specularMap.value=m.specularMap,n(m.specularMap,d.specularMapTransform)),m.alphaTest>0&&(d.alphaTest.value=m.alphaTest);let _=e.get(m),E=_.envMap,v=_.envMapRotation;E&&(d.envMap.value=E,d.envMapRotation.value.setFromMatrix4(Vx.makeRotationFromEuler(v)).transpose(),E.isCubeTexture&&E.isRenderTargetTexture===!1&&d.envMapRotation.value.premultiply(Md),d.reflectivity.value=m.reflectivity,d.ior.value=m.ior,d.refractionRatio.value=m.refractionRatio),m.lightMap&&(d.lightMap.value=m.lightMap,d.lightMapIntensity.value=m.lightMapIntensity,n(m.lightMap,d.lightMapTransform)),m.aoMap&&(d.aoMap.value=m.aoMap,d.aoMapIntensity.value=m.aoMapIntensity,n(m.aoMap,d.aoMapTransform))}function a(d,m){d.diffuse.value.copy(m.color),d.opacity.value=m.opacity,m.map&&(d.map.value=m.map,n(m.map,d.mapTransform))}function c(d,m){d.dashSize.value=m.dashSize,d.totalSize.value=m.dashSize+m.gapSize,d.scale.value=m.scale}function l(d,m,_,E){d.diffuse.value.copy(m.color),d.opacity.value=m.opacity,d.size.value=m.size*_,d.scale.value=E*.5,m.map&&(d.map.value=m.map,n(m.map,d.uvTransform)),m.alphaMap&&(d.alphaMap.value=m.alphaMap,n(m.alphaMap,d.alphaMapTransform)),m.alphaTest>0&&(d.alphaTest.value=m.alphaTest)}function f(d,m){d.diffuse.value.copy(m.color),d.opacity.value=m.opacity,d.rotation.value=m.rotation,m.map&&(d.map.value=m.map,n(m.map,d.mapTransform)),m.alphaMap&&(d.alphaMap.value=m.alphaMap,n(m.alphaMap,d.alphaMapTransform)),m.alphaTest>0&&(d.alphaTest.value=m.alphaTest)}function p(d,m){d.specular.value.copy(m.specular),d.shininess.value=Math.max(m.shininess,1e-4)}function u(d,m){m.gradientMap&&(d.gradientMap.value=m.gradientMap)}function s(d,m){d.metalness.value=m.metalness,m.metalnessMap&&(d.metalnessMap.value=m.metalnessMap,n(m.metalnessMap,d.metalnessMapTransform)),d.roughness.value=m.roughness,m.roughnessMap&&(d.roughnessMap.value=m.roughnessMap,n(m.roughnessMap,d.roughnessMapTransform)),m.envMap&&(d.envMapIntensity.value=m.envMapIntensity)}function h(d,m,_){d.ior.value=m.ior,m.sheen>0&&(d.sheenColor.value.copy(m.sheenColor).multiplyScalar(m.sheen),d.sheenRoughness.value=m.sheenRoughness,m.sheenColorMap&&(d.sheenColorMap.value=m.sheenColorMap,n(m.sheenColorMap,d.sheenColorMapTransform)),m.sheenRoughnessMap&&(d.sheenRoughnessMap.value=m.sheenRoughnessMap,n(m.sheenRoughnessMap,d.sheenRoughnessMapTransform))),m.clearcoat>0&&(d.clearcoat.value=m.clearcoat,d.clearcoatRoughness.value=m.clearcoatRoughness,m.clearcoatMap&&(d.clearcoatMap.value=m.clearcoatMap,n(m.clearcoatMap,d.clearcoatMapTransform)),m.clearcoatRoughnessMap&&(d.clearcoatRoughnessMap.value=m.clearcoatRoughnessMap,n(m.clearcoatRoughnessMap,d.clearcoatRoughnessMapTransform)),m.clearcoatNormalMap&&(d.clearcoatNormalMap.value=m.clearcoatNormalMap,n(m.clearcoatNormalMap,d.clearcoatNormalMapTransform),d.clearcoatNormalScale.value.copy(m.clearcoatNormalScale),m.side===$t&&d.clearcoatNormalScale.value.negate())),m.dispersion>0&&(d.dispersion.value=m.dispersion),m.retroreflectivity>0&&(d.retroreflectivity.value=m.retroreflectivity),m.iridescence>0&&(d.iridescence.value=m.iridescence,d.iridescenceIOR.value=m.iridescenceIOR,d.iridescenceThicknessMinimum.value=m.iridescenceThicknessRange[0],d.iridescenceThicknessMaximum.value=m.iridescenceThicknessRange[1],m.iridescenceMap&&(d.iridescenceMap.value=m.iridescenceMap,n(m.iridescenceMap,d.iridescenceMapTransform)),m.iridescenceThicknessMap&&(d.iridescenceThicknessMap.value=m.iridescenceThicknessMap,n(m.iridescenceThicknessMap,d.iridescenceThicknessMapTransform))),m.transmission>0&&(d.transmission.value=m.transmission,d.transmissionSamplerMap.value=_.texture,d.transmissionSamplerSize.value.set(_.width,_.height),m.transmissionMap&&(d.transmissionMap.value=m.transmissionMap,n(m.transmissionMap,d.transmissionMapTransform)),d.thickness.value=m.thickness,m.thicknessMap&&(d.thicknessMap.value=m.thicknessMap,n(m.thicknessMap,d.thicknessMapTransform)),d.attenuationDistance.value=m.attenuationDistance,d.attenuationColor.value.copy(m.attenuationColor)),m.anisotropy>0&&(d.anisotropyVector.value.set(m.anisotropy*Math.cos(m.anisotropyRotation),m.anisotropy*Math.sin(m.anisotropyRotation)),m.anisotropyMap&&(d.anisotropyMap.value=m.anisotropyMap,n(m.anisotropyMap,d.anisotropyMapTransform))),d.specularIntensity.value=m.specularIntensity,d.specularColor.value.copy(m.specularColor),m.specularColorMap&&(d.specularColorMap.value=m.specularColorMap,n(m.specularColorMap,d.specularColorMapTransform)),m.specularIntensityMap&&(d.specularIntensityMap.value=m.specularIntensityMap,n(m.specularIntensityMap,d.specularIntensityMapTransform))}function g(d,m){m.matcap&&(d.matcap.value=m.matcap)}function b(d,m){let _=e.get(m).light;d.referencePosition.value.setFromMatrixPosition(_.matrixWorld),d.nearDistance.value=_.shadow.camera.near,d.farDistance.value=_.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:r}}function Wx(t,e,n,i){let r={},o={},a=[],c=t.getParameter(t.MAX_UNIFORM_BUFFER_BINDINGS);function l(v,T){let M=T.program;i.uniformBlockBinding(v,M)}function f(v,T){let M=r[v.id];M===void 0&&(d(v),M=p(v),r[v.id]=M,v.addEventListener("dispose",_));let R=T.program;i.updateUBOMapping(v,R);let x=e.render.frame;o[v.id]!==x&&(s(v),o[v.id]=x)}function p(v){let T=u();v.__bindingPointIndex=T;let M=t.createBuffer(),R=v.__size,x=v.usage;return t.bindBuffer(t.UNIFORM_BUFFER,M),t.bufferData(t.UNIFORM_BUFFER,R,x),t.bindBuffer(t.UNIFORM_BUFFER,null),t.bindBufferBase(t.UNIFORM_BUFFER,T,M),M}function u(){for(let v=0;v<c;v++)if(a.indexOf(v)===-1)return a.push(v),v;return xt("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function s(v){let T=r[v.id],M=v.uniforms,R=v.__cache;t.bindBuffer(t.UNIFORM_BUFFER,T);for(let x=0,A=M.length;x<A;x++){let w=M[x];if(Array.isArray(w))for(let D=0,C=w.length;D<C;D++)h(w[D],x,D,R);else h(w,x,0,R)}t.bindBuffer(t.UNIFORM_BUFFER,null)}function h(v,T,M,R){if(b(v,T,M,R)===!0){let x=v.__offset,A=v.value;if(Array.isArray(A)){let w=0;for(let D=0;D<A.length;D++){let C=A[D],L=m(C);g(C,v.__data,w),typeof C!="number"&&typeof C!="boolean"&&!C.isMatrix3&&!ArrayBuffer.isView(C)&&(w+=L.storage/Float32Array.BYTES_PER_ELEMENT)}}else g(A,v.__data,0);t.bufferSubData(t.UNIFORM_BUFFER,x,v.__data)}}function g(v,T,M){typeof v=="number"||typeof v=="boolean"?T[0]=v:v.isMatrix3?(T[0]=v.elements[0],T[1]=v.elements[1],T[2]=v.elements[2],T[3]=0,T[4]=v.elements[3],T[5]=v.elements[4],T[6]=v.elements[5],T[7]=0,T[8]=v.elements[6],T[9]=v.elements[7],T[10]=v.elements[8],T[11]=0):ArrayBuffer.isView(v)?T.set(new v.constructor(v.buffer,v.byteOffset,T.length)):v.toArray(T,M)}function b(v,T,M,R){let x=v.value,A=T+"_"+M;if(R[A]===void 0)return typeof x=="number"||typeof x=="boolean"?R[A]=x:ArrayBuffer.isView(x)?R[A]=x.slice():R[A]=x.clone(),!0;{let w=R[A];if(typeof x=="number"||typeof x=="boolean"){if(w!==x)return R[A]=x,!0}else{if(ArrayBuffer.isView(x))return!0;if(w.equals(x)===!1)return w.copy(x),!0}}return!1}function d(v){let T=v.uniforms,M=0,R=16;for(let A=0,w=T.length;A<w;A++){let D=Array.isArray(T[A])?T[A]:[T[A]];for(let C=0,L=D.length;C<L;C++){let I=D[C],B=Array.isArray(I.value)?I.value:[I.value];for(let z=0,W=B.length;z<W;z++){let ne=B[z],K=m(ne),ee=M%R,te=ee%K.boundary,we=ee+te;M+=te,we!==0&&R-we<K.storage&&(M+=R-we),I.__data=new Float32Array(K.storage/Float32Array.BYTES_PER_ELEMENT),I.__offset=M,M+=K.storage}}}let x=M%R;return x>0&&(M+=R-x),v.__size=M,v.__cache={},this}function m(v){let T={boundary:0,storage:0};return typeof v=="number"||typeof v=="boolean"?(T.boundary=4,T.storage=4):v.isVector2?(T.boundary=8,T.storage=8):v.isVector3||v.isColor?(T.boundary=16,T.storage=12):v.isVector4?(T.boundary=16,T.storage=16):v.isMatrix3?(T.boundary=48,T.storage=48):v.isMatrix4?(T.boundary=64,T.storage=64):v.isTexture?it("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(v)?(T.boundary=16,T.storage=v.byteLength):it("WebGLRenderer: Unsupported uniform value type.",v),T}function _(v){let T=v.target;T.removeEventListener("dispose",_);let M=a.indexOf(T.__bindingPointIndex);a.splice(M,1),t.deleteBuffer(r[T.id]),delete r[T.id],delete o[T.id]}function E(){for(let v in r)t.deleteBuffer(r[v]);a=[],r={},o={}}return{bind:l,update:f,dispose:E}}var $x=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),Hn=null;function Xx(){return Hn===null&&(Hn=new wt($x,16,16,In,Mt),Hn.name="DFG_LUT",Hn.minFilter=st,Hn.magFilter=st,Hn.wrapS=Kt,Hn.wrapT=Kt,Hn.generateMipmaps=!1,Hn.needsUpdate=!0),Hn}var Qc=class{constructor(e={}){let{canvas:n=Nf(),context:i=null,depth:r=!0,stencil:o=!1,alpha:a=!1,antialias:c=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:f=!1,powerPreference:p="default",failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:s=!1,outputBufferType:h=Jt}=e;this.isWebGLRenderer=!0;let g;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");g=i.getContextAttributes().alpha}else g=a;let b=h,d=new Set([Ai,Mi,kr]),m=new Set([Jt,on,Ti,Ki,Hs,ks]),_=new Uint32Array(4),E=new Int32Array(4),v=new j,T=null,M=null,R=[],x=[],A=null;this.domElement=n,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=_n,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let w=this,D=!1,C=null,L=null,I=null,B=null;this._outputColorSpace=Af;let z=0,W=0,ne=null,K=-1,ee=null,te=new At,we=new At,Me=null,Pt=new Xe(0),ze=0,et=n.width,q=n.height,Q=1,xe=null,Ce=null,ge=new At(0,0,et,q),Ue=new At(0,0,et,q),Bt=!1,Oe=new Pc,Ke=!1,gt=!1,ke=new $e,bt=new j,Wt=new At,fn={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},yt=!1;function Nt(){return ne===null?Q:1}let F=i;function jt(y,N){return n.getContext(y,N)}let at,P,S,O,k,$,ie,re,X,Z,oe,be,le,ae,Ee,Ae,Re,U,se,Y,ce,pe,J;try{let y={alpha:!0,depth:r,stencil:o,antialias:c,premultipliedAlpha:l,preserveDrawingBuffer:f,powerPreference:p,failIfMajorPerformanceCaveat:u};if("setAttribute"in n&&n.setAttribute("data-engine",`three.js r${Ur}`),n.addEventListener("webglcontextlost",_t,!1),n.addEventListener("webglcontextrestored",tt,!1),n.addEventListener("webglcontextcreationerror",Pn,!1),F===null){let N="webgl2";if(F=jt(N,y),F===null)throw jt(N)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}ye()}catch(y){throw n.removeEventListener("webglcontextlost",_t,!1),n.removeEventListener("webglcontextrestored",tt,!1),n.removeEventListener("webglcontextcreationerror",Pn,!1),xt("WebGLRenderer: "+y.message),y}function ye(){at=new Jv(F),at.init(),ce=new Gx(F,at),P=new zv(F,at,e,ce),S=new Bx(F,at),P.reversedDepthBuffer&&s&&S.buffers.depth.setReversed(!0),L=F.createFramebuffer(),I=F.createFramebuffer(),B=F.createFramebuffer(),O=new n0(F),k=new Ex,$=new Ox(F,at,S,k,P,ce,O),ie=new Qv(w),re=new rg(F),pe=new kv(F,re),X=new e0(F,re,O,pe),Z=new r0(F,X,re,pe,O),U=new i0(F,P,$),Ee=new Wv(k),oe=new bx(w,ie,at,P,pe,Ee),be=new zx(w,k),le=new Mx,ae=new Ix(at),Re=new Hv(w,ie,S,Z,g,l),Ae=new Fx(w,Z,P),J=new Wx(F,O,P,S),se=new Vv(F,at,O),Y=new t0(F,at,O),O.programs=oe.programs,w.capabilities=P,w.extensions=at,w.properties=k,w.renderLists=le,w.shadowMap=Ae,w.state=S,w.info=O}b!==Jt&&(A=new a0(b,n.width,n.height,c,r,o));let Se=new jc(w,F);this.xr=Se,this.getContext=function(){return F},this.getContextAttributes=function(){return F.getContextAttributes()},this.forceContextLoss=function(){let y=at.get("WEBGL_lose_context");y&&y.loseContext()},this.forceContextRestore=function(){let y=at.get("WEBGL_lose_context");y&&y.restoreContext()},this.getPixelRatio=function(){return Q},this.setPixelRatio=function(y){y!==void 0&&(Q=y,this.setSize(et,q,!1))},this.getSize=function(y){return y.set(et,q)},this.setSize=function(y,N,V=!0){if(Se.isPresenting){it("WebGLRenderer: Can't change size while VR device is presenting.");return}et=y,q=N,n.width=Math.floor(y*Q),n.height=Math.floor(N*Q),V===!0&&(n.style.width=y+"px",n.style.height=N+"px"),A!==null&&A.setSize(n.width,n.height),this.setViewport(0,0,y,N)},this.getDrawingBufferSize=function(y){return y.set(et*Q,q*Q).floor()},this.setDrawingBufferSize=function(y,N,V){et=y,q=N,Q=V,n.width=Math.floor(y*V),n.height=Math.floor(N*V),this.setViewport(0,0,y,N)},this.setEffects=function(y){if(b===Jt){xt("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(y){for(let N=0;N<y.length;N++)if(y[N].isOutputPass===!0){it("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}A.setEffects(y||[])},this.getCurrentViewport=function(y){return y.copy(te)},this.getViewport=function(y){return y.copy(ge)},this.setViewport=function(y,N,V,G){y.isVector4?ge.set(y.x,y.y,y.z,y.w):ge.set(y,N,V,G),S.viewport(te.copy(ge).multiplyScalar(Q).round())},this.getScissor=function(y){return y.copy(Ue)},this.setScissor=function(y,N,V,G){y.isVector4?Ue.set(y.x,y.y,y.z,y.w):Ue.set(y,N,V,G),S.scissor(we.copy(Ue).multiplyScalar(Q).round())},this.getScissorTest=function(){return Bt},this.setScissorTest=function(y){S.setScissorTest(Bt=y)},this.setOpaqueSort=function(y){xe=y},this.setTransparentSort=function(y){Ce=y},this.getClearColor=function(y){return y.copy(Re.getClearColor())},this.setClearColor=function(){Re.setClearColor(...arguments)},this.getClearAlpha=function(){return Re.getClearAlpha()},this.setClearAlpha=function(){Re.setClearAlpha(...arguments)},this.clear=function(y=!0,N=!0,V=!0){let G=0;if(y){let H=!1;if(ne!==null){let de=ne.texture.format;H=d.has(de)}if(H){let de=ne.texture.type,me=m.has(de),fe=Re.getClearColor(),_e=Re.getClearAlpha(),Te=fe.r,Ie=fe.g,Ge=fe.b;me?(_[0]=Te,_[1]=Ie,_[2]=Ge,_[3]=_e,F.clearBufferuiv(F.COLOR,0,_)):(E[0]=Te,E[1]=Ie,E[2]=Ge,E[3]=_e,F.clearBufferiv(F.COLOR,0,E))}else G|=F.COLOR_BUFFER_BIT}N&&(G|=F.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),V&&(G|=F.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),G!==0&&F.clear(G)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(y){y.setRenderer(this),C=y},this.dispose=function(){n.removeEventListener("webglcontextlost",_t,!1),n.removeEventListener("webglcontextrestored",tt,!1),n.removeEventListener("webglcontextcreationerror",Pn,!1),Re.dispose(),le.dispose(),ae.dispose(),k.dispose(),ie.dispose(),Z.dispose(),pe.dispose(),J.dispose(),oe.dispose(),Se.dispose(),Se.removeEventListener("sessionstart",Cu),Se.removeEventListener("sessionend",Iu),vi.stop()};function _t(y){y.preventDefault(),Ec("WebGLRenderer: Context Lost."),D=!0}function tt(){Ec("WebGLRenderer: Context Restored."),D=!1;let y=O.autoReset,N=Ae.enabled,V=Ae.autoUpdate,G=Ae.needsUpdate,H=Ae.type;ye(),O.autoReset=y,Ae.enabled=N,Ae.autoUpdate=V,Ae.needsUpdate=G,Ae.type=H}function Pn(y){xt("WebGLRenderer: A WebGL context could not be created. Reason: ",y.statusMessage)}function Bn(y){let N=y.target;N.removeEventListener("dispose",Bn),Zm(N)}function Zm(y){jm(y),k.remove(y)}function jm(y){let N=k.get(y).programs;N!==void 0&&(N.forEach(function(V){oe.releaseProgram(V)}),y.isShaderMaterial&&oe.releaseShaderCache(y))}this.renderBufferDirect=function(y,N,V,G,H,de){N===null&&(N=fn);let me=H.isMesh&&H.matrixWorld.determinantAffine()<0,fe=eg(y,N,V,G,H);S.setMaterial(G,me);let _e=V.index,Te=1;if(G.wireframe===!0){if(_e=X.getWireframeAttribute(V),_e===void 0)return;Te=2}let Ie=V.drawRange,Ge=V.attributes.position,ve=Ie.start*Te,nt=(Ie.start+Ie.count)*Te;de!==null&&(ve=Math.max(ve,de.start*Te),nt=Math.min(nt,(de.start+de.count)*Te)),_e!==null?(ve=Math.max(ve,0),nt=Math.min(nt,_e.count)):Ge!=null&&(ve=Math.max(ve,0),nt=Math.min(nt,Ge.count));let Ut=nt-ve;if(Ut<0||Ut===1/0)return;pe.setup(H,G,fe,V,_e);let St,ut=se;if(_e!==null&&(St=re.get(_e),ut=Y,ut.setIndex(St)),H.isMesh)G.wireframe===!0?(S.setLineWidth(G.wireframeLinewidth*Nt()),ut.setMode(F.LINES)):ut.setMode(F.TRIANGLES);else if(H.isLine){let Qt=G.linewidth;Qt===void 0&&(Qt=1),S.setLineWidth(Qt*Nt()),H.isLineSegments?ut.setMode(F.LINES):H.isLineLoop?ut.setMode(F.LINE_LOOP):ut.setMode(F.LINE_STRIP)}else H.isPoints?ut.setMode(F.POINTS):H.isSprite&&ut.setMode(F.TRIANGLES);if(H.isBatchedMesh)if(at.get("WEBGL_multi_draw"))ut.renderMultiDraw(H._multiDrawStarts,H._multiDrawCounts,H._multiDrawCount);else{let Qt=H._multiDrawStarts,he=H._multiDrawCounts,rn=H._multiDrawCount,qe=_e?re.get(_e).bytesPerElement:1,yn=k.get(G).currentProgram.getUniforms();for(let On=0;On<rn;On++)yn.setValue(F,"_gl_DrawID",On),ut.render(Qt[On]/qe,he[On])}else if(H.isInstancedMesh)ut.renderInstances(ve,Ut,H.count);else if(V.isInstancedBufferGeometry){let Qt=V._maxInstanceCount!==void 0?V._maxInstanceCount:1/0,he=Math.min(V.instanceCount,Qt);ut.renderInstances(ve,Ut,he)}else ut.render(ve,Ut)};function Pu(y,N,V,G){C!==null&&y.isNodeMaterial&&C.setObject(G,y),Ke===!0&&Ee.setState(y,V,!1),y.transparent===!0&&y.side===dn&&y.forceSinglePass===!1?(y.side=$t,y.needsUpdate=!0,Po(y,N,G),y.side=Cn,y.needsUpdate=!0,Po(y,N,G),y.side=dn):Po(y,N,G)}this.compile=function(y,N,V=null){V===null&&(V=y),C!==null&&C.renderStart(y,N,V),M=ae.get(V),M.init(N),x.push(M),V.traverseVisible(function(H){H.isLight&&H.layers.test(N.layers)&&(M.pushLight(H),H.castShadow&&M.pushShadow(H))}),y!==V&&y.traverseVisible(function(H){H.isLight&&H.layers.test(N.layers)&&(M.pushLight(H),H.castShadow&&M.pushShadow(H))}),M.setupLights(),C!==null&&C.updateLights(M.state.lightsArray),gt=this.localClippingEnabled,Ke=Ee.init(this.clippingPlanes,gt),Ke===!0&&Ee.setGlobalState(this.clippingPlanes,N),C!==null&&Ae.render(M.state.shadowsArray,V,N);let G=new Set;return y.traverse(function(H){if(!(H.isMesh||H.isPoints||H.isLine||H.isSprite))return;let de=H.material;if(de)if(Array.isArray(de))for(let me=0;me<de.length;me++){let fe=de[me];Pu(fe,V,N,H),G.add(fe)}else Pu(de,V,N,H),G.add(de)}),M=x.pop(),C!==null&&C.renderEnd(),G},this.compileAsync=function(y,N,V=null){let G=this.compile(y,N,V);return new Promise(H=>{function de(){if(G.forEach(function(me){let _e=k.get(me).currentProgram;(_e===void 0||_e.isReady())&&G.delete(me)}),G.size===0){H(y);return}setTimeout(de,10)}at.get("KHR_parallel_shader_compile")!==null?de():setTimeout(de,10)})};let As=null;function Qm(y){As&&As(y)}function Cu(){vi.stop()}function Iu(){vi.start()}let vi=new xd;vi.setAnimationLoop(Qm),typeof self<"u"&&vi.setContext(self),this.setAnimationLoop=function(y){As=y,Se.setAnimationLoop(y),y===null?vi.stop():vi.start()},Se.addEventListener("sessionstart",Cu),Se.addEventListener("sessionend",Iu),this.render=function(y,N){if(N!==void 0&&N.isCamera!==!0){xt("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(D===!0)return;C!==null&&C.renderStart(y,N);let V=Se.enabled===!0&&Se.isPresenting===!0,G=A!==null&&(ne===null||V)&&A.begin(w,ne);if(y.matrixWorldAutoUpdate===!0&&y.updateMatrixWorld(),N.parent===null&&N.matrixWorldAutoUpdate===!0&&N.updateMatrixWorld(),Se.enabled===!0&&Se.isPresenting===!0&&(A===null||A.isCompositing()===!1)&&(Se.cameraAutoUpdate===!0&&Se.updateCamera(N),N=Se.getCamera()),y.isScene===!0&&y.onBeforeRender(w,y,N,ne),M=ae.get(y,x.length),M.init(N),M.state.textureUnits=$.getTextureUnits(),x.push(M),ke.multiplyMatrices(N.projectionMatrix,N.matrixWorldInverse),Oe.setFromProjectionMatrix(ke,bc,N.reversedDepth),gt=this.localClippingEnabled,Ke=Ee.init(this.clippingPlanes,gt),T=le.get(y,R.length),T.init(),R.push(T),Se.enabled===!0&&Se.isPresenting===!0){let me=w.xr.getDepthSensingMesh();me!==null&&ws(me,N,-1/0,w.sortObjects)}ws(y,N,0,w.sortObjects),T.finish(),C!==null&&C.updateLights(M.state.lightsArray),w.sortObjects===!0&&T.sort(xe,Ce),yt=Se.enabled===!1||Se.isPresenting===!1||Se.hasDepthSensing()===!1,yt&&Re.addToRenderList(T,y),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),Ke===!0&&Ee.beginShadows();let H=M.state.shadowsArray;if(Ae.render(H,y,N),Ke===!0&&Ee.endShadows(),(G&&A.hasRenderPass())===!1){let me=T.opaque,fe=T.transmissive;if(M.setupLights(),N.isArrayCamera){let _e=N.cameras;if(fe.length>0)for(let Te=0,Ie=_e.length;Te<Ie;Te++){let Ge=_e[Te];Lu(me,fe,y,Ge)}yt&&Re.render(y);for(let Te=0,Ie=_e.length;Te<Ie;Te++){let Ge=_e[Te];Du(T,y,Ge,Ge.viewport)}}else fe.length>0&&Lu(me,fe,y,N),yt&&Re.render(y),Du(T,y,N)}ne!==null&&W===0&&($.updateMultisampleRenderTarget(ne),$.updateRenderTargetMipmap(ne)),G&&A.end(w),y.isScene===!0&&y.onAfterRender(w,y,N),pe.resetDefaultState(),K=-1,ee=null,x.pop(),x.length>0?(M=x[x.length-1],$.setTextureUnits(M.state.textureUnits),Ke===!0&&Ee.setGlobalState(w.clippingPlanes,M.state.camera)):M=null,R.pop(),R.length>0?T=R[R.length-1]:T=null,C!==null&&C.renderEnd()};function ws(y,N,V,G){if(y.visible===!1)return;if(y.layers.test(N.layers)){if(y.isGroup)V=y.renderOrder;else if(y.isLOD)y.autoUpdate===!0&&y.update(N);else if(y.isLightProbeGrid)M.pushLightProbeGrid(y);else if(y.isLight)M.pushLight(y),y.castShadow&&M.pushShadow(y);else if(y.isSprite){if(!y.frustumCulled||y.intersectsFrustum(Oe)){G&&Wt.setFromMatrixPosition(y.matrixWorld).applyMatrix4(ke);let me=Z.update(y),fe=y.material;fe.visible&&T.push(y,me,fe,V,Wt.z,null,N)}}else if((y.isMesh||y.isLine||y.isPoints)&&(!y.frustumCulled||y.intersectsFrustum(Oe))){let me=Z.update(y),fe=y.material;if(G&&(y.boundingSphere!==void 0?(y.boundingSphere===null&&y.computeBoundingSphere(),Wt.copy(y.boundingSphere.center)):(me.boundingSphere===null&&me.computeBoundingSphere(),Wt.copy(me.boundingSphere.center)),Wt.applyMatrix4(y.matrixWorld).applyMatrix4(ke)),Array.isArray(fe)){let _e=me.groups;for(let Te=0,Ie=_e.length;Te<Ie;Te++){let Ge=_e[Te],ve=fe[Ge.materialIndex];ve&&ve.visible&&T.push(y,me,ve,V,Wt.z,Ge,N)}}else fe.visible&&T.push(y,me,fe,V,Wt.z,null,N)}}let de=y.children;for(let me=0,fe=de.length;me<fe;me++)ws(de[me],N,V,G)}function Du(y,N,V,G){let{opaque:H,transmissive:de,transparent:me}=y;M.setupLightsView(V),Ke===!0&&Ee.setGlobalState(w.clippingPlanes,V),G&&S.viewport(te.copy(G)),H.length>0&&Ro(H,N,V),de.length>0&&Ro(de,N,V),me.length>0&&Ro(me,N,V),S.buffers.depth.setTest(!0),S.buffers.depth.setMask(!0),S.buffers.color.setMask(!0),S.setPolygonOffset(!1)}function Lu(y,N,V,G){if((V.isScene===!0?V.overrideMaterial:null)!==null)return;if(M.state.transmissionRenderTarget[G.id]===void 0){let ve=at.has("EXT_color_buffer_half_float")||at.has("EXT_color_buffer_float");M.state.transmissionRenderTarget[G.id]=new Dt(1,1,{generateMipmaps:!0,type:ve?Mt:Jt,minFilter:Si,samples:Math.max(4,P.samples),stencilBuffer:o,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:Et.workingColorSpace})}let de=M.state.transmissionRenderTarget[G.id],me=G.viewport||te;de.setSize(me.z*w.transmissionResolutionScale,me.w*w.transmissionResolutionScale);let fe=w.getRenderTarget(),_e=w.getActiveCubeFace(),Te=w.getActiveMipmapLevel();w.setRenderTarget(de),w.getClearColor(Pt),ze=w.getClearAlpha(),ze<1&&w.setClearColor(16777215,.5),w.clear(),yt&&Re.render(V);let Ie=w.toneMapping;w.toneMapping=_n;let Ge=G.viewport;if(G.viewport!==void 0&&(G.viewport=void 0),M.setupLightsView(G),Ke===!0&&Ee.setGlobalState(w.clippingPlanes,G),Ro(y,V,G),$.updateMultisampleRenderTarget(de),$.updateRenderTargetMipmap(de),at.has("WEBGL_multisampled_render_to_texture")===!1){let ve=!1;for(let nt=0,Ut=N.length;nt<Ut;nt++){let St=N[nt],{object:ut,geometry:Qt,material:he,group:rn}=St;if(he.side===dn&&ut.layers.test(G.layers)){let qe=he.side;he.side=$t,he.needsUpdate=!0,Nu(ut,V,G,Qt,he,rn),he.side=qe,he.needsUpdate=!0,ve=!0}}ve===!0&&($.updateMultisampleRenderTarget(de),$.updateRenderTargetMipmap(de))}w.setRenderTarget(fe,_e,Te),w.setClearColor(Pt,ze),Ge!==void 0&&(G.viewport=Ge),w.toneMapping=Ie}function Ro(y,N,V){let G=N.isScene===!0?N.overrideMaterial:null;for(let H=0,de=y.length;H<de;H++){let me=y[H],{object:fe,geometry:_e,group:Te}=me,Ie=me.material;Ie.allowOverride===!0&&G!==null&&(Ie=G),fe.layers.test(V.layers)&&Nu(fe,N,V,_e,Ie,Te)}}function Nu(y,N,V,G,H,de){C!==null&&H.isNodeMaterial&&C.setObject(y,H),y.onBeforeRender(w,N,V,G,H,de),y.modelViewMatrix.multiplyMatrices(V.matrixWorldInverse,y.matrixWorld),y.normalMatrix.getNormalMatrix(y.modelViewMatrix),H.onBeforeRender(w,N,V,G,y,de),H.transparent===!0&&H.side===dn&&H.forceSinglePass===!1?(H.side=$t,H.needsUpdate=!0,w.renderBufferDirect(V,N,G,H,y,de),H.side=Cn,H.needsUpdate=!0,w.renderBufferDirect(V,N,G,H,y,de),H.side=dn):w.renderBufferDirect(V,N,G,H,y,de),y.onAfterRender(w,N,V,G,H,de)}function Po(y,N,V){N.isScene!==!0&&(N=fn);let G=k.get(y),H=M.state.lights,de=M.state.shadowsArray,me=H.state.version,fe=oe.getParameters(y,H.state,de,N,V,M.state.lightProbeGridArray),_e=oe.getProgramCacheKey(fe),Te=G.programs;G.environment=y.isMeshStandardMaterial||y.isMeshLambertMaterial||y.isMeshPhongMaterial?N.environment:null,G.fog=N.fog;let Ie=y.isMeshStandardMaterial||y.isMeshLambertMaterial&&!y.envMap||y.isMeshPhongMaterial&&!y.envMap;G.envMap=ie.get(y.envMap||G.environment,Ie),G.envMapRotation=G.environment!==null&&y.envMap===null?N.environmentRotation:y.envMapRotation,Te===void 0&&(y.addEventListener("dispose",Bn),Te=new Map,G.programs=Te);let Ge=Te.get(_e);if(Ge!==void 0){if(G.currentProgram===Ge&&G.lightsStateVersion===me)return Fu(y,fe),Ge}else fe.uniforms=oe.getUniforms(y),C!==null&&y.isNodeMaterial&&C.build(y,V,fe),y.onBeforeCompile(fe,w),Ge=oe.acquireProgram(fe,_e),Te.set(_e,Ge),G.uniforms=fe.uniforms;let ve=G.uniforms;return(!y.isShaderMaterial&&!y.isRawShaderMaterial||y.clipping===!0)&&(ve.clippingPlanes=Ee.uniform),Fu(y,fe),G.needsLights=ng(y),G.lightsStateVersion=me,G.needsLights&&(ve.ambientLightColor.value=H.state.ambient,ve.lightProbe.value=H.state.probe,ve.sunLights.value=H.state.sun,ve.sunLightShadows.value=H.state.sunShadow,ve.directionalLights.value=H.state.directional,ve.directionalLightShadows.value=H.state.directionalShadow,ve.spotLights.value=H.state.spot,ve.spotLightShadows.value=H.state.spotShadow,ve.rectAreaLights.value=H.state.rectArea,ve.ltc_1.value=H.state.rectAreaLTC1,ve.ltc_2.value=H.state.rectAreaLTC2,ve.pointLights.value=H.state.point,ve.pointLightShadows.value=H.state.pointShadow,ve.hemisphereLights.value=H.state.hemi,ve.sunShadowMatrix.value=H.state.sunShadowMatrix,ve.sunShadowCascade.value=H.state.sunShadowCascade,ve.directionalShadowMatrix.value=H.state.directionalShadowMatrix,ve.spotLightMatrix.value=H.state.spotLightMatrix,ve.spotLightMap.value=H.state.spotLightMap,ve.pointShadowMatrix.value=H.state.pointShadowMatrix),G.lightProbeGrid=M.state.lightProbeGridArray.length>0,G.currentProgram=Ge,G.uniformsList=null,Ge}function Uu(y){if(y.uniformsList===null){let N=y.currentProgram.getUniforms();y.uniformsList=er.seqWithValue(N.seq,y.uniforms)}return y.uniformsList}function Fu(y,N){let V=k.get(y);V.outputColorSpace=N.outputColorSpace,V.batching=N.batching,V.batchingColor=N.batchingColor,V.instancing=N.instancing,V.instancingColor=N.instancingColor,V.instancingMorph=N.instancingMorph,V.skinning=N.skinning,V.morphTargets=N.morphTargets,V.morphNormals=N.morphNormals,V.morphColors=N.morphColors,V.morphTargetsCount=N.morphTargetsCount,V.numClippingPlanes=N.numClippingPlanes,V.numIntersection=N.numClipIntersection,V.vertexAlphas=N.vertexAlphas,V.vertexTangents=N.vertexTangents,V.toneMapping=N.toneMapping}function Jm(y,N){if(y.length===0)return null;if(y.length===1)return y[0].texture!==null?y[0]:null;v.setFromMatrixPosition(N.matrixWorld);for(let V=0,G=y.length;V<G;V++){let H=y[V];if(H.texture!==null&&H.boundingBox.containsPoint(v))return H}return null}function eg(y,N,V,G,H){N.isScene!==!0&&(N=fn),$.resetTextureUnits();let de=N.fog,me=G.isMeshStandardMaterial||G.isMeshLambertMaterial||G.isMeshPhongMaterial?N.environment:null,fe=ne===null?w.outputColorSpace:ne.isXRRenderTarget===!0?ne.texture.colorSpace:Et.workingColorSpace,_e=G.isMeshStandardMaterial||G.isMeshLambertMaterial&&!G.envMap||G.isMeshPhongMaterial&&!G.envMap,Te=ie.get(G.envMap||me,_e),Ie=G.vertexColors===!0&&!!V.attributes.color&&V.attributes.color.itemSize===4,Ge=!!V.attributes.tangent&&(!!G.normalMap||G.anisotropy>0),ve=!!V.morphAttributes.position,nt=!!V.morphAttributes.normal,Ut=!!V.morphAttributes.color,St=_n;G.toneMapped&&(ne===null||ne.isXRRenderTarget===!0)&&(St=w.toneMapping);let ut=V.morphAttributes.position||V.morphAttributes.normal||V.morphAttributes.color,Qt=ut!==void 0?ut.length:0,he=k.get(G),rn=M.state.lights;if(Ke===!0&&(gt===!0||y!==ee)){let vt=y===ee&&G.id===K;Ee.setState(G,y,vt)}let qe=!1;G.version===he.__version?(he.needsLights&&he.lightsStateVersion!==rn.state.version||he.outputColorSpace!==fe||H.isBatchedMesh&&he.batching===!1||!H.isBatchedMesh&&he.batching===!0||H.isBatchedMesh&&he.batchingColor===!0&&H._colorsTexture===null||H.isBatchedMesh&&he.batchingColor===!1&&H._colorsTexture!==null||H.isInstancedMesh&&he.instancing===!1||!H.isInstancedMesh&&he.instancing===!0||H.isSkinnedMesh&&he.skinning===!1||!H.isSkinnedMesh&&he.skinning===!0||H.isInstancedMesh&&he.instancingColor===!0&&H.instanceColor===null||H.isInstancedMesh&&he.instancingColor===!1&&H.instanceColor!==null||H.isInstancedMesh&&he.instancingMorph===!0&&H.morphTexture===null||H.isInstancedMesh&&he.instancingMorph===!1&&H.morphTexture!==null||he.envMap!==Te||G.fog===!0&&he.fog!==de||he.numClippingPlanes!==void 0&&(he.numClippingPlanes!==Ee.numPlanes||he.numIntersection!==Ee.numIntersection)||he.vertexAlphas!==Ie||he.vertexTangents!==Ge||he.morphTargets!==ve||he.morphNormals!==nt||he.morphColors!==Ut||he.toneMapping!==St||he.morphTargetsCount!==Qt||!!he.lightProbeGrid!=M.state.lightProbeGridArray.length>0)&&(qe=!0):(qe=!0,he.__version=G.version);let yn=he.currentProgram;qe===!0&&(yn=Po(G,N,H),C&&G.isNodeMaterial&&C.onUpdateProgram(G,yn,he));let On=!1,Jn=!1,Wi=!1,lt=yn.getUniforms(),It=he.uniforms;if(S.useProgram(yn.program)&&(On=!0,Jn=!0,Wi=!0),G.id!==K&&(K=G.id,Jn=!0),he.needsLights){let vt=Jm(M.state.lightProbeGridArray,H);he.lightProbeGrid!==vt&&(he.lightProbeGrid=vt,Jn=!0)}if(On||ee!==y){S.buffers.depth.getReversed()&&y.reversedDepth!==!0&&(y._reversedDepth=!0,y.updateProjectionMatrix()),lt.setValue(F,"projectionMatrix",y.projectionMatrix),lt.setValue(F,"viewMatrix",y.matrixWorldInverse);let ti=lt.map.cameraPosition;ti!==void 0&&ti.setValue(F,bt.setFromMatrixPosition(y.matrixWorld)),P.logarithmicDepthBuffer&&lt.setValue(F,"logDepthBufFC",2/(Math.log(y.far+1)/Math.LN2)),(G.isMeshPhongMaterial||G.isMeshToonMaterial||G.isMeshLambertMaterial||G.isMeshBasicMaterial||G.isMeshStandardMaterial||G.isShaderMaterial)&&lt.setValue(F,"isOrthographic",y.isOrthographicCamera===!0),ee!==y&&(ee=y,Jn=!0,Wi=!0)}if(he.needsLights&&(rn.state.sunShadowMap.length>0&&lt.setValue(F,"sunShadowMap",rn.state.sunShadowMap,$),rn.state.directionalShadowMap.length>0&&lt.setValue(F,"directionalShadowMap",rn.state.directionalShadowMap,$),rn.state.spotShadowMap.length>0&&lt.setValue(F,"spotShadowMap",rn.state.spotShadowMap,$),rn.state.pointShadowMap.length>0&&lt.setValue(F,"pointShadowMap",rn.state.pointShadowMap,$)),H.isSkinnedMesh){lt.setOptional(F,H,"bindMatrix"),lt.setOptional(F,H,"bindMatrixInverse");let vt=H.skeleton;vt&&(vt.boneTexture===null&&vt.computeBoneTexture(),lt.setValue(F,"boneTexture",vt.boneTexture,$))}H.isBatchedMesh&&(lt.setOptional(F,H,"batchingTexture"),lt.setValue(F,"batchingTexture",H._matricesTexture,$),lt.setOptional(F,H,"batchingIdTexture"),lt.setValue(F,"batchingIdTexture",H._indirectTexture,$),lt.setOptional(F,H,"batchingColorTexture"),H._colorsTexture!==null&&lt.setValue(F,"batchingColorTexture",H._colorsTexture,$));let ei=V.morphAttributes;if((ei.position!==void 0||ei.normal!==void 0||ei.color!==void 0)&&U.update(H,V,yn),(Jn||he.receiveShadow!==H.receiveShadow)&&(he.receiveShadow=H.receiveShadow,lt.setValue(F,"receiveShadow",H.receiveShadow)),(G.isMeshStandardMaterial||G.isMeshLambertMaterial||G.isMeshPhongMaterial)&&G.envMap===null&&N.environment!==null&&(It.envMapIntensity.value=N.environmentIntensity),It.dfgLUT!==void 0&&(It.dfgLUT.value=Xx()),Jn){if(lt.setValue(F,"toneMappingExposure",w.toneMappingExposure),he.needsLights&&tg(It,Wi),de&&G.fog===!0&&be.refreshFogUniforms(It,de),be.refreshMaterialUniforms(It,G,Q,q,M.state.transmissionRenderTarget[y.id]),he.needsLights&&he.lightProbeGrid){let vt=he.lightProbeGrid;It.probesSH.value=vt.texture,It.probesMin.value.copy(vt.boundingBox.min),It.probesMax.value.copy(vt.boundingBox.max),It.probesResolution.value.copy(vt.resolution)}er.upload(F,Uu(he),It,$)}if(G.isShaderMaterial&&G.uniformsNeedUpdate===!0&&(er.upload(F,Uu(he),It,$),G.uniformsNeedUpdate=!1),G.isSpriteMaterial&&lt.setValue(F,"center",H.center),lt.setValue(F,"modelViewMatrix",H.modelViewMatrix),lt.setValue(F,"normalMatrix",H.normalMatrix),lt.setValue(F,"modelMatrix",H.matrixWorld),G.uniformsGroups!==void 0){let vt=G.uniformsGroups;for(let ti=0,$i=vt.length;ti<$i;ti++){let Ou=vt[ti];J.update(Ou,yn),J.bind(Ou,yn)}}return yn}function tg(y,N){y.ambientLightColor.needsUpdate=N,y.lightProbe.needsUpdate=N,y.sunLights.needsUpdate=N,y.sunLightShadows.needsUpdate=N,y.directionalLights.needsUpdate=N,y.directionalLightShadows.needsUpdate=N,y.pointLights.needsUpdate=N,y.pointLightShadows.needsUpdate=N,y.spotLights.needsUpdate=N,y.spotLightShadows.needsUpdate=N,y.rectAreaLights.needsUpdate=N,y.hemisphereLights.needsUpdate=N}function ng(y){return y.isMeshLambertMaterial||y.isMeshToonMaterial||y.isMeshPhongMaterial||y.isMeshStandardMaterial||y.isShadowMaterial||y.isShaderMaterial&&y.lights===!0}this.getActiveCubeFace=function(){return z},this.getActiveMipmapLevel=function(){return W},this.getRenderTarget=function(){return ne},this.setRenderTargetTextures=function(y,N,V){let G=k.get(y);G.__autoAllocateDepthBuffer=y.resolveDepthBuffer===!1,G.__autoAllocateDepthBuffer===!1&&(G.__useRenderToTexture=!1),k.get(y.texture).__webglTexture=N,k.get(y.depthTexture).__webglTexture=G.__autoAllocateDepthBuffer?void 0:V,G.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(y,N){let V=k.get(y);V.__webglFramebuffer=N,V.__useDefaultFramebuffer=N===void 0},this.setRenderTarget=function(y,N=0,V=0){ne=y,z=N,W=V;let G=null,H=!1,de=!1;if(y){let fe=k.get(y);if(fe.__useDefaultFramebuffer!==void 0){S.bindFramebuffer(F.FRAMEBUFFER,fe.__webglFramebuffer),te.copy(y.viewport),we.copy(y.scissor),Me=y.scissorTest,S.viewport(te),S.scissor(we),S.setScissorTest(Me),K=-1;return}else if(fe.__webglFramebuffer===void 0)$.setupRenderTarget(y);else if(fe.__hasExternalTextures)$.rebindTextures(y,k.get(y.texture).__webglTexture,k.get(y.depthTexture).__webglTexture);else if(y.depthBuffer){let Ie=y.depthTexture;if(fe.__boundDepthTexture!==Ie){if(Ie!==null&&k.has(Ie)&&(y.width!==Ie.image.width||y.height!==Ie.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");$.setupDepthRenderbuffer(y)}}let _e=y.texture;(_e.isData3DTexture||_e.isDataArrayTexture||_e.isCompressedArrayTexture)&&(de=!0);let Te=k.get(y).__webglFramebuffer;y.isWebGLCubeRenderTarget?(Array.isArray(Te[N])?G=Te[N][V]:G=Te[N],H=!0):y.samples>0&&$.useMultisampledRTT(y)===!1?G=k.get(y).__webglMultisampledFramebuffer:Array.isArray(Te)?G=Te[V]:G=Te,te.copy(y.viewport),we.copy(y.scissor),Me=y.scissorTest}else te.copy(ge).multiplyScalar(Q).floor(),we.copy(Ue).multiplyScalar(Q).floor(),Me=Bt;if(V!==0&&(G=L),S.bindFramebuffer(F.FRAMEBUFFER,G)&&S.drawBuffers(y,G),S.viewport(te),S.scissor(we),S.setScissorTest(Me),H){let fe=k.get(y.texture);F.framebufferTexture2D(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_CUBE_MAP_POSITIVE_X+N,fe.__webglTexture,V)}else if(de){let fe=N;for(let _e=0;_e<y.textures.length;_e++){let Te=k.get(y.textures[_e]);F.framebufferTextureLayer(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0+_e,Te.__webglTexture,V,fe)}}else if(y!==null&&V!==0){let fe=k.get(y.texture);F.framebufferTexture2D(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_2D,fe.__webglTexture,V)}K=-1};function Bu(y){let N=k.get(y);return(N.__readFormat!==y.format||N.__readType!==y.type)&&(N.__readFormat=y.format,N.__readType=y.type,N.__formatReadable=P.textureFormatReadable(y.format),N.__typeReadable=P.textureTypeReadable(y.type)),N}this.readRenderTargetPixels=function(y,N,V,G,H,de,me,fe=0){if(!(y&&y.isWebGLRenderTarget)){xt("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let _e=k.get(y).__webglFramebuffer;if(y.isWebGLCubeRenderTarget&&me!==void 0&&(_e=_e[me]),_e){S.bindFramebuffer(F.FRAMEBUFFER,_e);try{let Te=y.textures[fe],Ie=Te.format,Ge=Te.type;y.textures.length>1&&F.readBuffer(F.COLOR_ATTACHMENT0+fe);let ve=Bu(Te);if(ve.__formatReadable===!1){xt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(ve.__typeReadable===!1){xt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}N>=0&&N<=y.width-G&&V>=0&&V<=y.height-H&&F.readPixels(N,V,G,H,ce.convert(Ie),ce.convert(Ge),de)}finally{let Te=ne!==null?k.get(ne).__webglFramebuffer:null;S.bindFramebuffer(F.FRAMEBUFFER,Te)}}},this.readRenderTargetPixelsAsync=async function(y,N,V,G,H,de,me,fe=0){if(!(y&&y.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let _e=k.get(y).__webglFramebuffer;if(y.isWebGLCubeRenderTarget&&me!==void 0&&(_e=_e[me]),_e)if(N>=0&&N<=y.width-G&&V>=0&&V<=y.height-H){S.bindFramebuffer(F.FRAMEBUFFER,_e);let Te=y.textures[fe],Ie=Te.format,Ge=Te.type;y.textures.length>1&&F.readBuffer(F.COLOR_ATTACHMENT0+fe);let ve=Bu(Te);if(ve.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(ve.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let nt=F.createBuffer();F.bindBuffer(F.PIXEL_PACK_BUFFER,nt),F.bufferData(F.PIXEL_PACK_BUFFER,de.byteLength,F.STREAM_READ),F.readPixels(N,V,G,H,ce.convert(Ie),ce.convert(Ge),0),F.bindBuffer(F.PIXEL_PACK_BUFFER,null);let Ut=ne!==null?k.get(ne).__webglFramebuffer:null;S.bindFramebuffer(F.FRAMEBUFFER,Ut);let St=F.fenceSync(F.SYNC_GPU_COMMANDS_COMPLETE,0);return F.flush(),await Ff(F,St,4),F.bindBuffer(F.PIXEL_PACK_BUFFER,nt),F.getBufferSubData(F.PIXEL_PACK_BUFFER,0,de),F.bindBuffer(F.PIXEL_PACK_BUFFER,null),F.deleteBuffer(nt),F.deleteSync(St),de}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(y,N=null,V=0){let G=Math.pow(2,-V),H=Math.floor(y.image.width*G),de=Math.floor(y.image.height*G),me=N!==null?N.x:0,fe=N!==null?N.y:0;$.setTexture2D(y,0),F.copyTexSubImage2D(F.TEXTURE_2D,V,0,0,me,fe,H,de),S.unbindTexture()},this.copyTextureToTexture=function(y,N,V=null,G=null,H=0,de=0){let me,fe,_e,Te,Ie,Ge,ve,nt,Ut,St=y.isCompressedTexture?y.mipmaps[de]:y.image;if(V!==null)me=V.max.x-V.min.x,fe=V.max.y-V.min.y,_e=V.isBox3?V.max.z-V.min.z:1,Te=V.min.x,Ie=V.min.y,Ge=V.isBox3?V.min.z:0;else{let It=Math.pow(2,-H);me=Math.floor(St.width*It),fe=Math.floor(St.height*It),y.isDataArrayTexture?_e=St.depth:y.isData3DTexture?_e=Math.floor(St.depth*It):_e=1,Te=0,Ie=0,Ge=0}G!==null?(ve=G.x,nt=G.y,Ut=G.z):(ve=0,nt=0,Ut=0);let ut=ce.convert(N.format),Qt=ce.convert(N.type),he;N.isData3DTexture?($.setTexture3D(N,0),he=F.TEXTURE_3D):N.isDataArrayTexture||N.isCompressedArrayTexture?($.setTexture2DArray(N,0),he=F.TEXTURE_2D_ARRAY):($.setTexture2D(N,0),he=F.TEXTURE_2D),S.activeTexture(F.TEXTURE0),S.pixelStorei(F.UNPACK_FLIP_Y_WEBGL,N.flipY),S.pixelStorei(F.UNPACK_PREMULTIPLY_ALPHA_WEBGL,N.premultiplyAlpha),S.pixelStorei(F.UNPACK_ALIGNMENT,N.unpackAlignment);let rn=S.getParameter(F.UNPACK_ROW_LENGTH),qe=S.getParameter(F.UNPACK_IMAGE_HEIGHT),yn=S.getParameter(F.UNPACK_SKIP_PIXELS),On=S.getParameter(F.UNPACK_SKIP_ROWS),Jn=S.getParameter(F.UNPACK_SKIP_IMAGES);S.pixelStorei(F.UNPACK_ROW_LENGTH,St.width),S.pixelStorei(F.UNPACK_IMAGE_HEIGHT,St.height),S.pixelStorei(F.UNPACK_SKIP_PIXELS,Te),S.pixelStorei(F.UNPACK_SKIP_ROWS,Ie),S.pixelStorei(F.UNPACK_SKIP_IMAGES,Ge);let Wi=y.isDataArrayTexture||y.isData3DTexture,lt=N.isDataArrayTexture||N.isData3DTexture;if(y.isDepthTexture){let It=k.get(y),ei=k.get(N),vt=k.get(It.__renderTarget),ti=k.get(ei.__renderTarget);S.bindFramebuffer(F.READ_FRAMEBUFFER,vt.__webglFramebuffer),S.bindFramebuffer(F.DRAW_FRAMEBUFFER,ti.__webglFramebuffer);for(let $i=0;$i<_e;$i++)Wi&&(F.framebufferTextureLayer(F.READ_FRAMEBUFFER,F.COLOR_ATTACHMENT0,k.get(y).__webglTexture,H,Ge+$i),F.framebufferTextureLayer(F.DRAW_FRAMEBUFFER,F.COLOR_ATTACHMENT0,k.get(N).__webglTexture,de,Ut+$i)),F.blitFramebuffer(Te,Ie,me,fe,ve,nt,me,fe,F.DEPTH_BUFFER_BIT,F.NEAREST);S.bindFramebuffer(F.READ_FRAMEBUFFER,null),S.bindFramebuffer(F.DRAW_FRAMEBUFFER,null)}else if(H!==0||y.isRenderTargetTexture||k.has(y)){let It=k.get(y),ei=k.get(N);S.bindFramebuffer(F.READ_FRAMEBUFFER,I),S.bindFramebuffer(F.DRAW_FRAMEBUFFER,B);for(let vt=0;vt<_e;vt++)Wi?F.framebufferTextureLayer(F.READ_FRAMEBUFFER,F.COLOR_ATTACHMENT0,It.__webglTexture,H,Ge+vt):F.framebufferTexture2D(F.READ_FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_2D,It.__webglTexture,H),lt?F.framebufferTextureLayer(F.DRAW_FRAMEBUFFER,F.COLOR_ATTACHMENT0,ei.__webglTexture,de,Ut+vt):F.framebufferTexture2D(F.DRAW_FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_2D,ei.__webglTexture,de),H!==0?F.blitFramebuffer(Te,Ie,me,fe,ve,nt,me,fe,F.COLOR_BUFFER_BIT,F.NEAREST):lt?F.copyTexSubImage3D(he,de,ve,nt,Ut+vt,Te,Ie,me,fe):F.copyTexSubImage2D(he,de,ve,nt,Te,Ie,me,fe);S.bindFramebuffer(F.READ_FRAMEBUFFER,null),S.bindFramebuffer(F.DRAW_FRAMEBUFFER,null)}else lt?y.isDataTexture||y.isData3DTexture?F.texSubImage3D(he,de,ve,nt,Ut,me,fe,_e,ut,Qt,St.data):N.isCompressedArrayTexture?F.compressedTexSubImage3D(he,de,ve,nt,Ut,me,fe,_e,ut,St.data):F.texSubImage3D(he,de,ve,nt,Ut,me,fe,_e,ut,Qt,St):y.isDataTexture?F.texSubImage2D(F.TEXTURE_2D,de,ve,nt,me,fe,ut,Qt,St.data):y.isCompressedTexture?F.compressedTexSubImage2D(F.TEXTURE_2D,de,ve,nt,St.width,St.height,ut,St.data):F.texSubImage2D(F.TEXTURE_2D,de,ve,nt,me,fe,ut,Qt,St);S.pixelStorei(F.UNPACK_ROW_LENGTH,rn),S.pixelStorei(F.UNPACK_IMAGE_HEIGHT,qe),S.pixelStorei(F.UNPACK_SKIP_PIXELS,yn),S.pixelStorei(F.UNPACK_SKIP_ROWS,On),S.pixelStorei(F.UNPACK_SKIP_IMAGES,Jn),de===0&&N.generateMipmaps&&F.generateMipmap(he),S.unbindTexture()},this.initRenderTarget=function(y){k.get(y).__webglFramebuffer===void 0&&$.setupRenderTarget(y)},this.initTexture=function(y){y.isCubeTexture?$.setTextureCube(y,0):y.isData3DTexture?$.setTexture3D(y,0):y.isDataArrayTexture||y.isCompressedArrayTexture?$.setTexture2DArray(y,0):$.setTexture2D(y,0),S.unbindTexture()},this.resetState=function(){z=0,W=0,ne=null,S.reset(),pe.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return bc}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let n=this.getContext();n.drawingBufferColorSpace=Et._getDrawingBufferColorSpace(e),n.unpackColorSpace=Et._getUnpackColorSpace()}};var nr=Math.pow(2,-24),Yr=Symbol("SKIP_GENERATION"),jo={strategy:0,maxDepth:40,targetLeafSize:10,useSharedArrayBuffer:!1,setBoundingBox:!0,onProgress:null,indirect:!1,verbose:!0,range:null,[Yr]:!1};function dt(t,e,n){return n.min.x=e[t],n.min.y=e[t+1],n.min.z=e[t+2],n.max.x=e[t+3],n.max.y=e[t+4],n.max.z=e[t+5],n}function Kr(t){let e=-1,n=-1/0;for(let i=0;i<3;i++){let r=t[i+3]-t[i];r>n&&(n=r,e=i)}return e}function Jc(t,e){e.set(t)}function el(t,e,n){let i,r;for(let o=0;o<3;o++){let a=o+3;i=t[o],r=e[o],n[o]=i<r?i:r,i=t[a],r=e[a],n[a]=i>r?i:r}}function Zr(t,e,n){for(let i=0;i<3;i++){let r=e[t+2*i],o=e[t+2*i+1],a=r-o,c=r+o;a<n[i]&&(n[i]=a),c>n[i+3]&&(n[i+3]=c)}}function ir(t){let e=t[3]-t[0],n=t[4]-t[1],i=t[5]-t[2];return 2*(e*n+n*i+i*e)}function Ve(t,e){return e[t+15]===65535}function Ze(t,e){return e[t+6]}function rt(t,e){return e[t+14]}function je(t){return t+8}function Qe(t,e){let n=e[t+6];return t+n*8}function ii(t,e){return e[t+7]}function Qo(t,e,n,i,r){let o=1/0,a=1/0,c=1/0,l=-1/0,f=-1/0,p=-1/0,u=1/0,s=1/0,h=1/0,g=-1/0,b=-1/0,d=-1/0,m=t.offset||0;for(let _=(e-m)*6,E=(e+n-m)*6;_<E;_+=6){let v=t[_+0],T=t[_+1],M=v-T,R=v+T;M<o&&(o=M),R>l&&(l=R),v<u&&(u=v),v>g&&(g=v);let x=t[_+2],A=t[_+3],w=x-A,D=x+A;w<a&&(a=w),D>f&&(f=D),x<s&&(s=x),x>b&&(b=x);let C=t[_+4],L=t[_+5],I=C-L,B=C+L;I<c&&(c=I),B>p&&(p=B),C<h&&(h=C),C>d&&(d=C)}i[0]=o,i[1]=a,i[2]=c,i[3]=l,i[4]=f,i[5]=p,r[0]=u,r[1]=s,r[2]=h,r[3]=g,r[4]=b,r[5]=d}var Kn=32,Kx=(t,e)=>t.candidate-e.candidate,ri=new Array(Kn).fill().map(()=>({count:0,bounds:new Float32Array(6),rightCacheBounds:new Float32Array(6),leftCacheBounds:new Float32Array(6),candidate:0})),Jo=new Float32Array(6);function Rd(t,e,n,i,r,o){let a=-1,c=0;if(o===0)a=Kr(e),a!==-1&&(c=(e[a]+e[a+3])/2);else if(o===1)a=Kr(t),a!==-1&&(c=Zx(n,i,r,a));else if(o===2){let l=ir(t),f=1.25*r,p=n.offset||0,u=(i-p)*6,s=(i+r-p)*6;for(let h=0;h<3;h++){let g=e[h],m=(e[h+3]-g)/Kn;if(r<Kn/4){let _=[...ri];_.length=r;let E=0;for(let T=u;T<s;T+=6,E++){let M=_[E];M.candidate=n[T+2*h],M.count=0;let{bounds:R,leftCacheBounds:x,rightCacheBounds:A}=M;for(let w=0;w<3;w++)A[w]=1/0,A[w+3]=-1/0,x[w]=1/0,x[w+3]=-1/0,R[w]=1/0,R[w+3]=-1/0;Zr(T,n,R)}_.sort(Kx);let v=r;for(let T=0;T<v;T++){let M=_[T];for(;T+1<v&&_[T+1].candidate===M.candidate;)_.splice(T+1,1),v--}for(let T=u;T<s;T+=6){let M=n[T+2*h];for(let R=0;R<v;R++){let x=_[R];M>=x.candidate?Zr(T,n,x.rightCacheBounds):(Zr(T,n,x.leftCacheBounds),x.count++)}}for(let T=0;T<v;T++){let M=_[T],R=M.count,x=r-M.count,A=M.leftCacheBounds,w=M.rightCacheBounds,D=0;R!==0&&(D=ir(A)/l);let C=0;x!==0&&(C=ir(w)/l);let L=1+1.25*(D*R+C*x);L<f&&(a=h,f=L,c=M.candidate)}}else{for(let v=0;v<Kn;v++){let T=ri[v];T.count=0,T.candidate=g+m+v*m;let M=T.bounds;for(let R=0;R<3;R++)M[R]=1/0,M[R+3]=-1/0}for(let v=u;v<s;v+=6){let R=~~((n[v+2*h]-g)/m);R>=Kn&&(R=Kn-1);let x=ri[R];x.count++,Zr(v,n,x.bounds)}let _=ri[Kn-1];Jc(_.bounds,_.rightCacheBounds);for(let v=Kn-2;v>=0;v--){let T=ri[v],M=ri[v+1];el(T.bounds,M.rightCacheBounds,T.rightCacheBounds)}let E=0;for(let v=0;v<Kn-1;v++){let T=ri[v],M=T.count,R=T.bounds,A=ri[v+1].rightCacheBounds;M!==0&&(E===0?Jc(R,Jo):el(R,Jo,Jo)),E+=M;let w=0,D=0;E!==0&&(w=ir(Jo)/l);let C=r-E;C!==0&&(D=ir(A)/l);let L=1+1.25*(w*E+D*C);L<f&&(a=h,f=L,c=T.candidate)}}}}else console.warn(`BVH: Invalid build strategy value ${o} used.`);return{axis:a,pos:c}}function Zx(t,e,n,i){let r=0,o=t.offset;for(let a=e,c=e+n;a<c;a++)r+=t[(a-o)*6+i*2];return r/n}var rr=class{constructor(){this.boundingData=new Float32Array(6)}};function Pd(t,e,n,i,r,o){let a=i,c=i+r-1,l=o.pos,f=o.axis*2,p=n.offset||0;for(;;){for(;a<=c&&n[(a-p)*6+f]<l;)a++;for(;a<=c&&n[(c-p)*6+f]>=l;)c--;if(a<c){for(let u=0;u<e;u++){let s=t[a*e+u];t[a*e+u]=t[c*e+u],t[c*e+u]=s}for(let u=0;u<6;u++){let s=a-p,h=c-p,g=n[s*6+u];n[s*6+u]=n[h*6+u],n[h*6+u]=g}a++,c--}else return a}}var Cd,ea,tl,Id,jx=Math.pow(2,32);function ta(t){return"count"in t?1:1+ta(t.left)+ta(t.right)}function Dd(t,e,n){return Cd=new Float32Array(n),ea=new Uint32Array(n),tl=new Uint16Array(n),Id=new Uint8Array(n),nl(t,e)}function nl(t,e){let n=t/4,i=t/2,r="count"in e,o=e.boundingData;for(let a=0;a<6;a++)Cd[n+a]=o[a];if(r)return e.buffer?(Id.set(new Uint8Array(e.buffer),t),t+e.buffer.byteLength):(ea[n+6]=e.offset,tl[i+14]=e.count,tl[i+15]=65535,t+32);{let{left:a,right:c,splitAxis:l}=e,f=t+32,p=nl(f,a),u=t/32,h=p/32-u;if(h>jx)throw new Error("MeshBVH: Cannot store relative child node offset greater than 32 bits.");return ea[n+6]=h,ea[n+7]=l,nl(p,c)}}function Qx(t,e,n,i,r,o){let{maxDepth:a,verbose:c,targetLeafSize:l,_strictLeafSize:f=1/0,strategy:p,onProgress:u}=r,s=t.primitiveBuffer,h=t.primitiveBufferStride,g=new Float32Array(6),b=!1,d=new rr;return Qo(e,n,i,d.boundingData,g),_(d,n,i,g),d;function m(E){u&&u((E-o.offset)/o.count)}function _(E,v,T,M=null,R=0){!b&&R>=a&&(b=!0,c&&console.warn(`BVH: Max depth of ${a} reached when generating BVH. Consider increasing maxDepth.`));let x=T>f;if(T<=l&&!x||R>=a)return m(v+T),E.offset=v,E.count=T,E;let A=Rd(E.boundingData,M,e,v,T,p),w=A.axis===-1?-1:Pd(s,h,e,v,T,A);if(A.axis===-1||w===v||w===v+T){if(!x)return m(v+T),E.offset=v,E.count=T,E;A.axis=Math.max(0,Kr(E.boundingData)),w=v+Math.max(1,Math.floor(T/2))}E.splitAxis=A.axis;let D=new rr,C=v,L=w-v;E.left=D,Qo(e,C,L,D.boundingData,g),_(D,C,L,g,R+1);let I=new rr,B=w,z=T-L;return E.right=I,Qo(e,B,z,I.boundingData,g),_(I,B,z,g,R+1),E}}function Ld(t,e){let n=e.useSharedArrayBuffer?SharedArrayBuffer:ArrayBuffer,i=t.getRootRanges(e.range),r=i[0],o=i[i.length-1],a={offset:r.offset,count:o.offset+o.count-r.offset},c=new Float32Array(6*a.count);c.offset=a.offset,t.computePrimitiveBounds(a.offset,a.count,c),t._roots=i.map(l=>{let f=Qx(t,c,l.offset,l.count,e,a),p=ta(f),u=new n(32*p);return Dd(0,f,u),u})}var oi=class{constructor(e){this._getNewPrimitive=e,this._primitives=[]}getPrimitive(){let e=this._primitives;return e.length===0?this._getNewPrimitive():e.pop()}releasePrimitive(e){this._primitives.push(e)}};var il=class{constructor(){this.float32Array=null,this.uint16Array=null,this.uint32Array=null;let e=[],n=null;this.setBuffer=i=>{n&&e.push(n),n=i,this.float32Array=new Float32Array(i),this.uint16Array=new Uint16Array(i),this.uint32Array=new Uint32Array(i)},this.clearBuffer=()=>{n=null,this.float32Array=null,this.uint16Array=null,this.uint32Array=null,e.length!==0&&this.setBuffer(e.pop())}}},Ye=new il;var ai,ar,or=[],na=new oi(()=>new Gt);function Nd(t,e,n,i,r,o){ai=na.getPrimitive(),ar=na.getPrimitive(),or.push(ai,ar),Ye.setBuffer(t._roots[e]);let a=rl(0,t.geometry,n,i,r,o);Ye.clearBuffer(),na.releasePrimitive(ai),na.releasePrimitive(ar),or.pop(),or.pop();let c=or.length;return c>0&&(ar=or[c-1],ai=or[c-2]),a}function rl(t,e,n,i,r=null,o=0,a=0){let{float32Array:c,uint16Array:l,uint32Array:f}=Ye,p=t*2;if(Ve(p,l)){let s=Ze(t,f),h=rt(p,l);return dt(t,c,ai),i(s,h,!1,a,o+t/8,ai)}else{let w=function(C){let{uint16Array:L,uint32Array:I}=Ye,B=C*2;for(;!Ve(B,L);)C=je(C),B=C*2;return Ze(C,I)},D=function(C){let{uint16Array:L,uint32Array:I}=Ye,B=C*2;for(;!Ve(B,L);)C=Qe(C,I),B=C*2;return Ze(C,I)+rt(B,L)},s=je(t),h=Qe(t,f),g=s,b=h,d,m,_,E;if(r&&(_=ai,E=ar,dt(g,c,_),dt(b,c,E),d=r(_),m=r(E),m<d)){g=h,b=s;let C=d;d=m,m=C,_=E}_||(_=ai,dt(g,c,_));let v=Ve(g*2,l),T=n(_,v,d,a+1,o+g/8),M;if(T===2){let C=w(g),I=D(g)-C;M=i(C,I,!0,a+1,o+g/8,_)}else M=T&&rl(g,e,n,i,r,o,a+1);if(M)return!0;E=ar,dt(b,c,E);let R=Ve(b*2,l),x=n(E,R,m,a+1,o+b/8),A;if(x===2){let C=w(b),I=D(b)-C;A=i(C,I,!0,a+1,o+b/8,E)}else A=x&&rl(b,e,n,i,r,o,a+1);return!!A}}var jr=new Ye.constructor,ra=new Ye.constructor,si=new oi(()=>new Gt),sr=new Gt,cr=new Gt,ol=new Gt,al=new Gt,sl=!1;function Ud(t,e,n,i){if(sl)throw new Error("MeshBVH: Recursive calls to bvhcast not supported.");sl=!0;let r=t._roots,o=e._roots,a,c=0,l=0,f=new $e().copy(n).invert();for(let p=0,u=r.length;p<u;p++){jr.setBuffer(r[p]),l=0;let s=si.getPrimitive();dt(0,jr.float32Array,s),s.applyMatrix4(f);for(let h=0,g=o.length;h<g&&(ra.setBuffer(o[h]),a=Dn(0,0,n,f,i,c,l,0,0,s),ra.clearBuffer(),l+=o[h].byteLength/32,!a);h++);if(si.releasePrimitive(s),jr.clearBuffer(),c+=r[p].byteLength/32,a)break}return sl=!1,a}function Dn(t,e,n,i,r,o=0,a=0,c=0,l=0,f=null,p=!1){let u,s;p?(u=ra,s=jr):(u=jr,s=ra);let h=u.float32Array,g=u.uint32Array,b=u.uint16Array,d=s.float32Array,m=s.uint32Array,_=s.uint16Array,E=t*2,v=e*2,T=Ve(E,b),M=Ve(v,_),R=!1;if(M&&T)p?R=r(Ze(e,m),rt(e*2,_),Ze(t,g),rt(t*2,b),l,a+e/8,c,o+t/8):R=r(Ze(t,g),rt(t*2,b),Ze(e,m),rt(e*2,_),c,o+t/8,l,a+e/8);else if(M){let x=si.getPrimitive();dt(e,d,x),x.applyMatrix4(n);let A=je(t),w=Qe(t,g);dt(A,h,sr),dt(w,h,cr);let D=x.intersectsBox(sr),C=x.intersectsBox(cr);R=D&&Dn(e,A,i,n,r,a,o,l,c+1,x,!p)||C&&Dn(e,w,i,n,r,a,o,l,c+1,x,!p),si.releasePrimitive(x)}else{let x=je(e),A=Qe(e,m);dt(x,d,ol),dt(A,d,al);let w=f.intersectsBox(ol),D=f.intersectsBox(al);if(w&&D)R=Dn(t,x,n,i,r,o,a,c,l+1,f,p)||Dn(t,A,n,i,r,o,a,c,l+1,f,p);else if(w)if(T)R=Dn(t,x,n,i,r,o,a,c,l+1,f,p);else{let C=si.getPrimitive();C.copy(ol).applyMatrix4(n);let L=je(t),I=Qe(t,g);dt(L,h,sr),dt(I,h,cr);let B=C.intersectsBox(sr),z=C.intersectsBox(cr);R=B&&Dn(x,L,i,n,r,a,o,l,c+1,C,!p)||z&&Dn(x,I,i,n,r,a,o,l,c+1,C,!p),si.releasePrimitive(C)}else if(D)if(T)R=Dn(t,A,n,i,r,o,a,c,l+1,f,p);else{let C=si.getPrimitive();C.copy(al).applyMatrix4(n);let L=je(t),I=Qe(t,g);dt(L,h,sr),dt(I,h,cr);let B=C.intersectsBox(sr),z=C.intersectsBox(cr);R=B&&Dn(A,L,i,n,r,a,o,l,c+1,C,!p)||z&&Dn(A,I,i,n,r,a,o,l,c+1,C,!p),si.releasePrimitive(C)}}return R}var oa=new class{constructor(){let t=null,e=null,n=null,i=!1;this.root=null,this.buffer=null,this.uint32Array=null,this.uint16Array=null,this.setBVH=(o,a)=>{if(i)throw new Error("BVHTraversalHelper: cannot call setBVH during an active traversal.");this.root=a,this.buffer=t=o._roots[a],this.uint16Array=n=new Uint16Array(t),this.uint32Array=e=new Uint32Array(t)},this.reset=()=>{this.root=null,this.buffer=t=null,this.uint16Array=n=null,this.uint32Array=e=null},this.getRangeStart=o=>{let a=o*2;for(;!Ve(a,n);)o=je(o),a=o*2;return Ze(o,e)},this.getRangeEnd=o=>{let a=o*2;for(;!Ve(a,n);)o=Qe(o,e),a=o*2;return Ze(o,e)+rt(a,n)};let r=(o,a,c)=>{let l=a*2,f=Ve(l,n);if(!o(c,f,a)&&!f){let u=je(a),s=Qe(a,e);r(o,u,c+1),r(o,s,c+1)}};this.traverseBuffer=o=>{if(i)throw new Error("BVHTraversalHelper: cannot start a traversal during an active traversal.");i=!0;try{r(o,0,0)}finally{i=!1}},this.traverse=o=>{this.traverseBuffer((a,c,l)=>{if(c){let f=l*2,p=e[l+6],u=n[f+14];return o(a,c,new Float32Array(t,l*4,6),p,u)}else{let f=ii(l,e);return o(a,c,new Float32Array(t,l*4,6),f)}})}}};var Fd=new Gt,lr=new Float32Array(6),aa=class{constructor(){this._roots=null,this.primitiveBuffer=null,this.primitiveBufferStride=null}init(e){e={...jo,...e},"maxLeafSize"in e&&(console.warn('BVH: "maxLeafSize" option has been deprecated. Use "targetLeafSize", instead.'),e={...e,targetLeafSize:e.maxLeafSize}),Ld(this,e)}getRootRanges(){throw new Error("BVH: getRootRanges() not implemented")}writePrimitiveBounds(){throw new Error("BVH: writePrimitiveBounds() not implemented")}writePrimitiveRangeBounds(e,n,i,r){let o=1/0,a=1/0,c=1/0,l=-1/0,f=-1/0,p=-1/0;for(let u=e,s=e+n;u<s;u++){this.writePrimitiveBounds(u,lr,0);let[h,g,b,d,m,_]=lr;h<o&&(o=h),d>l&&(l=d),g<a&&(a=g),m>f&&(f=m),b<c&&(c=b),_>p&&(p=_)}return i[r+0]=o,i[r+1]=a,i[r+2]=c,i[r+3]=l,i[r+4]=f,i[r+5]=p,i}computePrimitiveBounds(e,n,i){let r=i.offset||0;for(let o=e,a=e+n;o<a;o++){this.writePrimitiveBounds(o,lr,0);let[c,l,f,p,u,s]=lr,h=(c+p)/2,g=(l+u)/2,b=(f+s)/2,d=(p-c)/2,m=(u-l)/2,_=(s-f)/2,E=(o-r)*6;i[E+0]=h,i[E+1]=d+(Math.abs(h)+d)*nr,i[E+2]=g,i[E+3]=m+(Math.abs(g)+m)*nr,i[E+4]=b,i[E+5]=_+(Math.abs(b)+_)*nr}return i}shiftPrimitiveOffsets(e){let n=this._indirectBuffer;if(n)for(let i=0,r=n.length;i<r;i++)n[i]+=e;else{let i=this._roots;for(let r=0;r<i.length;r++){let o=i[r],a=new Uint32Array(o),c=new Uint16Array(o),l=o.byteLength/32;for(let f=0;f<l;f++){let p=8*f,u=2*p;Ve(u,c)&&(a[p+6]+=e)}}}}traverse(e,n=0){oa.setBVH(this,n),oa.traverse(e),oa.reset()}refit(){let e=this._roots;for(let n=0,i=e.length;n<i;n++){let r=e[n],o=new Uint32Array(r),a=new Uint16Array(r),c=new Float32Array(r),l=r.byteLength/32;for(let f=l-1;f>=0;f--){let p=f*8,u=p*2;if(Ve(u,a)){let h=Ze(p,o),g=rt(u,a);this.writePrimitiveRangeBounds(h,g,lr,0),c.set(lr,p)}else{let h=je(p),g=Qe(p,o);for(let b=0;b<3;b++){let d=c[h+b],m=c[h+b+3],_=c[g+b],E=c[g+b+3];c[p+b]=d<_?d:_,c[p+b+3]=m>E?m:E}}}}}getBoundingBox(e){return e.makeEmpty(),this._roots.forEach(i=>{dt(0,new Float32Array(i),Fd),e.union(Fd)}),e}shapecast(e){let{boundsTraverseOrder:n,intersectsBounds:i,intersectsRange:r,intersectsPrimitive:o,scratchPrimitive:a,iterate:c}=e;if(r&&o){let u=r;r=(s,h,g,b,d)=>u(s,h,g,b,d)?!0:c(s,h,this,o,g,b,a)}else r||(o?r=(u,s,h,g)=>c(u,s,this,o,h,g,a):r=(u,s,h)=>h);let l=!1,f=0,p=this._roots;for(let u=0,s=p.length;u<s;u++){let h=p[u];if(l=Nd(this,u,i,r,n,f),l)break;f+=h.byteLength/32}return l}bvhcast(e,n,i){let{intersectsRanges:r}=i;return Ud(this,e,n,r)}};function Bd(){return typeof SharedArrayBuffer<"u"}function Qr(t){return t.index?t.index.count:t.attributes.position.count}function ci(t){return Qr(t)/3}function cl(t,e=ArrayBuffer){return t>65535?new Uint32Array(new e(4*t)):new Uint16Array(new e(2*t))}function Od(t,e){if(!t.index){let n=t.attributes.position.count,i=e.useSharedArrayBuffer?SharedArrayBuffer:ArrayBuffer,r=cl(n,i);t.setIndex(new Tt(r,1));for(let o=0;o<n;o++)r[o]=o}}function eS(t,e,n){let i=Qr(t)/n,r=e||t.drawRange,o=r.start/n,a=(r.start+r.count)/n,c=Math.max(0,o),l=Math.min(i,a)-c;return{offset:Math.floor(c),count:Math.floor(l)}}function tS(t,e){return t.groups.map(n=>({offset:n.start/e,count:n.count/e}))}function ll(t,e,n){let i=eS(t,e,n),r=tS(t,n);if(!r.length)return[i];let o=[],a=i.offset,c=i.offset+i.count,l=Qr(t)/n,f=[];for(let s of r){let{offset:h,count:g}=s,b=h,d=isFinite(g)?g:l-h,m=h+d;b<c&&m>a&&(f.push({pos:Math.max(a,b),isStart:!0}),f.push({pos:Math.min(c,m),isStart:!1}))}f.sort((s,h)=>s.pos!==h.pos?s.pos-h.pos:s.type==="end"?-1:1);let p=0,u=null;for(let s of f){let h=s.pos;p!==0&&h!==u&&o.push({offset:u,count:h-u}),p+=s.isStart?1:-1,u=h}return o}function nS(t,e){let n=t[t.length-1],i=n.offset+n.count>2**16,r=t.reduce((f,p)=>f+p.count,0),o=i?4:2,a=e?new SharedArrayBuffer(r*o):new ArrayBuffer(r*o),c=i?new Uint32Array(a):new Uint16Array(a),l=0;for(let f=0;f<t.length;f++){let{offset:p,count:u}=t[f];for(let s=0;s<u;s++)c[l+s]=p+s;l+=u}return c}var sa=class extends aa{get indirect(){return!!this._indirectBuffer}get primitiveStride(){return null}get primitiveBufferStride(){return this.indirect?1:this.primitiveStride}set primitiveBufferStride(e){}get primitiveBuffer(){return this.indirect?this._indirectBuffer:this.geometry.index.array}set primitiveBuffer(e){}constructor(e,n={}){if(e.isBufferGeometry){if(e.index&&e.index.isInterleavedBufferAttribute)throw new Error("BVH: InterleavedBufferAttribute is not supported for the index attribute.")}else throw new Error("BVH: Only BufferGeometries are supported.");if(n.useSharedArrayBuffer&&!Bd())throw new Error("BVH: SharedArrayBuffer is not available.");super(),this.geometry=e,this.resolvePrimitiveIndex=n.indirect?i=>this._indirectBuffer[i]:i=>i,this.primitiveBuffer=null,this.primitiveBufferStride=null,this._indirectBuffer=null,n={...jo,...n},n[Yr]||this.init(n)}init(e){let{geometry:n,primitiveStride:i}=this;if(e.indirect){let r=ll(n,e.range,i),o=nS(r,e.useSharedArrayBuffer);this._indirectBuffer=o}else Od(n,e);super.init(e),!n.boundingBox&&e.setBoundingBox&&(n.boundingBox=this.getBoundingBox(new Gt))}getRootRanges(e){return this.indirect?[{offset:0,count:this._indirectBuffer.length}]:ll(this.geometry,e,this.primitiveStride)}raycastObject3D(){throw new Error("BVH: raycastObject3D() not implemented")}};var Sn=class{constructor(){this.min=1/0,this.max=-1/0}setFromPointsField(e,n){let i=1/0,r=-1/0;for(let o=0,a=e.length;o<a;o++){let l=e[o][n];i=l<i?l:i,r=l>r?l:r}this.min=i,this.max=r}setFromPoints(e,n){let i=1/0,r=-1/0;for(let o=0,a=n.length;o<a;o++){let c=n[o],l=e.dot(c);i=l<i?l:i,r=l>r?l:r}this.min=i,this.max=r}isSeparated(e){return this.min>e.max||e.min>this.max}};Sn.prototype.setFromBox=function(){let t=new j;return function(n,i){let r=i.min,o=i.max,a=1/0,c=-1/0;for(let l=0;l<=1;l++)for(let f=0;f<=1;f++)for(let p=0;p<=1;p++){t.x=r.x*l+o.x*(1-l),t.y=r.y*f+o.y*(1-f),t.z=r.z*p+o.z*(1-p);let u=n.dot(t);a=Math.min(u,a),c=Math.max(u,c)}this.min=a,this.max=c}}();var iS=function(){let t=new j,e=new j,n=new j;return function(r,o,a){let c=r.start,l=t,f=o.start,p=e;n.subVectors(c,f),t.subVectors(r.end,r.start),e.subVectors(o.end,o.start);let u=n.dot(p),s=p.dot(l),h=p.dot(p),g=n.dot(l),d=l.dot(l)*h-s*s,m,_;d!==0?m=(u*s-g*h)/d:m=0,_=(u+m*s)/h,a.x=m,a.y=_}}(),Jr=function(){let t=new Ne,e=new j,n=new j;return function(r,o,a,c){iS(r,o,t);let l=t.x,f=t.y;if(l>=0&&l<=1&&f>=0&&f<=1){r.at(l,a),o.at(f,c);return}else if(l>=0&&l<=1){f<0?o.at(0,c):o.at(1,c),r.closestPointToPoint(c,!0,a);return}else if(f>=0&&f<=1){l<0?r.at(0,a):r.at(1,a),o.closestPointToPoint(a,!0,c);return}else{let p;l<0?p=r.start:p=r.end;let u;f<0?u=o.start:u=o.end;let s=e,h=n;if(r.closestPointToPoint(u,!0,e),o.closestPointToPoint(p,!0,n),s.distanceToSquared(u)<=h.distanceToSquared(p)){a.copy(s),c.copy(u);return}else{a.copy(p),c.copy(h);return}}}}(),Gd=function(){let t=new j,e=new j,n=new ji,i=new xn;return function(o,a){let{radius:c,center:l}=o,{a:f,b:p,c:u}=a;if(i.start=f,i.end=p,i.closestPointToPoint(l,!0,t).distanceTo(l)<=c||(i.start=f,i.end=u,i.closestPointToPoint(l,!0,t).distanceTo(l)<=c)||(i.start=p,i.end=u,i.closestPointToPoint(l,!0,t).distanceTo(l)<=c))return!0;let b=a.getPlane(n);if(Math.abs(b.distanceToPoint(l))<=c){let m=b.projectPoint(l,e);if(a.containsPoint(m))return!0}return!1}}();var rS=["x","y","z"],Zn=1e-15,Hd=Zn*Zn;function Mn(t){return Math.abs(t)<Zn}var Zt=class extends Gn{constructor(...e){super(...e),this.isExtendedTriangle=!0,this.satAxes=new Array(4).fill().map(()=>new j),this.satBounds=new Array(4).fill().map(()=>new Sn),this.points=[this.a,this.b,this.c],this.plane=new ji,this.isDegenerateIntoSegment=!1,this.isDegenerateIntoPoint=!1,this.degenerateSegment=new xn,this.needsUpdate=!0}intersectsSphere(e){return Gd(e,this)}update(){let e=this.a,n=this.b,i=this.c,r=this.points,o=this.satAxes,a=this.satBounds,c=o[0],l=a[0];this.getNormal(c),l.setFromPoints(c,r);let f=o[1],p=a[1];f.subVectors(e,n),p.setFromPoints(f,r);let u=o[2],s=a[2];u.subVectors(n,i),s.setFromPoints(u,r);let h=o[3],g=a[3];h.subVectors(i,e),g.setFromPoints(h,r);let b=f.length(),d=u.length(),m=h.length();this.isDegenerateIntoPoint=!1,this.isDegenerateIntoSegment=!1,b<Zn?d<Zn||m<Zn?this.isDegenerateIntoPoint=!0:(this.isDegenerateIntoSegment=!0,this.degenerateSegment.start.copy(e),this.degenerateSegment.end.copy(i)):d<Zn?m<Zn?this.isDegenerateIntoPoint=!0:(this.isDegenerateIntoSegment=!0,this.degenerateSegment.start.copy(n),this.degenerateSegment.end.copy(e)):m<Zn&&(this.isDegenerateIntoSegment=!0,this.degenerateSegment.start.copy(i),this.degenerateSegment.end.copy(n)),this.plane.setFromNormalAndCoplanarPoint(c,e),this.needsUpdate=!1}};Zt.prototype.closestPointToSegment=function(){let t=new j,e=new j,n=new xn;return function(r,o=null,a=null){let{start:c,end:l}=r,f=this.points,p,u=1/0;for(let s=0;s<3;s++){let h=(s+1)%3;n.start.copy(f[s]),n.end.copy(f[h]),Jr(n,r,t,e),p=t.distanceToSquared(e),p<u&&(u=p,o&&o.copy(t),a&&a.copy(e))}return this.closestPointToPoint(c,t),p=c.distanceToSquared(t),p<u&&(u=p,o&&o.copy(t),a&&a.copy(c)),this.closestPointToPoint(l,t),p=l.distanceToSquared(t),p<u&&(u=p,o&&o.copy(t),a&&a.copy(l)),Math.sqrt(u)}}();Zt.prototype.intersectsTriangle=function(){let t=new Zt,e=new Sn,n=new Sn,i=new j,r=new j,o=new j,a=new j,c=new xn,l=new xn,f=new j,p=new Ne,u=new Ne;function s(E,v,T,M){let R=i;!E.isDegenerateIntoPoint&&!E.isDegenerateIntoSegment?R.copy(E.plane.normal):R.copy(v.plane.normal);let x=E.satBounds,A=E.satAxes;for(let C=1;C<4;C++){let L=x[C],I=A[C];if(e.setFromPoints(I,v.points),L.isSeparated(e)||(a.copy(R).cross(I),e.setFromPoints(a,E.points),n.setFromPoints(a,v.points),e.isSeparated(n)))return!1}let w=v.satBounds,D=v.satAxes;for(let C=1;C<4;C++){let L=w[C],I=D[C];if(e.setFromPoints(I,E.points),L.isSeparated(e)||(a.crossVectors(R,I),e.setFromPoints(a,E.points),n.setFromPoints(a,v.points),e.isSeparated(n)))return!1}return T&&(M||console.warn("ExtendedTriangle.intersectsTriangle: Triangles are coplanar which does not support an output edge. Setting edge to 0, 0, 0."),T.start.set(0,0,0),T.end.set(0,0,0)),!0}function h(E,v,T,M,R,x,A,w,D,C,L){let I=A/(A-w);C.x=M+(R-M)*I,L.start.subVectors(v,E).multiplyScalar(I).add(E),I=A/(A-D),C.y=M+(x-M)*I,L.end.subVectors(T,E).multiplyScalar(I).add(E)}function g(E,v,T,M,R,x,A,w,D,C,L){if(R>0)h(E.c,E.a,E.b,M,v,T,D,A,w,C,L);else if(x>0)h(E.b,E.a,E.c,T,v,M,w,A,D,C,L);else if(w*D>0||A!=0)h(E.a,E.b,E.c,v,T,M,A,w,D,C,L);else if(w!=0)h(E.b,E.a,E.c,T,v,M,w,A,D,C,L);else if(D!=0)h(E.c,E.a,E.b,M,v,T,D,A,w,C,L);else return!0;return!1}function b(E,v,T,M){let R=v.degenerateSegment,x=E.plane.distanceToPoint(R.start),A=E.plane.distanceToPoint(R.end);return Mn(x)?Mn(A)?s(E,v,T,M):(T&&(T.start.copy(R.start),T.end.copy(R.start)),E.containsPoint(R.start)):Mn(A)?(T&&(T.start.copy(R.end),T.end.copy(R.end)),E.containsPoint(R.end)):E.plane.intersectLine(R,i)!=null?(T&&(T.start.copy(i),T.end.copy(i)),E.containsPoint(i)):!1}function d(E,v,T){let M=v.a;return Mn(E.plane.distanceToPoint(M))&&E.containsPoint(M)?(T&&(T.start.copy(M),T.end.copy(M)),!0):!1}function m(E,v,T){let M=E.degenerateSegment,R=v.a;return M.closestPointToPoint(R,!0,i),R.distanceToSquared(i)<Hd?(T&&(T.start.copy(R),T.end.copy(R)),!0):!1}function _(E,v,T,M){if(E.isDegenerateIntoSegment)if(v.isDegenerateIntoSegment){let R=E.degenerateSegment,x=v.degenerateSegment,A=r,w=o;R.delta(A),x.delta(w);let D=i.subVectors(x.start,R.start),C=A.x*w.y-A.y*w.x;if(Mn(C))return!1;let L=(D.x*w.y-D.y*w.x)/C,I=-(A.x*D.y-A.y*D.x)/C;if(L<0||L>1||I<0||I>1)return!1;let B=R.start.z+A.z*L,z=x.start.z+w.z*I;return Mn(B-z)?(T&&(T.start.copy(R.start).addScaledVector(A,L),T.end.copy(R.start).addScaledVector(A,L)),!0):!1}else return v.isDegenerateIntoPoint?m(E,v,T):b(v,E,T,M);else{if(E.isDegenerateIntoPoint)return v.isDegenerateIntoPoint?v.a.distanceToSquared(E.a)<Hd?(T&&(T.start.copy(E.a),T.end.copy(E.a)),!0):!1:v.isDegenerateIntoSegment?m(v,E,T):d(v,E,T);if(v.isDegenerateIntoPoint)return d(E,v,T);if(v.isDegenerateIntoSegment)return b(E,v,T,M)}}return function(v,T=null,M=!1){this.needsUpdate&&this.update(),v.isExtendedTriangle?v.needsUpdate&&v.update():(t.copy(v),t.update(),v=t);let R=_(this,v,T,M);if(R!==void 0)return R;let x=this.plane,A=v.plane,w=A.distanceToPoint(this.a),D=A.distanceToPoint(this.b),C=A.distanceToPoint(this.c);Mn(w)&&(w=0),Mn(D)&&(D=0),Mn(C)&&(C=0);let L=w*D,I=w*C;if(L>0&&I>0)return!1;let B=x.distanceToPoint(v.a),z=x.distanceToPoint(v.b),W=x.distanceToPoint(v.c);Mn(B)&&(B=0),Mn(z)&&(z=0),Mn(W)&&(W=0);let ne=B*z,K=B*W;if(ne>0&&K>0)return!1;r.copy(x.normal),o.copy(A.normal);let ee=r.cross(o),te=0,we=Math.abs(ee.x),Me=Math.abs(ee.y);Me>we&&(we=Me,te=1),Math.abs(ee.z)>we&&(te=2);let ze=rS[te],et=this.a[ze],q=this.b[ze],Q=this.c[ze],xe=v.a[ze],Ce=v.b[ze],ge=v.c[ze];if(g(this,et,q,Q,L,I,w,D,C,p,c))return s(this,v,T,M);if(g(v,xe,Ce,ge,ne,K,B,z,W,u,l))return s(this,v,T,M);if(p.y<p.x){let Ue=p.y;p.y=p.x,p.x=Ue,f.copy(c.start),c.start.copy(c.end),c.end.copy(f)}if(u.y<u.x){let Ue=u.y;u.y=u.x,u.x=Ue,f.copy(l.start),l.start.copy(l.end),l.end.copy(f)}return p.y<u.x||u.y<p.x?!1:(T&&(u.x>p.x?T.start.copy(l.start):T.start.copy(c.start),u.y<p.y?T.end.copy(l.end):T.end.copy(c.end)),!0)}}();Zt.prototype.distanceToPoint=function(){let t=new j;return function(n){return this.closestPointToPoint(n,t),n.distanceTo(t)}}();Zt.prototype.distanceToTriangle=function(){let t=new j,e=new j,n=["a","b","c"],i=new xn,r=new xn;return function(a,c=null,l=null){let f=c||l?i:null;if(this.intersectsTriangle(a,f,!0))return(c||l)&&(c&&f.getCenter(c),l&&f.getCenter(l)),0;let p=1/0;for(let u=0;u<3;u++){let s,h=n[u],g=a[h];this.closestPointToPoint(g,t),s=g.distanceToSquared(t),s<p&&(p=s,c&&c.copy(t),l&&l.copy(g));let b=this[h];a.closestPointToPoint(b,t),s=b.distanceToSquared(t),s<p&&(p=s,c&&c.copy(b),l&&l.copy(t))}for(let u=0;u<3;u++){let s=n[u],h=n[(u+1)%3];i.set(this[s],this[h]);for(let g=0;g<3;g++){let b=n[g],d=n[(g+1)%3];r.set(a[b],a[d]),Jr(i,r,t,e);let m=t.distanceToSquared(e);m<p&&(p=m,c&&c.copy(t),l&&l.copy(e))}}return Math.sqrt(p)}}();var Ct=class{constructor(e,n,i){this.isOrientedBox=!0,this.min=new j,this.max=new j,this.matrix=new $e,this.invMatrix=new $e,this.points=new Array(8).fill().map(()=>new j),this.satAxes=new Array(3).fill().map(()=>new j),this.satBounds=new Array(3).fill().map(()=>new Sn),this.alignedSatBounds=new Array(3).fill().map(()=>new Sn),this.needsUpdate=!1,e&&this.min.copy(e),n&&this.max.copy(n),i&&this.matrix.copy(i)}set(e,n,i){this.min.copy(e),this.max.copy(n),this.matrix.copy(i),this.needsUpdate=!0}copy(e){this.min.copy(e.min),this.max.copy(e.max),this.matrix.copy(e.matrix),this.needsUpdate=!0}};Ct.prototype.update=function(){return function(){let e=this.matrix,n=this.min,i=this.max,r=this.points;for(let f=0;f<=1;f++)for(let p=0;p<=1;p++)for(let u=0;u<=1;u++){let s=1*f|2*p|4*u,h=r[s];h.x=f?i.x:n.x,h.y=p?i.y:n.y,h.z=u?i.z:n.z,h.applyMatrix4(e)}let o=this.satBounds,a=this.satAxes,c=r[0];for(let f=0;f<3;f++){let p=a[f],u=o[f],s=1<<f,h=r[s];p.subVectors(c,h),u.setFromPoints(p,r)}let l=this.alignedSatBounds;l[0].setFromPointsField(r,"x"),l[1].setFromPointsField(r,"y"),l[2].setFromPointsField(r,"z"),this.invMatrix.copy(this.matrix).invert(),this.needsUpdate=!1}}();Ct.prototype.intersectsBox=function(){let t=new Sn;return function(n){this.needsUpdate&&this.update();let i=n.min,r=n.max,o=this.satBounds,a=this.satAxes,c=this.alignedSatBounds;if(t.min=i.x,t.max=r.x,c[0].isSeparated(t)||(t.min=i.y,t.max=r.y,c[1].isSeparated(t))||(t.min=i.z,t.max=r.z,c[2].isSeparated(t)))return!1;for(let l=0;l<3;l++){let f=a[l],p=o[l];if(t.setFromBox(f,n),p.isSeparated(t))return!1}return!0}}();Ct.prototype.intersectsTriangle=function(){let t=new Zt,e=new Array(3),n=new Sn,i=new Sn,r=new j;return function(a){this.needsUpdate&&this.update(),a.isExtendedTriangle?a.needsUpdate&&a.update():(t.copy(a),t.update(),a=t);let c=this.satBounds,l=this.satAxes;e[0]=a.a,e[1]=a.b,e[2]=a.c;for(let s=0;s<3;s++){let h=c[s],g=l[s];if(n.setFromPoints(g,e),h.isSeparated(n))return!1}let f=a.satBounds,p=a.satAxes,u=this.points;for(let s=0;s<3;s++){let h=f[s],g=p[s];if(n.setFromPoints(g,u),h.isSeparated(n))return!1}for(let s=0;s<3;s++){let h=l[s];for(let g=0;g<4;g++){let b=p[g];if(r.crossVectors(h,b),n.setFromPoints(r,e),i.setFromPoints(r,u),n.isSeparated(i))return!1}}return!0}}();Ct.prototype.closestPointToPoint=function(){return function(e,n){return this.needsUpdate&&this.update(),n.copy(e).applyMatrix4(this.invMatrix).clamp(this.min,this.max).applyMatrix4(this.matrix),n}}();Ct.prototype.distanceToPoint=function(){let t=new j;return function(n){return this.closestPointToPoint(n,t),n.distanceTo(t)}}();Ct.prototype.distanceToBox=function(){let t=["x","y","z"],e=new Array(12).fill().map(()=>new xn),n=new Array(12).fill().map(()=>new xn),i=new j,r=new j;return function(a,c=0,l=null,f=null){if(this.needsUpdate&&this.update(),this.intersectsBox(a))return(l||f)&&(a.getCenter(r),this.closestPointToPoint(r,i),a.closestPointToPoint(i,r),l&&l.copy(i),f&&f.copy(r)),0;let p=c*c,u=a.min,s=a.max,h=this.points,g=1/0;for(let d=0;d<8;d++){let m=h[d];r.copy(m).clamp(u,s);let _=m.distanceToSquared(r);if(_<g&&(g=_,l&&l.copy(m),f&&f.copy(r),_<p))return Math.sqrt(_)}let b=0;for(let d=0;d<3;d++)for(let m=0;m<=1;m++)for(let _=0;_<=1;_++){let E=(d+1)%3,v=(d+2)%3,T=m<<E|_<<v,M=1<<d|m<<E|_<<v,R=h[T],x=h[M];e[b].set(R,x);let w=t[d],D=t[E],C=t[v],L=n[b],I=L.start,B=L.end;I[w]=u[w],I[D]=m?u[D]:s[D],I[C]=_?u[C]:s[D],B[w]=s[w],B[D]=m?u[D]:s[D],B[C]=_?u[C]:s[D],b++}for(let d=0;d<=1;d++)for(let m=0;m<=1;m++)for(let _=0;_<=1;_++){r.x=d?s.x:u.x,r.y=m?s.y:u.y,r.z=_?s.z:u.z,this.closestPointToPoint(r,i);let E=r.distanceToSquared(i);if(E<g&&(g=E,l&&l.copy(i),f&&f.copy(r),E<p))return Math.sqrt(E)}for(let d=0;d<12;d++){let m=e[d];for(let _=0;_<12;_++){let E=n[_];Jr(m,E,i,r);let v=i.distanceToSquared(r);if(v<g&&(g=v,l&&l.copy(i),f&&f.copy(r),v<p))return Math.sqrt(v)}}return Math.sqrt(g)}}();var ul=class extends oi{constructor(){super(()=>new Zt)}},sn=new ul;var eo=new j,fl=new j;function kd(t,e,n={},i=0,r=1/0){let o=i*i,a=r*r,c=1/0,l=null;if(t.shapecast({boundsTraverseOrder:p=>(eo.copy(e).clamp(p.min,p.max),eo.distanceToSquared(e)),intersectsBounds:(p,u,s)=>s<c&&s<a,intersectsTriangle:(p,u)=>{p.closestPointToPoint(e,eo);let s=e.distanceToSquared(eo);return s<c&&(fl.copy(eo),c=s,l=u),s<o}}),c===1/0)return null;let f=Math.sqrt(c);return n.point?n.point.copy(fl):n.point=fl.clone(),n.distance=f,n.faceIndex=l,n}var ca=parseInt(Ur)>=169,oS=parseInt(Ur)<=161,Pi=new j,Ci=new j,Ii=new j,la=new Ne,ua=new Ne,fa=new Ne,Vd=new j,zd=new j,Wd=new j,to=new j;function aS(t,e,n,i,r,o,a,c){let l;if(o===$t?l=t.intersectTriangle(i,n,e,!0,r):l=t.intersectTriangle(e,n,i,o!==dn,r),l===null)return null;let f=t.origin.distanceTo(r);return f<a||f>c?null:{distance:f,point:r.clone()}}function $d(t,e,n,i,r,o,a,c,l,f,p){Pi.fromBufferAttribute(e,o),Ci.fromBufferAttribute(e,a),Ii.fromBufferAttribute(e,c);let u=aS(t,Pi,Ci,Ii,to,l,f,p);if(u){if(i){la.fromBufferAttribute(i,o),ua.fromBufferAttribute(i,a),fa.fromBufferAttribute(i,c),u.uv=new Ne;let h=Gn.getInterpolation(to,Pi,Ci,Ii,la,ua,fa,u.uv);ca||(u.uv=h)}if(r){la.fromBufferAttribute(r,o),ua.fromBufferAttribute(r,a),fa.fromBufferAttribute(r,c),u.uv1=new Ne;let h=Gn.getInterpolation(to,Pi,Ci,Ii,la,ua,fa,u.uv1);ca||(u.uv1=h),oS&&(u.uv2=u.uv1)}if(n){Vd.fromBufferAttribute(n,o),zd.fromBufferAttribute(n,a),Wd.fromBufferAttribute(n,c),u.normal=new j;let h=Gn.getInterpolation(to,Pi,Ci,Ii,Vd,zd,Wd,u.normal);u.normal.dot(t.direction)>0&&u.normal.multiplyScalar(-1),ca||(u.normal=h)}let s={a:o,b:a,c,normal:new j,materialIndex:0};if(Gn.getNormal(Pi,Ci,Ii,s.normal),u.face=s,u.faceIndex=o,ca){let h=new j;Gn.getBarycoord(to,Pi,Ci,Ii,h),u.barycoord=h}}return u}function Xd(t){return t&&t.isMaterial?t.side:t}function ur(t,e,n,i,r,o,a){let c=i*3,l=c+0,f=c+1,p=c+2,{index:u,groups:s}=t;t.index&&(l=u.getX(l),f=u.getX(f),p=u.getX(p));let{position:h,normal:g,uv:b,uv1:d}=t.attributes;if(Array.isArray(e)){let m=i*3;for(let _=0,E=s.length;_<E;_++){let{start:v,count:T,materialIndex:M}=s[_];if(m>=v&&m<v+T){let R=Xd(e[M]),x=$d(n,h,g,b,d,l,f,p,R,o,a);if(x)if(x.faceIndex=i,x.face.materialIndex=M,r)r.push(x);else return x}}}else{let m=Xd(e),_=$d(n,h,g,b,d,l,f,p,m,o,a);if(_)if(_.faceIndex=i,_.face.materialIndex=0,r)r.push(_);else return _}return null}function pt(t,e,n,i){let r=t.a,o=t.b,a=t.c,c=e,l=e+1,f=e+2;n&&(c=n.getX(c),l=n.getX(l),f=n.getX(f)),r.x=i.getX(c),r.y=i.getY(c),r.z=i.getZ(c),o.x=i.getX(l),o.y=i.getY(l),o.z=i.getZ(l),a.x=i.getX(f),a.y=i.getY(f),a.z=i.getZ(f)}function qd(t,e,n,i,r,o,a,c){let{geometry:l,_indirectBuffer:f}=t;for(let p=i,u=i+r;p<u;p++)ur(l,e,n,p,o,a,c)}function Yd(t,e,n,i,r,o,a){let{geometry:c,_indirectBuffer:l}=t,f=1/0,p=null;for(let u=i,s=i+r;u<s;u++){let h;h=ur(c,e,n,u,null,o,a),h&&h.distance<f&&(p=h,f=h.distance)}return p}function Kd(t,e,n,i,r,o,a){let{geometry:c}=n,{index:l}=c,f=c.attributes.position;for(let p=t,u=e+t;p<u;p++){let s;if(s=p,pt(a,s*3,l,f),a.needsUpdate=!0,i(a,s,r,o))return!0}return!1}function Zd(t,e=null){e&&Array.isArray(e)&&(e=new Set(e));let n=t.geometry,i=n.index?n.index.array:null,r=n.attributes.position,o,a,c,l,f=0,p=t._roots;for(let s=0,h=p.length;s<h;s++)o=p[s],a=new Uint32Array(o),c=new Uint16Array(o),l=new Float32Array(o),u(0,f),f+=o.byteLength;function u(s,h,g=!1){let b=s*2;if(Ve(b,c)){let d=Ze(s,a),m=rt(b,c),_=1/0,E=1/0,v=1/0,T=-1/0,M=-1/0,R=-1/0;for(let x=3*d,A=3*(d+m);x<A;x++){let w=i[x],D=r.getX(w),C=r.getY(w),L=r.getZ(w);D<_&&(_=D),D>T&&(T=D),C<E&&(E=C),C>M&&(M=C),L<v&&(v=L),L>R&&(R=L)}return l[s+0]!==_||l[s+1]!==E||l[s+2]!==v||l[s+3]!==T||l[s+4]!==M||l[s+5]!==R?(l[s+0]=_,l[s+1]=E,l[s+2]=v,l[s+3]=T,l[s+4]=M,l[s+5]=R,!0):!1}else{let d=je(s),m=Qe(s,a),_=g,E=!1,v=!1;if(e){if(!_){let w=d/8+h/32,D=m/8+h/32;E=e.has(w),v=e.has(D),_=!E&&!v}}else E=!0,v=!0;let T=_||E,M=_||v,R=!1;T&&(R=u(d,h,_));let x=!1;M&&(x=u(m,h,_));let A=R||x;if(A)for(let w=0;w<3;w++){let D=d+w,C=m+w,L=l[D],I=l[D+3],B=l[C],z=l[C+3];l[s+w]=L<B?L:B,l[s+w+3]=I>z?I:z}return A}}}function An(t,e,n,i,r){let o,a,c,l,f,p,u=1/n.direction.x,s=1/n.direction.y,h=1/n.direction.z,g=n.origin.x,b=n.origin.y,d=n.origin.z,m=e[t],_=e[t+3],E=e[t+1],v=e[t+3+1],T=e[t+2],M=e[t+3+2];return u>=0?(o=(m-g)*u,a=(_-g)*u):(o=(_-g)*u,a=(m-g)*u),s>=0?(c=(E-b)*s,l=(v-b)*s):(c=(v-b)*s,l=(E-b)*s),o>l||c>a||((c>o||isNaN(o))&&(o=c),(l<a||isNaN(a))&&(a=l),h>=0?(f=(T-d)*h,p=(M-d)*h):(f=(M-d)*h,p=(T-d)*h),o>p||f>a)?!1:((f>o||o!==o)&&(o=f),(p<a||a!==a)&&(a=p),o<=r&&a>=i)}function jd(t,e,n,i,r,o,a,c){let{geometry:l,_indirectBuffer:f}=t;for(let p=i,u=i+r;p<u;p++){let s=f?f[p]:p;ur(l,e,n,s,o,a,c)}}function Qd(t,e,n,i,r,o,a){let{geometry:c,_indirectBuffer:l}=t,f=1/0,p=null;for(let u=i,s=i+r;u<s;u++){let h;h=ur(c,e,n,l?l[u]:u,null,o,a),h&&h.distance<f&&(p=h,f=h.distance)}return p}function Jd(t,e,n,i,r,o,a){let{geometry:c}=n,{index:l}=c,f=c.attributes.position;for(let p=t,u=e+t;p<u;p++){let s;if(s=n.resolveTriangleIndex(p),pt(a,s*3,l,f),a.needsUpdate=!0,i(a,s,r,o))return!0}return!1}function ep(t,e,n,i,r,o,a){Ye.setBuffer(t._roots[e]),dl(0,t,n,i,r,o,a),Ye.clearBuffer()}function dl(t,e,n,i,r,o,a){let{float32Array:c,uint16Array:l,uint32Array:f}=Ye,p=t*2;if(Ve(p,l)){let s=Ze(t,f),h=rt(p,l);qd(e,n,i,s,h,r,o,a)}else{let s=je(t);An(s,c,i,o,a)&&dl(s,e,n,i,r,o,a);let h=Qe(t,f);An(h,c,i,o,a)&&dl(h,e,n,i,r,o,a)}}var sS=["x","y","z"];function tp(t,e,n,i,r,o){Ye.setBuffer(t._roots[e]);let a=pl(0,t,n,i,r,o);return Ye.clearBuffer(),a}function pl(t,e,n,i,r,o){let{float32Array:a,uint16Array:c,uint32Array:l}=Ye,f=t*2;if(Ve(f,c)){let u=Ze(t,l),s=rt(f,c);return Yd(e,n,i,u,s,r,o)}else{let u=ii(t,l),s=sS[u],g=i.direction[s]>=0,b,d;g?(b=je(t),d=Qe(t,l)):(b=Qe(t,l),d=je(t));let _=An(b,a,i,r,o)?pl(b,e,n,i,r,o):null;if(_){let T=_.point[s];if(g?T<=a[d+u]:T>=a[d+u+3])return _}let v=An(d,a,i,r,o)?pl(d,e,n,i,r,o):null;return _&&v?_.distance<=v.distance?_:v:_||v||null}}var da=new Gt,fr=new Zt,dr=new Zt,no=new $e,np=new Ct,pa=new Ct;function ip(t,e,n,i){Ye.setBuffer(t._roots[e]);let r=hl(0,t,n,i);return Ye.clearBuffer(),r}function hl(t,e,n,i,r=null){let{float32Array:o,uint16Array:a,uint32Array:c}=Ye,l=t*2;if(r===null&&(n.boundingBox||n.computeBoundingBox(),np.set(n.boundingBox.min,n.boundingBox.max,i),r=np),Ve(l,a)){let p=e.geometry,u=p.index,s=p.attributes.position,h=n.index,g=n.attributes.position,b=Ze(t,c),d=rt(l,a);if(no.copy(i).invert(),n.boundsTree)return dt(t,o,pa),pa.matrix.copy(no),pa.needsUpdate=!0,n.boundsTree.shapecast({intersectsBounds:_=>pa.intersectsBox(_),intersectsTriangle:_=>{_.a.applyMatrix4(i),_.b.applyMatrix4(i),_.c.applyMatrix4(i),_.needsUpdate=!0;for(let E=b*3,v=(d+b)*3;E<v;E+=3)if(pt(dr,E,u,s),dr.needsUpdate=!0,_.intersectsTriangle(dr))return!0;return!1}});{let m=ci(n);for(let _=b*3,E=(d+b)*3;_<E;_+=3){pt(fr,_,u,s),fr.a.applyMatrix4(no),fr.b.applyMatrix4(no),fr.c.applyMatrix4(no),fr.needsUpdate=!0;for(let v=0,T=m*3;v<T;v+=3)if(pt(dr,v,h,g),dr.needsUpdate=!0,fr.intersectsTriangle(dr))return!0}}}else{let p=je(t),u=Qe(t,c);return dt(p,o,da),!!(r.intersectsBox(da)&&hl(p,e,n,i,r)||(dt(u,o,da),r.intersectsBox(da)&&hl(u,e,n,i,r)))}}var ha=new $e,ml=new Ct,io=new Ct,cS=new j,lS=new j,uS=new j,fS=new j;function rp(t,e,n,i={},r={},o=0,a=1/0){e.boundingBox||e.computeBoundingBox(),ml.set(e.boundingBox.min,e.boundingBox.max,n),ml.needsUpdate=!0;let c=t.geometry,l=c.attributes.position,f=c.index,p=e.attributes.position,u=e.index,s=sn.getPrimitive(),h=sn.getPrimitive(),g=cS,b=lS,d=null,m=null;r&&(d=uS,m=fS);let _=1/0,E=null,v=null;return ha.copy(n).invert(),io.matrix.copy(ha),t.shapecast({boundsTraverseOrder:T=>ml.distanceToBox(T),intersectsBounds:(T,M,R)=>R<_&&R<a?(M&&(io.min.copy(T.min),io.max.copy(T.max),io.needsUpdate=!0),!0):!1,intersectsRange:(T,M)=>{if(e.boundsTree)return e.boundsTree.shapecast({boundsTraverseOrder:x=>io.distanceToBox(x),intersectsBounds:(x,A,w)=>w<_&&w<a,intersectsRange:(x,A)=>{for(let w=x,D=x+A;w<D;w++){pt(h,3*w,u,p),h.a.applyMatrix4(n),h.b.applyMatrix4(n),h.c.applyMatrix4(n),h.needsUpdate=!0;for(let C=T,L=T+M;C<L;C++){pt(s,3*C,f,l),s.needsUpdate=!0;let I=s.distanceToTriangle(h,g,d);if(I<_&&(b.copy(g),m&&m.copy(d),_=I,E=C,v=w),I<o)return!0}}}});{let R=ci(e);for(let x=0,A=R;x<A;x++){pt(h,3*x,u,p),h.a.applyMatrix4(n),h.b.applyMatrix4(n),h.c.applyMatrix4(n),h.needsUpdate=!0;for(let w=T,D=T+M;w<D;w++){pt(s,3*w,f,l),s.needsUpdate=!0;let C=s.distanceToTriangle(h,g,d);if(C<_&&(b.copy(g),m&&m.copy(d),_=C,E=w,v=x),C<o)return!0}}}}}),sn.releasePrimitive(s),sn.releasePrimitive(h),_===1/0?null:(i.point?i.point.copy(b):i.point=b.clone(),i.distance=_,i.faceIndex=E,r&&(r.point?r.point.copy(m):r.point=m.clone(),r.point.applyMatrix4(ha),b.applyMatrix4(ha),r.distance=b.sub(r.point).length(),r.faceIndex=v),i)}function op(t,e=null){e&&Array.isArray(e)&&(e=new Set(e));let n=t.geometry,i=n.index?n.index.array:null,r=n.attributes.position,o,a,c,l,f=0,p=t._roots;for(let s=0,h=p.length;s<h;s++)o=p[s],a=new Uint32Array(o),c=new Uint16Array(o),l=new Float32Array(o),u(0,f),f+=o.byteLength;function u(s,h,g=!1){let b=s*2;if(Ve(b,c)){let d=Ze(s,a),m=rt(b,c),_=1/0,E=1/0,v=1/0,T=-1/0,M=-1/0,R=-1/0;for(let x=d,A=d+m;x<A;x++){let w=3*t.resolveTriangleIndex(x);for(let D=0;D<3;D++){let C=w+D;C=i?i[C]:C;let L=r.getX(C),I=r.getY(C),B=r.getZ(C);L<_&&(_=L),L>T&&(T=L),I<E&&(E=I),I>M&&(M=I),B<v&&(v=B),B>R&&(R=B)}}return l[s+0]!==_||l[s+1]!==E||l[s+2]!==v||l[s+3]!==T||l[s+4]!==M||l[s+5]!==R?(l[s+0]=_,l[s+1]=E,l[s+2]=v,l[s+3]=T,l[s+4]=M,l[s+5]=R,!0):!1}else{let d=je(s),m=Qe(s,a),_=g,E=!1,v=!1;if(e){if(!_){let w=d/8+h/32,D=m/8+h/32;E=e.has(w),v=e.has(D),_=!E&&!v}}else E=!0,v=!0;let T=_||E,M=_||v,R=!1;T&&(R=u(d,h,_));let x=!1;M&&(x=u(m,h,_));let A=R||x;if(A)for(let w=0;w<3;w++){let D=d+w,C=m+w,L=l[D],I=l[D+3],B=l[C],z=l[C+3];l[s+w]=L<B?L:B,l[s+w+3]=I>z?I:z}return A}}}function ap(t,e,n,i,r,o,a){Ye.setBuffer(t._roots[e]),gl(0,t,n,i,r,o,a),Ye.clearBuffer()}function gl(t,e,n,i,r,o,a){let{float32Array:c,uint16Array:l,uint32Array:f}=Ye,p=t*2;if(Ve(p,l)){let s=Ze(t,f),h=rt(p,l);jd(e,n,i,s,h,r,o,a)}else{let s=je(t);An(s,c,i,o,a)&&gl(s,e,n,i,r,o,a);let h=Qe(t,f);An(h,c,i,o,a)&&gl(h,e,n,i,r,o,a)}}var dS=["x","y","z"];function sp(t,e,n,i,r,o){Ye.setBuffer(t._roots[e]);let a=_l(0,t,n,i,r,o);return Ye.clearBuffer(),a}function _l(t,e,n,i,r,o){let{float32Array:a,uint16Array:c,uint32Array:l}=Ye,f=t*2;if(Ve(f,c)){let u=Ze(t,l),s=rt(f,c);return Qd(e,n,i,u,s,r,o)}else{let u=ii(t,l),s=dS[u],g=i.direction[s]>=0,b,d;g?(b=je(t),d=Qe(t,l)):(b=Qe(t,l),d=je(t));let _=An(b,a,i,r,o)?_l(b,e,n,i,r,o):null;if(_){let T=_.point[s];if(g?T<=a[d+u]:T>=a[d+u+3])return _}let v=An(d,a,i,r,o)?_l(d,e,n,i,r,o):null;return _&&v?_.distance<=v.distance?_:v:_||v||null}}var ma=new Gt,pr=new Zt,hr=new Zt,ro=new $e,cp=new Ct,ga=new Ct;function lp(t,e,n,i){Ye.setBuffer(t._roots[e]);let r=vl(0,t,n,i);return Ye.clearBuffer(),r}function vl(t,e,n,i,r=null){let{float32Array:o,uint16Array:a,uint32Array:c}=Ye,l=t*2;if(r===null&&(n.boundingBox||n.computeBoundingBox(),cp.set(n.boundingBox.min,n.boundingBox.max,i),r=cp),Ve(l,a)){let p=e.geometry,u=p.index,s=p.attributes.position,h=n.index,g=n.attributes.position,b=Ze(t,c),d=rt(l,a);if(ro.copy(i).invert(),n.boundsTree)return dt(t,o,ga),ga.matrix.copy(ro),ga.needsUpdate=!0,n.boundsTree.shapecast({intersectsBounds:_=>ga.intersectsBox(_),intersectsTriangle:_=>{_.a.applyMatrix4(i),_.b.applyMatrix4(i),_.c.applyMatrix4(i),_.needsUpdate=!0;for(let E=b,v=d+b;E<v;E++)if(pt(hr,3*e.resolveTriangleIndex(E),u,s),hr.needsUpdate=!0,_.intersectsTriangle(hr))return!0;return!1}});{let m=ci(n);for(let _=b,E=d+b;_<E;_++){let v=e.resolveTriangleIndex(_);pt(pr,3*v,u,s),pr.a.applyMatrix4(ro),pr.b.applyMatrix4(ro),pr.c.applyMatrix4(ro),pr.needsUpdate=!0;for(let T=0,M=m*3;T<M;T+=3)if(pt(hr,T,h,g),hr.needsUpdate=!0,pr.intersectsTriangle(hr))return!0}}}else{let p=je(t),u=Qe(t,c);return dt(p,o,ma),!!(r.intersectsBox(ma)&&vl(p,e,n,i,r)||(dt(u,o,ma),r.intersectsBox(ma)&&vl(u,e,n,i,r)))}}var _a=new $e,xl=new Ct,oo=new Ct,pS=new j,hS=new j,mS=new j,gS=new j;function up(t,e,n,i={},r={},o=0,a=1/0){e.boundingBox||e.computeBoundingBox(),xl.set(e.boundingBox.min,e.boundingBox.max,n),xl.needsUpdate=!0;let c=t.geometry,l=c.attributes.position,f=c.index,p=e.attributes.position,u=e.index,s=sn.getPrimitive(),h=sn.getPrimitive(),g=pS,b=hS,d=null,m=null;r&&(d=mS,m=gS);let _=1/0,E=null,v=null;return _a.copy(n).invert(),oo.matrix.copy(_a),t.shapecast({boundsTraverseOrder:T=>xl.distanceToBox(T),intersectsBounds:(T,M,R)=>R<_&&R<a?(M&&(oo.min.copy(T.min),oo.max.copy(T.max),oo.needsUpdate=!0),!0):!1,intersectsRange:(T,M)=>{if(e.boundsTree){let R=e.boundsTree;return R.shapecast({boundsTraverseOrder:x=>oo.distanceToBox(x),intersectsBounds:(x,A,w)=>w<_&&w<a,intersectsRange:(x,A)=>{for(let w=x,D=x+A;w<D;w++){let C=R.resolveTriangleIndex(w);pt(h,3*C,u,p),h.a.applyMatrix4(n),h.b.applyMatrix4(n),h.c.applyMatrix4(n),h.needsUpdate=!0;for(let L=T,I=T+M;L<I;L++){let B=t.resolveTriangleIndex(L);pt(s,3*B,f,l),s.needsUpdate=!0;let z=s.distanceToTriangle(h,g,d);if(z<_&&(b.copy(g),m&&m.copy(d),_=z,E=L,v=w),z<o)return!0}}}})}else{let R=ci(e);for(let x=0,A=R;x<A;x++){pt(h,3*x,u,p),h.a.applyMatrix4(n),h.b.applyMatrix4(n),h.c.applyMatrix4(n),h.needsUpdate=!0;for(let w=T,D=T+M;w<D;w++){let C=t.resolveTriangleIndex(w);pt(s,3*C,f,l),s.needsUpdate=!0;let L=s.distanceToTriangle(h,g,d);if(L<_&&(b.copy(g),m&&m.copy(d),_=L,E=w,v=x),L<o)return!0}}}}}),sn.releasePrimitive(s),sn.releasePrimitive(h),_===1/0?null:(i.point?i.point.copy(b):i.point=b.clone(),i.distance=_,i.faceIndex=E,r&&(r.point?r.point.copy(m):r.point=m.clone(),r.point.applyMatrix4(_a),b.applyMatrix4(_a),r.distance=b.sub(r.point).length(),r.faceIndex=v),i)}function Sl(t,e,n){return t===null?null:(t.point.applyMatrix4(e.matrixWorld),t.distance=t.point.distanceTo(n.ray.origin),t.object=e,t)}var va=new Ct,xa=new Rc,fp=new j,dp=new $e,pp=new j,Tl=["getX","getY","getZ"],mr=class t extends sa{static serialize(e,n={}){n={cloneBuffers:!0,...n};let i=e.geometry,r=e._roots,o=e._indirectBuffer,a=i.getIndex(),c={version:1,roots:null,index:null,indirectBuffer:null};return n.cloneBuffers?(c.roots=r.map(l=>l.slice()),c.index=a?a.array.slice():null,c.indirectBuffer=o?o.slice():null):(c.roots=r,c.index=a?a.array:null,c.indirectBuffer=o),c}static deserialize(e,n,i={}){i={setIndex:!0,indirect:!!e.indirectBuffer,...i};let{index:r,roots:o,indirectBuffer:a}=e;e.version||(console.warn("MeshBVH.deserialize: Serialization format has been changed and will be fixed up. It is recommended to regenerate any stored serialized data."),l(o));let c=new t(n,{...i,[Yr]:!0});if(c._roots=o,c._indirectBuffer=a||null,i.setIndex){let f=n.getIndex();if(f===null){let p=new Tt(e.index,1,!1);n.setIndex(p)}else f.array!==r&&(f.array.set(r),f.needsUpdate=!0)}return c;function l(f){for(let p=0;p<f.length;p++){let u=f[p],s=new Uint32Array(u),h=new Uint16Array(u);for(let g=0,b=u.byteLength/32;g<b;g++){let d=8*g,m=2*d;Ve(m,h)||(s[d+6]=s[d+6]/8-g)}}}}get primitiveStride(){return 3}get resolveTriangleIndex(){return this.resolvePrimitiveIndex}constructor(e,n={}){n.maxLeafTris&&(console.warn('MeshBVH: "maxLeafTris" option has been deprecated. Use "targetLeafSize", instead.'),n={...n,targetLeafSize:n.maxLeafTris}),super(e,n)}shiftTriangleOffsets(e){return super.shiftPrimitiveOffsets(e)}writePrimitiveBounds(e,n,i){let r=this.geometry,o=this._indirectBuffer,a=r.attributes.position,c=r.index?r.index.array:null,f=(o?o[e]:e)*3,p=f+0,u=f+1,s=f+2;c&&(p=c[p],u=c[u],s=c[s]);for(let h=0;h<3;h++){let g=a[Tl[h]](p),b=a[Tl[h]](u),d=a[Tl[h]](s),m=g;b<m&&(m=b),d<m&&(m=d);let _=g;b>_&&(_=b),d>_&&(_=d),n[i+h]=m,n[i+h+3]=_}return n}computePrimitiveBounds(e,n,i){let r=this.geometry,o=this._indirectBuffer,a=r.attributes.position,c=r.index?r.index.array:null,l=a.normalized;if(e<0||n+e-i.offset>i.length/6)throw new Error("MeshBVH: compute triangle bounds range is invalid.");let f=a.array,p=a.offset||0,u=3;a.isInterleavedBufferAttribute&&(u=a.data.stride);let s=["getX","getY","getZ"],h=i.offset;for(let g=e,b=e+n;g<b;g++){let m=(o?o[g]:g)*3,_=(g-h)*6,E=m+0,v=m+1,T=m+2;c&&(E=c[E],v=c[v],T=c[T]),l||(E=E*u+p,v=v*u+p,T=T*u+p);for(let M=0;M<3;M++){let R,x,A;l?(R=a[s[M]](E),x=a[s[M]](v),A=a[s[M]](T)):(R=f[E+M],x=f[v+M],A=f[T+M]);let w=R;x<w&&(w=x),A<w&&(w=A);let D=R;x>D&&(D=x),A>D&&(D=A);let C=(D-w)/2,L=M*2;i[_+L+0]=w+C,i[_+L+1]=C+(Math.abs(w)+C)*nr}}return i}raycastObject3D(e,n,i=[]){let{material:r}=e;if(r===void 0)return;dp.copy(e.matrixWorld).invert(),xa.copy(n.ray).applyMatrix4(dp),pp.setFromMatrixScale(e.matrixWorld),fp.copy(xa.direction).multiply(pp);let o=fp.length(),a=n.near/o,c=n.far/o;if(n.firstHitOnly===!0){let l=this.raycastFirst(xa,r,a,c);l=Sl(l,e,n),l&&i.push(l)}else{let l=this.raycast(xa,r,a,c);for(let f=0,p=l.length;f<p;f++){let u=Sl(l[f],e,n);u&&i.push(u)}}return i}refit(e=null){return(this.indirect?op:Zd)(this,e)}raycast(e,n=Cn,i=0,r=1/0){let o=this._roots,a=[],c=this.indirect?ap:ep;for(let l=0,f=o.length;l<f;l++)c(this,l,n,e,a,i,r);return a}raycastFirst(e,n=Cn,i=0,r=1/0){let o=this._roots,a=null,c=this.indirect?sp:tp;for(let l=0,f=o.length;l<f;l++){let p=c(this,l,n,e,i,r);p!=null&&(a==null||p.distance<a.distance)&&(a=p)}return a}intersectsGeometry(e,n){let i=!1,r=this._roots,o=this.indirect?lp:ip;for(let a=0,c=r.length;a<c&&(i=o(this,a,e,n),!i);a++);return i}shapecast(e){let n=sn.getPrimitive(),i=super.shapecast({...e,intersectsPrimitive:e.intersectsTriangle,scratchPrimitive:n,iterate:this.indirect?Jd:Kd});return sn.releasePrimitive(n),i}bvhcast(e,n,i){let{intersectsRanges:r,intersectsTriangles:o}=i,a=sn.getPrimitive(),c=this.geometry.index,l=this.geometry.attributes.position,f=this.indirect?g=>{let b=this.resolveTriangleIndex(g);pt(a,b*3,c,l)}:g=>{pt(a,g*3,c,l)},p=sn.getPrimitive(),u=e.geometry.index,s=e.geometry.attributes.position,h=e.indirect?g=>{let b=e.resolveTriangleIndex(g);pt(p,b*3,u,s)}:g=>{pt(p,g*3,u,s)};if(o){if(!(e instanceof t))throw new Error('MeshBVH: "intersectsTriangles" callback can only be used with another MeshBVH.');let g=(b,d,m,_,E,v,T,M)=>{for(let R=m,x=m+_;R<x;R++){h(R),p.a.applyMatrix4(n),p.b.applyMatrix4(n),p.c.applyMatrix4(n),p.needsUpdate=!0;for(let A=b,w=b+d;A<w;A++)if(f(A),a.needsUpdate=!0,o(a,p,A,R,E,v,T,M))return!0}return!1};if(r){let b=r;r=function(d,m,_,E,v,T,M,R){return b(d,m,_,E,v,T,M,R)?!0:g(d,m,_,E,v,T,M,R)}}else r=g}return super.bvhcast(e,n,{intersectsRanges:r})}intersectsBox(e,n){return va.set(e.min,e.max,n),va.needsUpdate=!0,this.shapecast({intersectsBounds:i=>va.intersectsBox(i),intersectsTriangle:i=>va.intersectsTriangle(i)})}intersectsSphere(e){return this.shapecast({intersectsBounds:n=>e.intersectsBox(n),intersectsTriangle:n=>n.intersectsSphere(e)})}closestPointToGeometry(e,n,i={},r={},o=0,a=1/0){return(this.indirect?up:rp)(this,e,n,i,r,o,a)}closestPointToPoint(e,n={},i=0,r=1/0){return kd(this,e,n,i,r)}};function _S(t){switch(t){case 1:return"R";case 2:return"RG";case 3:return"RGBA";case 4:return"RGBA"}throw new Error}function vS(t){switch(t){case 1:return qn;case 2:return In;case 3:return Pe;case 4:return Pe}}function hp(t){switch(t){case 1:return kr;case 2:return Mi;case 3:return Ai;case 4:return Ai}}var Sa=class extends wt{constructor(){super(),this.minFilter=Fe,this.magFilter=Fe,this.generateMipmaps=!1,this.overrideItemSize=null,this._forcedType=null}updateFrom(e){let n=this.overrideItemSize,i=e.itemSize,r=e.count;if(n!==null){if(i*r%n!==0)throw new Error("VertexAttributeTexture: overrideItemSize must divide evenly into buffer length.");e.itemSize=n,e.count=r*i/n}let o=e.itemSize,a=e.count,c=e.normalized,l=e.array.constructor,f=l.BYTES_PER_ELEMENT,p=this._forcedType,u=o;if(p===null)switch(l){case Float32Array:p=Be;break;case Uint8Array:case Uint16Array:case Uint32Array:p=on;break;case Int8Array:case Int16Array:case Int32Array:p=bi;break}let s,h,g,b,d=_S(o);switch(p){case Be:g=1,h=vS(o),c&&f===1?(b=l,d+="8",l===Uint8Array?s=Jt:(s=Hr,d+="_SNORM")):(b=Float32Array,d+="32F",s=Be);break;case bi:d+=f*8+"I",g=c?Math.pow(2,l.BYTES_PER_ELEMENT*8-1):1,h=hp(o),f===1?(b=Int8Array,s=Hr):f===2?(b=Int16Array,s=Do):(b=Int32Array,s=bi);break;case on:d+=f*8+"UI",g=c?Math.pow(2,l.BYTES_PER_ELEMENT*8-1):1,h=hp(o),f===1?(b=Uint8Array,s=Jt):f===2?(b=Uint16Array,s=Ti):(b=Uint32Array,s=on);break}u===3&&(h===Pe||h===Ai)&&(u=4);let m=Math.ceil(Math.sqrt(a))||1,_=u*m*m,E=new b(_),v=e.normalized;e.normalized=!1;for(let T=0;T<a;T++){let M=u*T;E[M]=e.getX(T)/g,o>=2&&(E[M+1]=e.getY(T)/g),o>=3&&(E[M+2]=e.getZ(T)/g,u===4&&(E[M+3]=1)),o>=4&&(E[M+3]=e.getW(T)/g)}e.normalized=v,this.internalFormat=d,this.format=h,this.type=s,this.image.width=m,this.image.height=m,this.image.data=E,this.needsUpdate=!0,this.dispose(),e.itemSize=i,e.count=r}},gr=class extends Sa{constructor(){super(),this._forcedType=on}};var _r=class extends Sa{constructor(){super(),this._forcedType=Be}};var Ta=class{constructor(){this.index=new gr,this.position=new _r,this.bvhBounds=new wt,this.bvhContents=new wt,this._cachedIndexAttr=null,this.index.overrideItemSize=3}updateFrom(e){let{geometry:n}=e;if(SS(e,this.bvhBounds,this.bvhContents),this.position.updateFrom(n.attributes.position),e.indirect){let i=e._indirectBuffer;if(this._cachedIndexAttr===null||this._cachedIndexAttr.count!==i.length)if(n.index)this._cachedIndexAttr=n.index.clone();else{let r=cl(Qr(n));this._cachedIndexAttr=new Tt(r,1,!1)}xS(n,i,this._cachedIndexAttr),this.index.updateFrom(this._cachedIndexAttr)}else this.index.updateFrom(n.index)}dispose(){let{index:e,position:n,bvhBounds:i,bvhContents:r}=this;e&&e.dispose(),n&&n.dispose(),i&&i.dispose(),r&&r.dispose()}};function xS(t,e,n){let i=n.array,r=t.index?t.index.array:null;for(let o=0,a=e.length;o<a;o++){let c=3*o,l=3*e[o];for(let f=0;f<3;f++)i[c+f]=r?r[l+f]:l+f}}function SS(t,e,n){let i=t._roots;if(i.length!==1)throw new Error("MeshBVHUniformStruct: Multi-root BVHs not supported.");let r=i[0],o=new Uint16Array(r),a=new Uint32Array(r),c=new Float32Array(r),l=r.byteLength/32,f=2*Math.ceil(Math.sqrt(l/2)),p=new Float32Array(4*f*f),u=Math.ceil(Math.sqrt(l)),s=new Uint32Array(2*u*u);for(let h=0;h<l;h++){let g=h*32/4,b=g*2,d=g;for(let m=0;m<3;m++)p[8*h+0+m]=c[d+0+m],p[8*h+4+m]=c[d+3+m];if(Ve(b,o)){let m=rt(b,o),_=Ze(g,a),E=-65536|m;s[h*2+0]=E,s[h*2+1]=_}else{let m=a[g+6],_=ii(g,a);s[h*2+0]=_,s[h*2+1]=m}}e.image.data=p,e.image.width=f,e.image.height=f,e.format=Pe,e.type=Be,e.internalFormat="RGBA32F",e.minFilter=Fe,e.magFilter=Fe,e.generateMipmaps=!1,e.needsUpdate=!0,e.dispose(),n.image.data=s,n.image.width=u,n.image.height=u,n.format=Mi,n.type=on,n.internalFormat="RG32UI",n.minFilter=Fe,n.magFilter=Fe,n.generateMipmaps=!1,n.needsUpdate=!0,n.dispose()}var Di={};ig(Di,{bvh_distance_functions:()=>mp,bvh_ray_functions:()=>El,bvh_struct_definitions:()=>gp,common_functions:()=>bl});var bl=`

// A stack of uint32 indices can can store the indices for
// a perfectly balanced tree with a depth up to 31. Lower stack
// depth gets higher performance.
//
// However not all trees are balanced. Best value to set this to
// is the trees max depth.
#ifndef BVH_STACK_DEPTH
#define BVH_STACK_DEPTH 60
#endif

#ifndef INFINITY
#define INFINITY 1e20
#endif

// Utilities
uvec4 uTexelFetch1D( usampler2D tex, uint index ) {

	uint width = uint( textureSize( tex, 0 ).x );
	uvec2 uv;
	uv.x = index % width;
	uv.y = index / width;

	return texelFetch( tex, ivec2( uv ), 0 );

}

ivec4 iTexelFetch1D( isampler2D tex, uint index ) {

	uint width = uint( textureSize( tex, 0 ).x );
	uvec2 uv;
	uv.x = index % width;
	uv.y = index / width;

	return texelFetch( tex, ivec2( uv ), 0 );

}

vec4 texelFetch1D( sampler2D tex, uint index ) {

	uint width = uint( textureSize( tex, 0 ).x );
	uvec2 uv;
	uv.x = index % width;
	uv.y = index / width;

	return texelFetch( tex, ivec2( uv ), 0 );

}

vec4 textureSampleBarycoord( sampler2D tex, vec3 barycoord, uvec3 faceIndices ) {

	return
		barycoord.x * texelFetch1D( tex, faceIndices.x ) +
		barycoord.y * texelFetch1D( tex, faceIndices.y ) +
		barycoord.z * texelFetch1D( tex, faceIndices.z );

}

void ndcToCameraRay(
	vec2 coord, mat4 cameraWorld, mat4 invProjectionMatrix,
	out vec3 rayOrigin, out vec3 rayDirection
) {

	// get camera look direction and near plane for camera clipping
	vec4 lookDirection = cameraWorld * vec4( 0.0, 0.0, - 1.0, 0.0 );
	vec4 nearVector = invProjectionMatrix * vec4( 0.0, 0.0, - 1.0, 1.0 );
	float near = abs( nearVector.z / nearVector.w );

	// get the camera direction and position from camera matrices
	vec4 origin = cameraWorld * vec4( 0.0, 0.0, 0.0, 1.0 );
	vec4 direction = invProjectionMatrix * vec4( coord, 0.5, 1.0 );
	direction /= direction.w;
	direction = cameraWorld * direction - origin;

	// slide the origin along the ray until it sits at the near clip plane position
	origin.xyz += direction.xyz * near / dot( direction, lookDirection );

	rayOrigin = origin.xyz;
	rayDirection = direction.xyz;

}
`;var mp=`

float dot2( vec3 v ) {

	return dot( v, v );

}

// implementation from https://www.shadertoy.com/view/ttfGWl, though method 2 has been removed
// and is now available at this fork: https://www.shadertoy.com/view/WlB3zW
vec3 closestPointToTriangle( vec3 p, vec3 v0, vec3 v1, vec3 v2, out vec3 barycoord ) {

    vec3 v10 = v1 - v0;
    vec3 v21 = v2 - v1;
    vec3 v02 = v0 - v2;

	vec3 p0 = p - v0;
	vec3 p1 = p - v1;
	vec3 p2 = p - v2;

    vec3 nor = cross( v10, v02 );

    // method 2, in barycentric space
    vec3  q = cross( nor, p0 );
    float d = 1.0 / dot2( nor );
    float u = d * dot( q, v02 );
    float v = d * dot( q, v10 );
    float w = 1.0 - u - v;

	if( u < 0.0 ) {

		w = clamp( dot( p2, v02 ) / dot2( v02 ), 0.0, 1.0 );
		u = 0.0;
		v = 1.0 - w;

	} else if( v < 0.0 ) {

		u = clamp( dot( p0, v10 ) / dot2( v10 ), 0.0, 1.0 );
		v = 0.0;
		w = 1.0 - u;

	} else if( w < 0.0 ) {

		v = clamp( dot( p1, v21 ) / dot2( v21 ), 0.0, 1.0 );
		w = 0.0;
		u = 1.0 - v;

	}

	// output the barycoord in v0, v1, v2 weight order
	barycoord = vec3( w, u, v );
    return u * v1 + v * v2 + w * v0;

}

float distanceToTriangles(
	// geometry info and triangle range
	sampler2D positionAttr, usampler2D indexAttr, uint offset, uint count,

	// point and cut off range
	vec3 point, float closestDistanceSquared,

	// outputs
	inout uvec4 faceIndices, inout vec3 faceNormal, inout vec3 barycoord, inout float side, inout vec3 outPoint
) {

	bool found = false;
	vec3 localBarycoord;
	for ( uint i = offset, l = offset + count; i < l; i ++ ) {

		uvec3 indices = uTexelFetch1D( indexAttr, i ).xyz;
		vec3 a = texelFetch1D( positionAttr, indices.x ).rgb;
		vec3 b = texelFetch1D( positionAttr, indices.y ).rgb;
		vec3 c = texelFetch1D( positionAttr, indices.z ).rgb;

		// get the closest point and barycoord
		vec3 closestPoint = closestPointToTriangle( point, a, b, c, localBarycoord );
		vec3 delta = point - closestPoint;
		float sqDist = dot2( delta );
		if ( sqDist < closestDistanceSquared ) {

			// set the output results
			closestDistanceSquared = sqDist;
			faceIndices = uvec4( indices.xyz, i );
			faceNormal = normalize( cross( a - b, b - c ) );
			barycoord = localBarycoord;
			outPoint = closestPoint;
			side = sign( dot( faceNormal, delta ) );

		}

	}

	return closestDistanceSquared;

}

float distanceSqToBounds( vec3 point, vec3 boundsMin, vec3 boundsMax ) {

	vec3 clampedPoint = clamp( point, boundsMin, boundsMax );
	vec3 delta = point - clampedPoint;
	return dot( delta, delta );

}

float distanceSqToBVHNodeBoundsPoint( vec3 point, sampler2D bvhBounds, uint currNodeIndex ) {

	uint cni2 = currNodeIndex * 2u;
	vec3 boundsMin = texelFetch1D( bvhBounds, cni2 ).xyz;
	vec3 boundsMax = texelFetch1D( bvhBounds, cni2 + 1u ).xyz;
	return distanceSqToBounds( point, boundsMin, boundsMax );

}

// use a macro to hide the fact that we need to expand the struct into separate fields
#define	bvhClosestPointToPoint(		bvh,		point, maxDistance, faceIndices, faceNormal, barycoord, side, outPoint	)	_bvhClosestPointToPoint(		bvh.position, bvh.index, bvh.bvhBounds, bvh.bvhContents,		point, maxDistance, faceIndices, faceNormal, barycoord, side, outPoint	)

float _bvhClosestPointToPoint(
	// bvh info
	sampler2D bvh_position, usampler2D bvh_index, sampler2D bvh_bvhBounds, usampler2D bvh_bvhContents,

	// point to check
	vec3 point, float maxDistance,

	// output variables
	inout uvec4 faceIndices, inout vec3 faceNormal, inout vec3 barycoord,
	inout float side, inout vec3 outPoint
 ) {

	// stack needs to be twice as long as the deepest tree we expect because
	// we push both the left and right child onto the stack every traversal
	int pointer = 0;
	uint stack[ BVH_STACK_DEPTH ];
	stack[ 0 ] = 0u;

	float closestDistanceSquared = maxDistance * maxDistance;
	bool found = false;
	while ( pointer > - 1 && pointer < BVH_STACK_DEPTH ) {

		uint currNodeIndex = stack[ pointer ];
		pointer --;

		// check if we intersect the current bounds
		float boundsHitDistance = distanceSqToBVHNodeBoundsPoint( point, bvh_bvhBounds, currNodeIndex );
		if ( boundsHitDistance > closestDistanceSquared ) {

			continue;

		}

		uvec2 boundsInfo = uTexelFetch1D( bvh_bvhContents, currNodeIndex ).xy;
		bool isLeaf = bool( boundsInfo.x & 0xffff0000u );
		if ( isLeaf ) {

			uint count = boundsInfo.x & 0x0000ffffu;
			uint offset = boundsInfo.y;
			closestDistanceSquared = distanceToTriangles(
				bvh_position, bvh_index, offset, count, point, closestDistanceSquared,

				// outputs
				faceIndices, faceNormal, barycoord, side, outPoint
			);

		} else {

			uint leftIndex = currNodeIndex + 1u;
			uint splitAxis = boundsInfo.x & 0x0000ffffu;
			uint rightIndex = currNodeIndex + boundsInfo.y;
			bool leftToRight = distanceSqToBVHNodeBoundsPoint( point, bvh_bvhBounds, leftIndex ) < distanceSqToBVHNodeBoundsPoint( point, bvh_bvhBounds, rightIndex );//rayDirection[ splitAxis ] >= 0.0;
			uint c1 = leftToRight ? leftIndex : rightIndex;
			uint c2 = leftToRight ? rightIndex : leftIndex;

			// set c2 in the stack so we traverse it later. We need to keep track of a pointer in
			// the stack while we traverse. The second pointer added is the one that will be
			// traversed first
			pointer ++;
			stack[ pointer ] = c2;
			pointer ++;
			stack[ pointer ] = c1;

		}

	}

	return sqrt( closestDistanceSquared );

}
`;var El=`

#ifndef TRI_INTERSECT_EPSILON
#define TRI_INTERSECT_EPSILON 1e-5
#endif

// Raycasting
bool intersectsBounds( vec3 rayOrigin, vec3 rayDirection, vec3 boundsMin, vec3 boundsMax, out float dist ) {

	// https://www.reddit.com/r/opengl/comments/8ntzz5/fast_glsl_ray_box_intersection/
	// https://tavianator.com/2011/ray_box.html
	vec3 invDir = 1.0 / rayDirection;

	// find intersection distances for each plane
	vec3 tMinPlane = invDir * ( boundsMin - rayOrigin );
	vec3 tMaxPlane = invDir * ( boundsMax - rayOrigin );

	// get the min and max distances from each intersection
	vec3 tMinHit = min( tMaxPlane, tMinPlane );
	vec3 tMaxHit = max( tMaxPlane, tMinPlane );

	// get the furthest hit distance
	vec2 t = max( tMinHit.xx, tMinHit.yz );
	float t0 = max( t.x, t.y );

	// get the minimum hit distance
	t = min( tMaxHit.xx, tMaxHit.yz );
	float t1 = min( t.x, t.y );

	// set distance to 0.0 if the ray starts inside the box
	dist = max( t0, 0.0 );

	return t1 >= dist;

}

bool intersectsTriangle(
	vec3 rayOrigin, vec3 rayDirection, vec3 a, vec3 b, vec3 c,
	out vec3 barycoord, out vec3 norm, out float dist, out float side
) {

	// https://stackoverflow.com/questions/42740765/intersection-between-line-and-triangle-in-3d
	vec3 edge1 = b - a;
	vec3 edge2 = c - a;
	norm = cross( edge1, edge2 );

	float det = - dot( rayDirection, norm );
	float invdet = 1.0 / det;

	vec3 AO = rayOrigin - a;
	vec3 DAO = cross( AO, rayDirection );

	vec4 uvt;
	uvt.x = dot( edge2, DAO ) * invdet;
	uvt.y = - dot( edge1, DAO ) * invdet;
	uvt.z = dot( AO, norm ) * invdet;
	uvt.w = 1.0 - uvt.x - uvt.y;

	// set the hit information
	barycoord = uvt.wxy; // arranged in A, B, C order
	dist = uvt.z;
	side = sign( det );
	norm = side * normalize( norm );

	// add an epsilon to avoid misses between triangles
	uvt += vec4( TRI_INTERSECT_EPSILON );

	return all( greaterThanEqual( uvt, vec4( 0.0 ) ) );

}

bool intersectTriangles(
	// geometry info and triangle range
	sampler2D positionAttr, usampler2D indexAttr, uint offset, uint count,

	// ray
	vec3 rayOrigin, vec3 rayDirection,

	// outputs
	inout float minDistance, inout uvec4 faceIndices, inout vec3 faceNormal, inout vec3 barycoord,
	inout float side, inout float dist
) {

	bool found = false;
	vec3 localBarycoord, localNormal;
	float localDist, localSide;
	for ( uint i = offset, l = offset + count; i < l; i ++ ) {

		uvec3 indices = uTexelFetch1D( indexAttr, i ).xyz;
		vec3 a = texelFetch1D( positionAttr, indices.x ).rgb;
		vec3 b = texelFetch1D( positionAttr, indices.y ).rgb;
		vec3 c = texelFetch1D( positionAttr, indices.z ).rgb;

		if (
			intersectsTriangle( rayOrigin, rayDirection, a, b, c, localBarycoord, localNormal, localDist, localSide )
			&& localDist < minDistance
		) {

			found = true;
			minDistance = localDist;

			faceIndices = uvec4( indices.xyz, i );
			faceNormal = localNormal;

			side = localSide;
			barycoord = localBarycoord;
			dist = localDist;

		}

	}

	return found;

}

bool intersectsBVHNodeBounds( vec3 rayOrigin, vec3 rayDirection, sampler2D bvhBounds, uint currNodeIndex, out float dist ) {

	uint cni2 = currNodeIndex * 2u;
	vec3 boundsMin = texelFetch1D( bvhBounds, cni2 ).xyz;
	vec3 boundsMax = texelFetch1D( bvhBounds, cni2 + 1u ).xyz;
	return intersectsBounds( rayOrigin, rayDirection, boundsMin, boundsMax, dist );

}

// use a macro to hide the fact that we need to expand the struct into separate fields
#define	bvhIntersectFirstHit(		bvh,		rayOrigin, rayDirection, faceIndices, faceNormal, barycoord, side, dist	)	_bvhIntersectFirstHit(		bvh.position, bvh.index, bvh.bvhBounds, bvh.bvhContents,		rayOrigin, rayDirection, faceIndices, faceNormal, barycoord, side, dist	)

bool _bvhIntersectFirstHit(
	// bvh info
	sampler2D bvh_position, usampler2D bvh_index, sampler2D bvh_bvhBounds, usampler2D bvh_bvhContents,

	// ray
	vec3 rayOrigin, vec3 rayDirection,

	// output variables split into separate variables due to output precision
	inout uvec4 faceIndices, inout vec3 faceNormal, inout vec3 barycoord,
	inout float side, inout float dist
) {

	// stack needs to be twice as long as the deepest tree we expect because
	// we push both the left and right child onto the stack every traversal
	int pointer = 0;
	uint stack[ BVH_STACK_DEPTH ];
	stack[ 0 ] = 0u;

	float triangleDistance = INFINITY;
	bool found = false;
	while ( pointer > - 1 && pointer < BVH_STACK_DEPTH ) {

		uint currNodeIndex = stack[ pointer ];
		pointer --;

		// check if we intersect the current bounds
		float boundsHitDistance;
		if (
			! intersectsBVHNodeBounds( rayOrigin, rayDirection, bvh_bvhBounds, currNodeIndex, boundsHitDistance )
			|| boundsHitDistance > triangleDistance
		) {

			continue;

		}

		uvec2 boundsInfo = uTexelFetch1D( bvh_bvhContents, currNodeIndex ).xy;
		bool isLeaf = bool( boundsInfo.x & 0xffff0000u );

		if ( isLeaf ) {

			uint count = boundsInfo.x & 0x0000ffffu;
			uint offset = boundsInfo.y;

			found = intersectTriangles(
				bvh_position, bvh_index, offset, count,
				rayOrigin, rayDirection, triangleDistance,
				faceIndices, faceNormal, barycoord, side, dist
			) || found;

		} else {

			uint leftIndex = currNodeIndex + 1u;
			uint splitAxis = boundsInfo.x & 0x0000ffffu;
			uint rightIndex = currNodeIndex + boundsInfo.y;

			bool leftToRight = rayDirection[ splitAxis ] >= 0.0;
			uint c1 = leftToRight ? leftIndex : rightIndex;
			uint c2 = leftToRight ? rightIndex : leftIndex;

			// set c2 in the stack so we traverse it later. We need to keep track of a pointer in
			// the stack while we traverse. The second pointer added is the one that will be
			// traversed first
			pointer ++;
			stack[ pointer ] = c2;

			pointer ++;
			stack[ pointer ] = c1;

		}

	}

	return found;

}
`;var gp=`
struct BVH {

	usampler2D index;
	sampler2D position;

	sampler2D bvhBounds;
	usampler2D bvhContents;

};
`;var SP=`
	${bl}
	${El}
`;function ba(t,e,n=0){if(t.isInterleavedBufferAttribute){let i=t.itemSize;for(let r=0,o=t.count;r<o;r++){let a=r+n;e.setX(a,t.getX(r)),i>=2&&e.setY(a,t.getY(r)),i>=3&&e.setZ(a,t.getZ(r)),i>=4&&e.setW(a,t.getW(r))}}else{let i=e.array,r=i.constructor,o=i.BYTES_PER_ELEMENT*t.itemSize*n;new r(i.buffer,o,t.array.length).set(t.array)}}function Li(t,e=null){let n=t.array.constructor,i=t.normalized,r=t.itemSize,o=e===null?t.count:e;return new Tt(new n(r*o),r,i)}function li(t,e){if(!t&&!e)return!0;if(!!t!=!!e)return!1;let n=t.count===e.count,i=t.normalized===e.normalized,r=t.array.constructor===e.array.constructor,o=t.itemSize===e.itemSize;return!(!n||!i||!r||!o)}function TS(t){let e=t[0].index!==null,n=new Set(Object.keys(t[0].attributes));if(!t[0].getAttribute("position"))throw new Error("StaticGeometryGenerator: position attribute is required.");for(let i=0;i<t.length;++i){let r=t[i],o=0;if(e!==(r.index!==null))throw new Error("StaticGeometryGenerator: All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them.");for(let a in r.attributes){if(!n.has(a))throw new Error('StaticGeometryGenerator: All geometries must have compatible attributes; make sure "'+a+'" attribute exists among all geometries, or in none of them.');o++}if(o!==n.size)throw new Error("StaticGeometryGenerator: All geometries must have the same number of attributes.")}}function bS(t){let e=0;for(let n=0,i=t.length;n<i;n++)e+=t[n].getIndex().count;return e}function ES(t){let e=0;for(let n=0,i=t.length;n<i;n++)e+=t[n].getAttribute("position").count;return e}function yS(t,e,n){t.index&&t.index.count!==e&&t.setIndex(null);let i=t.attributes;for(let r in i)i[r].count!==n&&t.deleteAttribute(r)}function _p(t,e={},n=new Xt){let{useGroups:i=!1,forceUpdate:r=!1,skipAssigningAttributes:o=[],overwriteIndex:a=!0}=e;TS(t);let c=t[0].index!==null,l=c?bS(t):-1,f=ES(t);if(yS(n,l,f),i){let u=0;for(let s=0,h=t.length;s<h;s++){let g=t[s],b;c?b=g.getIndex().count:b=g.getAttribute("position").count,n.addGroup(u,b,s),u+=b}}if(c){let u=!1;if(n.index||(n.setIndex(new Tt(new Uint32Array(l),1,!1)),u=!0),u||a){let s=0,h=0,g=n.getIndex();for(let b=0,d=t.length;b<d;b++){let m=t[b],_=m.getIndex();if(!(!r&&!u&&o[b]))for(let v=0;v<_.count;++v)g.setX(s+v,_.getX(v)+h);s+=_.count,h+=m.getAttribute("position").count}}}let p=Object.keys(t[0].attributes);for(let u=0,s=p.length;u<s;u++){let h=!1,g=p[u];if(!n.getAttribute(g)){let m=t[0].getAttribute(g);n.setAttribute(g,Li(m,f)),h=!0}let b=0,d=n.getAttribute(g);for(let m=0,_=t.length;m<_;m++){let E=t[m],v=!r&&!h&&o[m],T=E.getAttribute(g);if(!v)if(g==="color"&&d.itemSize!==T.itemSize)for(let M=b,R=T.count;M<R;M++)T.setXYZW(M,d.getX(M),d.getY(M),d.getZ(M),1);else ba(T,d,b);b+=T.count}}}function vp(t,e,n){let i=t.index,o=t.attributes.position.count,a=i?i.count:o,c=t.groups;c.length===0&&(c=[{count:a,start:0,materialIndex:0}]);let l=t.getAttribute("materialIndex");if(!l||l.count!==o){let p;n.length<=255?p=new Uint8Array(o):p=new Uint16Array(o),l=new Tt(p,1,!1),t.deleteAttribute("materialIndex"),t.setAttribute("materialIndex",l)}let f=l.array;for(let p=0;p<c.length;p++){let u=c[p],s=u.start,h=u.count,g=Math.min(h,a-s),b=Array.isArray(e)?e[u.materialIndex]:e,d=n.indexOf(b);for(let m=0;m<g;m++){let _=s+m;i&&(_=i.getX(_)),f[_]=d}}}function xp(t,e){if(!t.index){let n=t.attributes.position.count,i=new Array(n);for(let r=0;r<n;r++)i[r]=r;t.setIndex(i)}if(!t.attributes.normal&&e&&e.includes("normal")&&t.computeVertexNormals(),!t.attributes.uv&&e&&e.includes("uv")){let n=t.attributes.position.count;t.setAttribute("uv",new Tt(new Float32Array(n*2),2,!1))}if(!t.attributes.uv2&&e&&e.includes("uv2")){let n=t.attributes.position.count;t.setAttribute("uv2",new Tt(new Float32Array(n*2),2,!1))}if(!t.attributes.tangent&&e&&e.includes("tangent"))if(t.attributes.uv&&t.attributes.normal)t.computeTangents();else{let n=t.attributes.position.count;t.setAttribute("tangent",new Tt(new Float32Array(n*4),4,!1))}if(!t.attributes.color&&e&&e.includes("color")){let n=t.attributes.position.count,i=new Float32Array(n*4);i.fill(1),t.setAttribute("color",new Tt(i,4))}}function vr(t){let e=0;if(t.byteLength!==0){let n=new Uint8Array(t);for(let i=0;i<t.byteLength;i++){let r=n[i];e=(e<<5)-e+r,e|=0}}return e}function Sp(t){let e=t.uuid,n=Object.values(t.attributes);t.index&&(n.push(t.index),e+=`index|${t.index.version}`);let i=Object.keys(n).sort();for(let r of i){let o=n[r];e+=`${r}_${o.version}|`}return e}function Tp(t){let e=t.skeleton;return e?(e.boneTexture||e.computeBoneTexture(),`${vr(e.boneTexture.image.data.buffer)}_${e.boneTexture.uuid}`):null}var Ea=class{constructor(e=null){this.matrixWorld=new $e,this.geometryHash=null,this.skeletonHash=null,this.primitiveCount=-1,e!==null&&this.updateFrom(e)}updateFrom(e){let n=e.geometry,i=(n.index?n.index.count:n.attributes.position.count)/3;this.matrixWorld.copy(e.matrixWorld),this.geometryHash=Sp(n),this.primitiveCount=i,this.skeletonHash=Tp(e)}didChange(e){let n=e.geometry,i=(n.index?n.index.count:n.attributes.position.count)/3;return!(this.matrixWorld.equals(e.matrixWorld)&&this.geometryHash===Sp(n)&&this.skeletonHash===Tp(e)&&this.primitiveCount===i)}};var Ni=new j,Ui=new j,Fi=new j,bp=new At,ya=new j,yl=new j,Ep=new At,yp=new At,Ma=new $e,Mp=new $e;function Ap(t,e,n){let i=t.skeleton,r=t.geometry,o=i.bones,a=i.boneInverses;Ep.fromBufferAttribute(r.attributes.skinIndex,e),yp.fromBufferAttribute(r.attributes.skinWeight,e),Ma.elements.fill(0);for(let c=0;c<4;c++){let l=yp.getComponent(c);if(l!==0){let f=Ep.getComponent(c);Mp.multiplyMatrices(o[f].matrixWorld,a[f]),MS(Ma,Mp,l)}}return Ma.multiply(t.bindMatrix).premultiply(t.bindMatrixInverse),n.transformDirection(Ma),n}function Ml(t,e,n,i,r){ya.set(0,0,0);for(let o=0,a=t.length;o<a;o++){let c=e[o],l=t[o];c!==0&&(yl.fromBufferAttribute(l,i),n?ya.addScaledVector(yl,c):ya.addScaledVector(yl.sub(r),c))}r.add(ya)}function MS(t,e,n){let i=t.elements,r=e.elements;for(let o=0,a=r.length;o<a;o++)i[o]+=r[o]*n}function AS(t){let{index:e,attributes:n}=t;if(e)for(let i=0,r=e.count;i<r;i+=3){let o=e.getX(i),a=e.getX(i+2);e.setX(i,a),e.setX(i+2,o)}else for(let i in n){let r=n[i],o=r.itemSize;for(let a=0,c=r.count;a<c;a+=3)for(let l=0;l<o;l++){let f=r.getComponent(a,l),p=r.getComponent(a+2,l);r.setComponent(a,l,p),r.setComponent(a+2,l,f)}}return t}function wp(t,e={},n=new Xt){e={applyWorldTransforms:!0,attributes:[],...e};let i=t.geometry,r=e.applyWorldTransforms,o=e.attributes.includes("normal"),a=e.attributes.includes("tangent"),c=i.attributes,l=n.attributes;for(let _ in n.attributes)(!e.attributes.includes(_)||!(_ in i.attributes))&&n.deleteAttribute(_);!n.index&&i.index&&(n.index=i.index.clone()),l.position||n.setAttribute("position",Li(c.position)),o&&!l.normal&&c.normal&&n.setAttribute("normal",Li(c.normal)),a&&!l.tangent&&c.tangent&&n.setAttribute("tangent",Li(c.tangent)),li(i.index,n.index),li(c.position,l.position),o&&li(c.normal,l.normal),a&&li(c.tangent,l.tangent);let f=c.position,p=o?c.normal:null,u=a?c.tangent:null,s=i.morphAttributes.position,h=i.morphAttributes.normal,g=i.morphAttributes.tangent,b=i.morphTargetsRelative,d=t.morphTargetInfluences,m=new He;m.getNormalMatrix(t.matrixWorld),i.index&&n.index.array.set(i.index.array);for(let _=0,E=c.position.count;_<E;_++)Ni.fromBufferAttribute(f,_),p&&Ui.fromBufferAttribute(p,_),u&&(bp.fromBufferAttribute(u,_),Fi.fromBufferAttribute(u,_)),d&&(s&&Ml(s,d,b,_,Ni),h&&Ml(h,d,b,_,Ui),g&&Ml(g,d,b,_,Fi)),t.isSkinnedMesh&&(t.applyBoneTransform(_,Ni),p&&Ap(t,_,Ui),u&&Ap(t,_,Fi)),r&&Ni.applyMatrix4(t.matrixWorld),l.position.setXYZ(_,Ni.x,Ni.y,Ni.z),p&&(r&&Ui.applyNormalMatrix(m),l.normal.setXYZ(_,Ui.x,Ui.y,Ui.z)),u&&(r&&Fi.transformDirection(t.matrixWorld),l.tangent.setXYZW(_,Fi.x,Fi.y,Fi.z,bp.w));for(let _ in e.attributes){let E=e.attributes[_];E==="position"||E==="tangent"||E==="normal"||!(E in c)||(l[E]||n.setAttribute(E,Li(c[E])),li(c[E],l[E]),ba(c[E],l[E]))}return t.matrixWorld.determinant()<0&&AS(n),n}var Aa=class extends Xt{constructor(){super(),this.version=0,this.hash=null,this._diff=new Ea}isCompatible(e,n){let i=e.geometry;for(let r=0;r<n.length;r++){let o=n[r],a=i.attributes[o],c=this.attributes[o];if(a&&!li(a,c))return!1}return!0}updateFrom(e,n){let i=this._diff;return i.didChange(e)?(wp(e,n,this),i.updateFrom(e),this.version++,this.hash=`${this.uuid}_${this.version}`,!0):!1}};var Ra=0,Al=1,wl=2;function wS(t,e){for(let n=0,i=t.length;n<i;n++)t[n].traverseVisible(o=>{o.isMesh&&e(o)})}function RS(t){let e=[];for(let n=0,i=t.length;n<i;n++){let r=t[n];Array.isArray(r.material)?e.push(...r.material):e.push(r.material)}return e}function PS(t,e,n){if(t.length===0){e.setIndex(null);let i=e.attributes;for(let r in i)e.deleteAttribute(r);for(let r in n.attributes)e.setAttribute(n.attributes[r],new Tt(new Float32Array(0),4,!1))}else _p(t,n,e);for(let i in e.attributes)e.attributes[i].needsUpdate=!0}var wa=class{constructor(e){this.objects=null,this.useGroups=!0,this.applyWorldTransforms=!0,this.generateMissingAttributes=!0,this.overwriteIndex=!0,this.attributes=["position","normal","color","tangent","uv","uv2"],this._intermediateGeometry=new Map,this._geometryMergeSets=new WeakMap,this._mergeOrder=[],this._dummyMesh=null,this.setObjects(e||[])}_getDummyMesh(){if(!this._dummyMesh){let e=new Vo,n=new Xt;n.setAttribute("position",new Tt(new Float32Array(9),3)),this._dummyMesh=new hn(n,e)}return this._dummyMesh}_getMeshes(){let e=[];return wS(this.objects,n=>{e.push(n)}),e.sort((n,i)=>n.uuid>i.uuid?1:n.uuid<i.uuid?-1:0),e.length===0&&e.push(this._getDummyMesh()),e}_updateIntermediateGeometries(){let{_intermediateGeometry:e}=this,n=this._getMeshes(),i=new Set(e.keys()),r={attributes:this.attributes,applyWorldTransforms:this.applyWorldTransforms};for(let o=0,a=n.length;o<a;o++){let c=n[o],l=c.uuid;i.delete(l);let f=e.get(l);(!f||!f.isCompatible(c,this.attributes))&&(f&&f.dispose(),f=new Aa,e.set(l,f)),f.updateFrom(c,r)&&this.generateMissingAttributes&&xp(f,this.attributes)}i.forEach(o=>{e.delete(o)})}setObjects(e){Array.isArray(e)?this.objects=[...e]:this.objects=[e]}generate(e=new Xt){let{useGroups:n,overwriteIndex:i,_intermediateGeometry:r,_geometryMergeSets:o}=this,a=this._getMeshes(),c=[],l=[],f=o.get(e)||[];this._updateIntermediateGeometries();let p=!1;a.length!==f.length&&(p=!0);for(let s=0,h=a.length;s<h;s++){let g=a[s],b=r.get(g.uuid);l.push(b);let d=f[s];!d||d.uuid!==b.uuid?(c.push(!1),p=!0):d.version!==b.version?c.push(!1):c.push(!0)}PS(l,e,{useGroups:n,forceUpdate:p,skipAssigningAttributes:c,overwriteIndex:i}),p&&e.dispose(),o.set(e,l.map(s=>({version:s.version,uuid:s.uuid})));let u=Ra;return p?u=wl:c.includes(!1)&&(u=Al),{changeType:u,materials:RS(a),geometry:e}}};function CS(t){let e=new Set;for(let n=0,i=t.length;n<i;n++){let r=t[n];for(let o in r){let a=r[o];a&&a.isTexture&&e.add(a)}}return Array.from(e)}function IS(t){let e=[],n=new Set;for(let r=0,o=t.length;r<o;r++)t[r].traverse(a=>{a.visible&&(a.isRectAreaLight||a.isSpotLight||a.isPointLight||a.isDirectionalLight)&&(e.push(a),a.iesMap&&n.add(a.iesMap))});let i=Array.from(n).sort((r,o)=>r.uuid<o.uuid?1:r.uuid>o.uuid?-1:0);return{lights:e,iesTextures:i}}var Pa=class{get initialized(){return!!this.bvh}constructor(e){this.bvhOptions={},this.attributes=["position","normal","tangent","color","uv","uv2"],this.generateBVH=!0,this.bvh=null,this.geometry=new Xt,this.staticGeometryGenerator=new wa(e),this._bvhWorker=null,this._pendingGenerate=null,this._buildAsync=!1,this._materialUuids=null}setObjects(e){this.staticGeometryGenerator.setObjects(e)}setBVHWorker(e){this._bvhWorker=e}async generateAsync(e=null){if(!this._bvhWorker)throw new Error('PathTracingSceneGenerator: "setBVHWorker" must be called before "generateAsync" can be called.');if(this.bvh instanceof Promise)return this._pendingGenerate||(this._pendingGenerate=new Promise(async()=>(await this.bvh,this._pendingGenerate=null,this.generateAsync(e)))),this._pendingGenerate;{this._buildAsync=!0;let n=this.generate(e);return this._buildAsync=!1,n.bvh=this.bvh=await n.bvh,n}}generate(e=null){let{staticGeometryGenerator:n,geometry:i,attributes:r}=this,o=n.objects;n.attributes=r,o.forEach(s=>{s.traverse(h=>{h.isSkinnedMesh&&h.skeleton&&h.skeleton.update()})});let a=n.generate(i),c=a.materials,l=a.changeType!==Ra||this._materialUuids===null||this._materialUuids.length!==length;if(!l){for(let s=0,h=c.length;s<h;s++)if(c[s].uuid!==this._materialUuids[s]){l=!0;break}}let f=CS(c),{lights:p,iesTextures:u}=IS(o);if(l&&(vp(i,c,c),this._materialUuids=c.map(s=>s.uuid)),this.generateBVH){if(this.bvh instanceof Promise)throw new Error("PathTracingSceneGenerator: BVH is already building asynchronously.");if(a.changeType===wl){let s={strategy:2,maxLeafTris:1,indirect:!0,onProgress:e,...this.bvhOptions};this._buildAsync?this.bvh=this._bvhWorker.generate(i,s):this.bvh=new mr(i,s)}else a.changeType===Al&&this.bvh.refit()}return{bvhChanged:a.changeType!==Ra,bvh:this.bvh,needsMaterialIndexUpdate:l,lights:p,iesTextures:u,geometry:i,materials:c,textures:f,objects:o}}};var DS=new Wr(-1,1,1,-1,0,1),Rl=class extends Xt{constructor(){super(),this.setAttribute("position",new Zi([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new Zi([0,2,0,0,2,0],2))}},LS=new Rl,Tn=class{constructor(e){this._mesh=new hn(LS,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,DS)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}};var ui=class extends qt{set needsUpdate(e){super.needsUpdate=!0,this.dispatchEvent({type:"recompilation"})}constructor(e){super(e);for(let n in this.uniforms)Object.defineProperty(this,n,{get(){return this.uniforms[n].value},set(i){this.uniforms[n].value=i}})}setDefine(e,n=void 0){if(n==null){if(e in this.defines)return delete this.defines[e],this.needsUpdate=!0,!0}else if(this.defines[e]!==n)return this.defines[e]=n,this.needsUpdate=!0,!0;return!1}};var Ca=class extends ui{constructor(e){super({blending:Ot,uniforms:{target1:{value:null},target2:{value:null},opacity:{value:1}},vertexShader:`

				varying vec2 vUv;

				void main() {

					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

				}`,fragmentShader:`

				uniform float opacity;

				uniform sampler2D target1;
				uniform sampler2D target2;

				varying vec2 vUv;

				void main() {

					vec4 color1 = texture2D( target1, vUv );
					vec4 color2 = texture2D( target2, vUv );

					float invOpacity = 1.0 - opacity;
					float totalAlpha = color1.a * invOpacity + color2.a * opacity;

					if ( color1.a != 0.0 || color2.a != 0.0 ) {

						gl_FragColor.rgb = color1.rgb * ( invOpacity * color1.a / totalAlpha ) + color2.rgb * ( opacity * color2.a / totalAlpha );
						gl_FragColor.a = totalAlpha;

					} else {

						gl_FragColor = vec4( 0.0 );

					}

				}`}),this.setValues(e)}};function Ia(t=1){let e="uint";return t>1&&(e="uvec"+t),`
		${e} sobolReverseBits( ${e} x ) {

			x = ( ( ( x & 0xaaaaaaaau ) >> 1 ) | ( ( x & 0x55555555u ) << 1 ) );
			x = ( ( ( x & 0xccccccccu ) >> 2 ) | ( ( x & 0x33333333u ) << 2 ) );
			x = ( ( ( x & 0xf0f0f0f0u ) >> 4 ) | ( ( x & 0x0f0f0f0fu ) << 4 ) );
			x = ( ( ( x & 0xff00ff00u ) >> 8 ) | ( ( x & 0x00ff00ffu ) << 8 ) );
			return ( ( x >> 16 ) | ( x << 16 ) );

		}

		${e} sobolHashCombine( uint seed, ${e} v ) {

			return seed ^ ( v + ${e}( ( seed << 6 ) + ( seed >> 2 ) ) );

		}

		${e} sobolLaineKarrasPermutation( ${e} x, ${e} seed ) {

			x += seed;
			x ^= x * 0x6c50b47cu;
			x ^= x * 0xb82f1e52u;
			x ^= x * 0xc7afe638u;
			x ^= x * 0x8d22f6e6u;
			return x;

		}

		${e} nestedUniformScrambleBase2( ${e} x, ${e} seed ) {

			x = sobolLaineKarrasPermutation( x, seed );
			x = sobolReverseBits( x );
			return x;

		}
	`}function Da(t=1){let e="uint",n="float",i="",r=".r",o="1u";return t>1&&(e="uvec"+t,n="vec"+t,i=t+"",t===2?(r=".rg",o="uvec2( 1u, 2u )"):t===3?(r=".rgb",o="uvec3( 1u, 2u, 3u )"):(r="",o="uvec4( 1u, 2u, 3u, 4u )")),`

		${n} sobol${i}( int effect ) {

			uint seed = sobolGetSeed( sobolBounceIndex, uint( effect ) );
			uint index = sobolPathIndex;

			uint shuffle_seed = sobolHashCombine( seed, 0u );
			uint shuffled_index = nestedUniformScrambleBase2( sobolReverseBits( index ), shuffle_seed );
			${n} sobol_pt = sobolGetTexturePoint( shuffled_index )${r};
			${e} result = ${e}( sobol_pt * 16777216.0 );

			${e} seed2 = sobolHashCombine( seed, ${o} );
			result = nestedUniformScrambleBase2( result, seed2 );

			return SOBOL_FACTOR * ${n}( result >> 8 );

		}
	`}var La=`

	// Utils
	const float SOBOL_FACTOR = 1.0 / 16777216.0;
	const uint SOBOL_MAX_POINTS = 256u * 256u;

	${Ia(1)}
	${Ia(2)}
	${Ia(3)}
	${Ia(4)}

	uint sobolHash( uint x ) {

		// finalizer from murmurhash3
		x ^= x >> 16;
		x *= 0x85ebca6bu;
		x ^= x >> 13;
		x *= 0xc2b2ae35u;
		x ^= x >> 16;
		return x;

	}

`,Rp=`

	const uint SOBOL_DIRECTIONS_1[ 32 ] = uint[ 32 ](
		0x80000000u, 0xc0000000u, 0xa0000000u, 0xf0000000u,
		0x88000000u, 0xcc000000u, 0xaa000000u, 0xff000000u,
		0x80800000u, 0xc0c00000u, 0xa0a00000u, 0xf0f00000u,
		0x88880000u, 0xcccc0000u, 0xaaaa0000u, 0xffff0000u,
		0x80008000u, 0xc000c000u, 0xa000a000u, 0xf000f000u,
		0x88008800u, 0xcc00cc00u, 0xaa00aa00u, 0xff00ff00u,
		0x80808080u, 0xc0c0c0c0u, 0xa0a0a0a0u, 0xf0f0f0f0u,
		0x88888888u, 0xccccccccu, 0xaaaaaaaau, 0xffffffffu
	);

	const uint SOBOL_DIRECTIONS_2[ 32 ] = uint[ 32 ](
		0x80000000u, 0xc0000000u, 0x60000000u, 0x90000000u,
		0xe8000000u, 0x5c000000u, 0x8e000000u, 0xc5000000u,
		0x68800000u, 0x9cc00000u, 0xee600000u, 0x55900000u,
		0x80680000u, 0xc09c0000u, 0x60ee0000u, 0x90550000u,
		0xe8808000u, 0x5cc0c000u, 0x8e606000u, 0xc5909000u,
		0x6868e800u, 0x9c9c5c00u, 0xeeee8e00u, 0x5555c500u,
		0x8000e880u, 0xc0005cc0u, 0x60008e60u, 0x9000c590u,
		0xe8006868u, 0x5c009c9cu, 0x8e00eeeeu, 0xc5005555u
	);

	const uint SOBOL_DIRECTIONS_3[ 32 ] = uint[ 32 ](
		0x80000000u, 0xc0000000u, 0x20000000u, 0x50000000u,
		0xf8000000u, 0x74000000u, 0xa2000000u, 0x93000000u,
		0xd8800000u, 0x25400000u, 0x59e00000u, 0xe6d00000u,
		0x78080000u, 0xb40c0000u, 0x82020000u, 0xc3050000u,
		0x208f8000u, 0x51474000u, 0xfbea2000u, 0x75d93000u,
		0xa0858800u, 0x914e5400u, 0xdbe79e00u, 0x25db6d00u,
		0x58800080u, 0xe54000c0u, 0x79e00020u, 0xb6d00050u,
		0x800800f8u, 0xc00c0074u, 0x200200a2u, 0x50050093u
	);

	const uint SOBOL_DIRECTIONS_4[ 32 ] = uint[ 32 ](
		0x80000000u, 0x40000000u, 0x20000000u, 0xb0000000u,
		0xf8000000u, 0xdc000000u, 0x7a000000u, 0x9d000000u,
		0x5a800000u, 0x2fc00000u, 0xa1600000u, 0xf0b00000u,
		0xda880000u, 0x6fc40000u, 0x81620000u, 0x40bb0000u,
		0x22878000u, 0xb3c9c000u, 0xfb65a000u, 0xddb2d000u,
		0x78022800u, 0x9c0b3c00u, 0x5a0fb600u, 0x2d0ddb00u,
		0xa2878080u, 0xf3c9c040u, 0xdb65a020u, 0x6db2d0b0u,
		0x800228f8u, 0x400b3cdcu, 0x200fb67au, 0xb00ddb9du
	);

	uint getMaskedSobol( uint index, uint directions[ 32 ] ) {

		uint X = 0u;
		for ( int bit = 0; bit < 32; bit ++ ) {

			uint mask = ( index >> bit ) & 1u;
			X ^= mask * directions[ bit ];

		}
		return X;

	}

	vec4 generateSobolPoint( uint index ) {

		if ( index >= SOBOL_MAX_POINTS ) {

			return vec4( 0.0 );

		}

		// NOTE: this sobol "direction" is also available but we can't write out 5 components
		// uint x = index & 0x00ffffffu;
		uint x = sobolReverseBits( getMaskedSobol( index, SOBOL_DIRECTIONS_1 ) ) & 0x00ffffffu;
		uint y = sobolReverseBits( getMaskedSobol( index, SOBOL_DIRECTIONS_2 ) ) & 0x00ffffffu;
		uint z = sobolReverseBits( getMaskedSobol( index, SOBOL_DIRECTIONS_3 ) ) & 0x00ffffffu;
		uint w = sobolReverseBits( getMaskedSobol( index, SOBOL_DIRECTIONS_4 ) ) & 0x00ffffffu;

		return vec4( x, y, z, w ) * SOBOL_FACTOR;

	}

`,Pp=`

	// Seeds
	uniform sampler2D sobolTexture;
	uint sobolPixelIndex = 0u;
	uint sobolPathIndex = 0u;
	uint sobolBounceIndex = 0u;

	uint sobolGetSeed( uint bounce, uint effect ) {

		return sobolHash(
			sobolHashCombine(
				sobolHashCombine(
					sobolHash( bounce ),
					sobolPixelIndex
				),
				effect
			)
		);

	}

	vec4 sobolGetTexturePoint( uint index ) {

		if ( index >= SOBOL_MAX_POINTS ) {

			index = index % SOBOL_MAX_POINTS;

		}

		uvec2 dim = uvec2( textureSize( sobolTexture, 0 ).xy );
		uint y = index / dim.x;
		uint x = index - y * dim.x;
		vec2 uv = vec2( x, y ) / vec2( dim );
		return texture( sobolTexture, uv );

	}

	${Da(1)}
	${Da(2)}
	${Da(3)}
	${Da(4)}

`;var Pl=class extends ui{constructor(){super({blending:Ot,uniforms:{resolution:{value:new Ne}},vertexShader:`

				varying vec2 vUv;
				void main() {

					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

				}
			`,fragmentShader:`

				${La}
				${Rp}

				varying vec2 vUv;
				uniform vec2 resolution;
				void main() {

					uint index = uint( gl_FragCoord.y ) * uint( resolution.x ) + uint( gl_FragCoord.x );
					gl_FragColor = generateSobolPoint( index );

				}
			`})}},Na=class{generate(e,n=256){let i=new Dt(n,n,{type:Be,format:Pe,minFilter:Fe,magFilter:Fe,generateMipmaps:!1}),r=e.getRenderTarget();e.setRenderTarget(i);let o=new Tn(new Pl);return o.material.resolution.set(n,n),o.render(e),e.setRenderTarget(r),o.dispose(),i}};var ao=class extends Yn{set bokehSize(e){this.fStop=this.getFocalLength()/e}get bokehSize(){return this.getFocalLength()/this.fStop}constructor(...e){super(...e),this.fStop=1.4,this.apertureBlades=0,this.apertureRotation=0,this.focusDistance=25,this.anamorphicRatio=1}copy(e,n){return super.copy(e,n),this.fStop=e.fStop,this.apertureBlades=e.apertureBlades,this.apertureRotation=e.apertureRotation,this.focusDistance=e.focusDistance,this.anamorphicRatio=e.anamorphicRatio,this}};var Ua=class{constructor(){this.bokehSize=0,this.apertureBlades=0,this.apertureRotation=0,this.focusDistance=10,this.anamorphicRatio=1}updateFrom(e){e instanceof ao?(this.bokehSize=e.bokehSize,this.apertureBlades=e.apertureBlades,this.apertureRotation=e.apertureRotation,this.focusDistance=e.focusDistance,this.anamorphicRatio=e.anamorphicRatio):(this.bokehSize=0,this.apertureRotation=0,this.apertureBlades=0,this.focusDistance=10,this.anamorphicRatio=1)}};function Fa(t){let e=new Uint16Array(t.length);for(let n=0,i=t.length;n<i;++n)e[n]=vn.toHalfFloat(t[n]);return e}function Cp(t,e,n=0,i=t.length){let r=n,o=n+i-1;for(;r<o;){let a=r+o>>1;t[a]<e?r=a+1:o=a}return r-n}function NS(t,e,n){return .2126*t+.7152*e+.0722*n}function US(t,e=Mt){let n=t.clone();n.source=new Mc({...n.image});let{width:i,height:r,data:o}=n.image,a=o;if(n.type!==e){e===Mt?a=new Uint16Array(o.length):a=new Float32Array(o.length);let c;o instanceof Int8Array||o instanceof Int16Array||o instanceof Int32Array?c=2**(8*o.BYTES_PER_ELEMENT-1)-1:c=2**(8*o.BYTES_PER_ELEMENT)-1;for(let l=0,f=o.length;l<f;l++){let p=o[l];n.type===Mt&&(p=vn.fromHalfFloat(o[l])),n.type!==Be&&n.type!==Mt&&(p/=c),e===Mt&&(a[l]=vn.toHalfFloat(p))}n.image.data=a,n.type=e}if(n.flipY){let c=a;a=a.slice();for(let l=0;l<r;l++)for(let f=0;f<i;f++){let p=r-l-1,u=4*(l*i+f),s=4*(p*i+f);a[s+0]=c[u+0],a[s+1]=c[u+1],a[s+2]=c[u+2],a[s+3]=c[u+3]}n.flipY=!1,n.image.data=a}return n}var Ba=class{constructor(){let e=new wt(Fa(new Float32Array([0,0,0,0])),1,1);e.type=Mt,e.format=Pe,e.minFilter=st,e.magFilter=st,e.wrapS=pn,e.wrapT=pn,e.generateMipmaps=!1,e.needsUpdate=!0;let n=new wt(Fa(new Float32Array([0,1])),1,2);n.type=Mt,n.format=qn,n.minFilter=st,n.magFilter=st,n.generateMipmaps=!1,n.needsUpdate=!0;let i=new wt(Fa(new Float32Array([0,0,1,1])),2,2);i.type=Mt,i.format=qn,i.minFilter=st,i.magFilter=st,i.generateMipmaps=!1,i.needsUpdate=!0,this.map=e,this.marginalWeights=n,this.conditionalWeights=i,this.totalSum=0}dispose(){this.marginalWeights.dispose(),this.conditionalWeights.dispose(),this.map.dispose()}updateFrom(e){let n=US(e);n.wrapS=pn,n.wrapT=Kt;let{width:i,height:r,data:o}=n.image,a=new Float32Array(i*r),c=new Float32Array(i*r),l=new Float32Array(r),f=new Float32Array(r),p=0,u=0;for(let d=0;d<r;d++){let m=0;for(let _=0;_<i;_++){let E=d*i+_,v=vn.fromHalfFloat(o[4*E+0]),T=vn.fromHalfFloat(o[4*E+1]),M=vn.fromHalfFloat(o[4*E+2]),R=NS(v,T,M);m+=R,p+=R,a[E]=R,c[E]=m}if(m!==0)for(let _=d*i,E=d*i+i;_<E;_++)a[_]/=m,c[_]/=m;u+=m,l[d]=m,f[d]=u}if(u!==0)for(let d=0,m=l.length;d<m;d++)l[d]/=u,f[d]/=u;let s=new Uint16Array(r),h=new Uint16Array(i*r);for(let d=0;d<r;d++){let m=(d+1)/r,_=Cp(f,m);s[d]=vn.toHalfFloat((_+.5)/r)}for(let d=0;d<r;d++)for(let m=0;m<i;m++){let _=d*i+m,E=(m+1)/i,v=Cp(c,E,d*i,i);h[_]=vn.toHalfFloat((v+.5)/i)}this.dispose();let{marginalWeights:g,conditionalWeights:b}=this;g.image={width:r,height:1,data:s},g.needsUpdate=!0,b.image={width:i,height:r,data:h},b.needsUpdate=!0,this.totalSum=p,this.map=n}};var Cl=6,FS=0,BS=1,OS=2,GS=3,HS=4,Ln=new j,mn=new j,Ip=new $e,xr=new yc,Dp=new j,Sr=new j,kS=new j(0,1,0),Oa=class{constructor(){let e=new wt(new Float32Array(4),1,1);e.format=Pe,e.type=Be,e.wrapS=Kt,e.wrapT=Kt,e.generateMipmaps=!1,e.minFilter=Fe,e.magFilter=Fe,this.tex=e,this.count=0}updateFrom(e,n=[]){let i=this.tex,r=Math.max(e.length*Cl,1),o=Math.ceil(Math.sqrt(r));i.image.width!==o&&(i.dispose(),i.image.data=new Float32Array(o*o*4),i.image.width=o,i.image.height=o);let a=i.image.data;for(let l=0,f=e.length;l<f;l++){let p=e[l],u=l*Cl*4,s=0;for(let g=0;g<Cl*4;g++)a[u+g]=0;p.getWorldPosition(mn),a[u+s++]=mn.x,a[u+s++]=mn.y,a[u+s++]=mn.z;let h=FS;if(p.isRectAreaLight&&p.isCircular?h=BS:p.isSpotLight?h=OS:p.isDirectionalLight?h=GS:p.isPointLight&&(h=HS),a[u+s++]=h,a[u+s++]=p.color.r,a[u+s++]=p.color.g,a[u+s++]=p.color.b,a[u+s++]=p.intensity,p.getWorldQuaternion(xr),p.isRectAreaLight)Ln.set(p.width,0,0).applyQuaternion(xr),a[u+s++]=Ln.x,a[u+s++]=Ln.y,a[u+s++]=Ln.z,s++,mn.set(0,p.height,0).applyQuaternion(xr),a[u+s++]=mn.x,a[u+s++]=mn.y,a[u+s++]=mn.z,a[u+s++]=Ln.cross(mn).length()*(p.isCircular?Math.PI/4:1);else if(p.isSpotLight){let g=p.radius||0;Dp.setFromMatrixPosition(p.matrixWorld),Sr.setFromMatrixPosition(p.target.matrixWorld),Ip.lookAt(Dp,Sr,kS),xr.setFromRotationMatrix(Ip),Ln.set(1,0,0).applyQuaternion(xr),a[u+s++]=Ln.x,a[u+s++]=Ln.y,a[u+s++]=Ln.z,s++,mn.set(0,1,0).applyQuaternion(xr),a[u+s++]=mn.x,a[u+s++]=mn.y,a[u+s++]=mn.z,a[u+s++]=Math.PI*g*g,a[u+s++]=g,a[u+s++]=p.decay,a[u+s++]=p.distance,a[u+s++]=Math.cos(p.angle),a[u+s++]=Math.cos(p.angle*(1-p.penumbra)),a[u+s++]=p.iesMap?n.indexOf(p.iesMap):-1}else if(p.isPointLight){let g=Ln.setFromMatrixPosition(p.matrixWorld);a[u+s++]=g.x,a[u+s++]=g.y,a[u+s++]=g.z,s++,s+=4,s+=1,a[u+s++]=p.decay,a[u+s++]=p.distance}else if(p.isDirectionalLight){let g=Ln.setFromMatrixPosition(p.matrixWorld),b=mn.setFromMatrixPosition(p.target.matrixWorld);Sr.subVectors(g,b).normalize(),a[u+s++]=Sr.x,a[u+s++]=Sr.y,a[u+s++]=Sr.z}}this.count=e.length;let c=vr(a.buffer);return this.hash!==c?(this.hash=c,i.needsUpdate=!0,!0):!1}};function Lp(t,e,n,i,r){if(e>i)throw new Error;let o=t.length/e,a=t.constructor.BYTES_PER_ELEMENT*8,c=1;switch(t.constructor){case Uint8Array:case Uint16Array:case Uint32Array:c=2**a-1;break;case Int8Array:case Int16Array:case Int32Array:c=2**(a-1)-1;break}for(let l=0;l<o;l++){let f=4*l,p=e*l;for(let u=0;u<i;u++)n[r+f+u]=e>=u+1?t[p+u]/c:0}}var Ga=class extends Vr{constructor(){super(),this._textures=[],this.type=Be,this.format=Pe,this.internalFormat="RGBA32F"}updateAttribute(e,n){let i=this._textures[e];i.updateFrom(n);let r=i.image,o=this.image;if(r.width!==o.width||r.height!==o.height)throw new Error("FloatAttributeTextureArray: Attribute must be the same dimensions when updating single layer.");let{width:a,height:c,data:l}=o,p=a*c*4*e,u=n.itemSize;u===3&&(u=4),Lp(i.image.data,u,l,4,p),this.dispose(),this.needsUpdate=!0}setAttributes(e){let n=e[0].count,i=e.length;for(let u=0,s=i;u<s;u++)if(e[u].count!==n)throw new Error("FloatAttributeTextureArray: All attributes must have the same item count.");let r=this._textures;for(;r.length<i;){let u=new _r;r.push(u)}for(;r.length>i;)r.pop();for(let u=0,s=i;u<s;u++)r[u].updateFrom(e[u]);let a=r[0].image,c=this.image;(a.width!==c.width||a.height!==c.height||a.depth!==i)&&(c.width=a.width,c.height=a.height,c.depth=i,c.data=new Float32Array(c.width*c.height*c.depth*4));let{data:l,width:f,height:p}=c;for(let u=0,s=i;u<s;u++){let h=r[u],b=f*p*4*u,d=e[u].itemSize;d===3&&(d=4),Lp(h.image.data,d,l,4,b)}this.dispose(),this.needsUpdate=!0}};var Ha=class extends Ga{updateNormalAttribute(e){this.updateAttribute(0,e)}updateTangentAttribute(e){this.updateAttribute(1,e)}updateUvAttribute(e){this.updateAttribute(2,e)}updateColorAttribute(e){this.updateAttribute(3,e)}updateFrom(e,n,i,r){this.setAttributes([e,n,i,r])}};function Il(t,e){return t.uuid<e.uuid?1:t.uuid>e.uuid?-1:0}function ka(t){return`${t.source.uuid}:${t.colorSpace}`}function VS(t){let e=new Set,n=[];for(let i=0,r=t.length;i<r;i++){let o=t[i],a=ka(o);e.has(a)||(e.add(a),n.push(o))}return n}function Np(t){let e=t.map(i=>i.iesMap||null).filter(i=>i),n=new Set(e);return Array.from(n).sort(Il)}function Up(t){let e=new Set;for(let i=0,r=t.length;i<r;i++){let o=t[i];for(let a in o){let c=o[a];c&&c.isTexture&&e.add(c)}}let n=Array.from(e);return VS(n).sort(Il)}function Fp(t){let e=[];return t.traverse(n=>{n.visible&&(n.isRectAreaLight||n.isSpotLight||n.isPointLight||n.isDirectionalLight)&&e.push(n)}),e.sort(Il)}var za=47,Bp=za*4,Dl=class{constructor(){this._features={}}isUsed(e){return e in this._features}setUsed(e,n=!0){n===!1?delete this._features[e]:this._features[e]=!0}reset(){this._features={}}},Va=class extends wt{constructor(){super(new Float32Array(4),1,1),this.format=Pe,this.type=Be,this.wrapS=Kt,this.wrapT=Kt,this.minFilter=Fe,this.magFilter=Fe,this.generateMipmaps=!1,this.features=new Dl}updateFrom(e,n){function i(g,b,d=-1){if(b in g&&g[b]){let m=ka(g[b]);return u[m]}else return d}function r(g,b,d){return b in g?g[b]:d}function o(g,b,d,m){let _=g[b]&&g[b].isTexture?g[b]:null;if(_){_.matrixAutoUpdate&&_.updateMatrix();let E=_.matrix.elements,v=0;d[m+v++]=E[0],d[m+v++]=E[3],d[m+v++]=E[6],v++,d[m+v++]=E[1],d[m+v++]=E[4],d[m+v++]=E[7],v++}return 8}let a=0,c=e.length*za,l=Math.ceil(Math.sqrt(c))||1,{image:f,features:p}=this,u={};for(let g=0,b=n.length;g<b;g++)u[ka(n[g])]=g;f.width!==l&&(this.dispose(),f.data=new Float32Array(l*l*4),f.width=l,f.height=l);let s=f.data;p.reset();for(let g=0,b=e.length;g<b;g++){let d=e[g];if(d.isFogVolumeMaterial){p.setUsed("FOG");for(let E=0;E<Bp;E++)s[a+E]=0;s[a+0*4+0]=d.color.r,s[a+0*4+1]=d.color.g,s[a+0*4+2]=d.color.b,s[a+2*4+3]=r(d,"emissiveIntensity",0),s[a+3*4+0]=d.emissive.r,s[a+3*4+1]=d.emissive.g,s[a+3*4+2]=d.emissive.b,s[a+13*4+1]=d.density,s[a+13*4+3]=0,s[a+14*4+2]=4,a+=Bp;continue}s[a++]=d.color.r,s[a++]=d.color.g,s[a++]=d.color.b,s[a++]=i(d,"map"),s[a++]=r(d,"metalness",0),s[a++]=i(d,"metalnessMap"),s[a++]=r(d,"roughness",0),s[a++]=i(d,"roughnessMap"),s[a++]=r(d,"ior",1.5),s[a++]=r(d,"transmission",0),s[a++]=i(d,"transmissionMap"),s[a++]=r(d,"emissiveIntensity",0),"emissive"in d?(s[a++]=d.emissive.r,s[a++]=d.emissive.g,s[a++]=d.emissive.b):(s[a++]=0,s[a++]=0,s[a++]=0),s[a++]=i(d,"emissiveMap"),s[a++]=i(d,"normalMap"),"normalScale"in d?(s[a++]=d.normalScale.x,s[a++]=d.normalScale.y):(s[a++]=1,s[a++]=1),s[a++]=r(d,"clearcoat",0),s[a++]=i(d,"clearcoatMap"),s[a++]=r(d,"clearcoatRoughness",0),s[a++]=i(d,"clearcoatRoughnessMap"),s[a++]=i(d,"clearcoatNormalMap"),"clearcoatNormalScale"in d?(s[a++]=d.clearcoatNormalScale.x,s[a++]=d.clearcoatNormalScale.y):(s[a++]=1,s[a++]=1),a++,s[a++]=r(d,"sheen",0),"sheenColor"in d?(s[a++]=d.sheenColor.r,s[a++]=d.sheenColor.g,s[a++]=d.sheenColor.b):(s[a++]=0,s[a++]=0,s[a++]=0),s[a++]=i(d,"sheenColorMap"),s[a++]=r(d,"sheenRoughness",0),s[a++]=i(d,"sheenRoughnessMap"),s[a++]=i(d,"iridescenceMap"),s[a++]=i(d,"iridescenceThicknessMap"),s[a++]=r(d,"iridescence",0),s[a++]=r(d,"iridescenceIOR",1.3);let m=r(d,"iridescenceThicknessRange",[100,400]);s[a++]=m[0],s[a++]=m[1],"specularColor"in d?(s[a++]=d.specularColor.r,s[a++]=d.specularColor.g,s[a++]=d.specularColor.b):(s[a++]=1,s[a++]=1,s[a++]=1),s[a++]=i(d,"specularColorMap"),s[a++]=r(d,"specularIntensity",1),s[a++]=i(d,"specularIntensityMap");let _=r(d,"thickness",0)===0&&r(d,"attenuationDistance",1/0)===1/0;if(s[a++]=Number(_),a++,"attenuationColor"in d?(s[a++]=d.attenuationColor.r,s[a++]=d.attenuationColor.g,s[a++]=d.attenuationColor.b):(s[a++]=1,s[a++]=1,s[a++]=1),s[a++]=r(d,"attenuationDistance",1/0),s[a++]=i(d,"alphaMap"),s[a++]=d.opacity,s[a++]=d.alphaTest,!_&&d.transmission>0)s[a++]=0;else switch(d.side){case Cn:s[a++]=1;break;case $t:s[a++]=-1;break;case dn:s[a++]=0;break}s[a++]=Number(r(d,"matte",!1)),s[a++]=Number(r(d,"castShadow",!0)),s[a++]=Number(d.vertexColors)|Number(d.flatShading)<<1,s[a++]=Number(d.transparent),a+=o(d,"map",s,a),a+=o(d,"metalnessMap",s,a),a+=o(d,"roughnessMap",s,a),a+=o(d,"transmissionMap",s,a),a+=o(d,"emissiveMap",s,a),a+=o(d,"normalMap",s,a),a+=o(d,"clearcoatMap",s,a),a+=o(d,"clearcoatNormalMap",s,a),a+=o(d,"clearcoatRoughnessMap",s,a),a+=o(d,"sheenColorMap",s,a),a+=o(d,"sheenRoughnessMap",s,a),a+=o(d,"iridescenceMap",s,a),a+=o(d,"iridescenceThicknessMap",s,a),a+=o(d,"specularColorMap",s,a),a+=o(d,"specularIntensityMap",s,a),a+=o(d,"alphaMap",s,a)}let h=vr(s.buffer);return this.hash!==h?(this.hash=h,this.needsUpdate=!0,!0):!1}};var Op=new Xe;function zS(t){return t?`${t.uuid}:${t.version}`:null}function WS(t,e){for(let n in e)n in t&&(t[n]=e[n])}var so=class extends Ac{constructor(e,n,i){let r={format:Pe,type:Jt,minFilter:st,magFilter:st,wrapS:pn,wrapT:pn,generateMipmaps:!1,...i};super(e,n,1,r),WS(this.texture,r),this.texture.setTextures=(...a)=>{this.setTextures(...a)},this.hashes=[null];let o=new Tn(new Ll);this.fsQuad=o}setTextures(e,n,i=this.width,r=this.height){let o=e.getRenderTarget(),a=e.toneMapping,c=e.getClearAlpha();e.getClearColor(Op);let l=n.length||1;(i!==this.width||r!==this.height||this.depth!==l)&&(this.setSize(i,r,l),this.hashes=new Array(l).fill(null)),e.setClearColor(0,0),e.toneMapping=_n;let f=this.fsQuad,p=this.hashes,u=!1;for(let s=0,h=l;s<h;s++){let g=n[s],b=zS(g);g&&(p[s]!==b||g.isWebGLRenderTarget)&&(g.matrixAutoUpdate=!1,g.matrix.identity(),f.material.map=g,e.setRenderTarget(this,s),f.render(e),g.updateMatrix(),g.matrixAutoUpdate=!0,p[s]=b,u=!0)}return f.material.map=null,e.setClearColor(Op,c),e.setRenderTarget(o),e.toneMapping=a,u}dispose(){super.dispose(),this.fsQuad.dispose()}},Ll=class extends qt{get map(){return this.uniforms.map.value}set map(e){this.uniforms.map.value=e}constructor(){super({uniforms:{map:{value:null}},vertexShader:`
				varying vec2 vUv;
				void main() {

					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

				}
			`,fragmentShader:`
				uniform sampler2D map;
				varying vec2 vUv;
				void main() {

					gl_FragColor = texture2D( map, vUv );

				}
			`})}};function $S(t,e=Math.random()){for(let n=t.length-1;n>0;n--){let i=Math.floor(e()*(n+1)),r=t[n];t[n]=t[i],t[i]=r}return t}var Wa=class{constructor(e,n,i=Math.random){let r=e**n,o=new Uint16Array(r),a=r;for(let c=0;c<r;c++)o[c]=c;this.samples=new Float32Array(n),this.strataCount=e,this.reset=function(){for(let c=0;c<r;c++)o[c]=c;a=0},this.reshuffle=function(){a=0},this.next=function(){let{samples:c}=this;a>=o.length&&($S(o,i),this.reshuffle());let l=o[a++];for(let f=0;f<n;f++)c[f]=(l%e+i())/e,l=Math.floor(l/e);return c}}};var $a=class{constructor(e,n,i=Math.random){let r=0;for(let l of n)r+=l;let o=new Float32Array(r),a=[],c=0;for(let l of n){let f=new Wa(e,l,i);f.samples=new Float32Array(o.buffer,c,f.samples.length),c+=f.samples.length*4,a.push(f)}this.samples=o,this.strataCount=e,this.next=function(){for(let l of a)l.next();return o},this.reshuffle=function(){for(let l of a)l.reshuffle()},this.reset=function(){for(let l of a)l.reset()}}};var Nl=class{constructor(e=0){this.m=2147483648,this.a=1103515245,this.c=12345,this.seed=e}nextInt(){return this.seed=(this.a*this.seed+this.c)%this.m,this.seed}nextFloat(){return this.nextInt()/(this.m-1)}},Xa=class extends wt{constructor(e=1,n=1,i=8){super(new Float32Array(1),1,1,Pe,Be),this.minFilter=Fe,this.magFilter=Fe,this.strata=i,this.sampler=null,this.generator=new Nl,this.stableNoise=!1,this.random=()=>this.stableNoise?this.generator.nextFloat():Math.random(),this.init(e,n,i)}init(e=this.image.height,n=this.image.width,i=this.strata){let{image:r}=this;if(r.width===n&&r.height===e&&this.sampler!==null)return;let o=new Array(e*n).fill(4),a=new $a(i,o,this.random);r.width=n,r.height=e,r.data=a.samples,this.sampler=a,this.dispose(),this.next()}next(){this.sampler.next(),this.needsUpdate=!0}reset(){this.sampler.reset(),this.generator.seed=0}};function Gp(t,e=Math.random){for(let n=t.length-1;n>0;n--){let i=~~((e()-1e-6)*n),r=t[n];t[n]=t[i],t[i]=r}}function Hp(t,e){t.fill(0);for(let n=0;n<e;n++)t[n]=1}var co=class{constructor(e){this.count=0,this.size=-1,this.sigma=-1,this.radius=-1,this.lookupTable=null,this.score=null,this.binaryPattern=null,this.resize(e),this.setSigma(1.5)}findVoid(){let{score:e,binaryPattern:n}=this,i=1/0,r=-1;for(let o=0,a=n.length;o<a;o++){if(n[o]!==0)continue;let c=e[o];c<i&&(i=c,r=o)}return r}findCluster(){let{score:e,binaryPattern:n}=this,i=-1/0,r=-1;for(let o=0,a=n.length;o<a;o++){if(n[o]!==1)continue;let c=e[o];c>i&&(i=c,r=o)}return r}setSigma(e){if(e===this.sigma)return;let n=~~(Math.sqrt(10*2*e**2)+1),i=2*n+1,r=new Float32Array(i*i),o=e*e;for(let a=-n;a<=n;a++)for(let c=-n;c<=n;c++){let l=(n+c)*i+a+n,f=a*a+c*c;r[l]=Math.E**(-f/(2*o))}this.lookupTable=r,this.sigma=e,this.radius=n}resize(e){this.size!==e&&(this.size=e,this.score=new Float32Array(e*e),this.binaryPattern=new Uint8Array(e*e))}invert(){let{binaryPattern:e,score:n,size:i}=this;n.fill(0);for(let r=0,o=e.length;r<o;r++)if(e[r]===0){let a=~~(r/i),c=r-a*i;this.updateScore(c,a,1),e[r]=1}else e[r]=0}updateScore(e,n,i){let{size:r,score:o,lookupTable:a}=this,c=this.radius,l=2*c+1;for(let f=-c;f<=c;f++)for(let p=-c;p<=c;p++){let u=(c+p)*l+f+c,s=a[u],h=e+f;h=h<0?r+h:h%r;let g=n+p;g=g<0?r+g:g%r;let b=g*r+h;o[b]+=i*s}}addPointIndex(e){this.binaryPattern[e]=1;let n=this.size,i=~~(e/n),r=e-i*n;this.updateScore(r,i,1),this.count++}removePointIndex(e){this.binaryPattern[e]=0;let n=this.size,i=~~(e/n),r=e-i*n;this.updateScore(r,i,-1),this.count--}copy(e){this.resize(e.size),this.score.set(e.score),this.binaryPattern.set(e.binaryPattern),this.setSigma(e.sigma),this.count=e.count}};var qa=class{constructor(){this.random=Math.random,this.sigma=1.5,this.size=64,this.majorityPointsRatio=.1,this.samples=new co(1),this.savedSamples=new co(1)}generate(){let{samples:e,savedSamples:n,sigma:i,majorityPointsRatio:r,size:o}=this;e.resize(o),e.setSigma(i);let a=Math.floor(o*o*r),c=e.binaryPattern;Hp(c,a),Gp(c,this.random);for(let u=0,s=c.length;u<s;u++)c[u]===1&&e.addPointIndex(u);for(;;){let u=e.findCluster();e.removePointIndex(u);let s=e.findVoid();if(u===s){e.addPointIndex(u);break}e.addPointIndex(s)}let l=new Uint32Array(o*o);n.copy(e);let f;for(f=e.count-1;f>=0;){let u=e.findCluster();e.removePointIndex(u),l[u]=f,f--}let p=o*o;for(f=n.count;f<p/2;){let u=n.findVoid();n.addPointIndex(u),l[u]=f,f++}for(n.invert();f<p;){let u=n.findCluster();n.removePointIndex(u),l[u]=f,f++}return{data:l,maxValue:p}}};function XS(t){return t>=3?4:t}function qS(t){switch(t){case 1:return qn;case 2:return In;default:return Pe}}var Ya=class extends wt{constructor(e=64,n=1){super(new Float32Array(4),1,1,Pe,Be),this.minFilter=Fe,this.magFilter=Fe,this.size=e,this.channels=n,this.update()}update(){let e=this.channels,n=this.size,i=new qa;i.channels=e,i.size=n;let r=XS(e),o=qS(r);(this.image.width!==n||o!==this.format)&&(this.image.width=n,this.image.height=n,this.image.data=new Float32Array(n**2*r),this.format=o,this.dispose());let a=this.image.data;for(let c=0,l=e;c<l;c++){let f=i.generate(),p=f.data,u=f.maxValue;for(let s=0,h=p.length;s<h;s++){let g=p[s]/u;a[s*r+c]=g}}this.needsUpdate=!0}};var kp=`

	struct PhysicalCamera {

		float focusDistance;
		float anamorphicRatio;
		float bokehSize;
		int apertureBlades;
		float apertureRotation;

	};

`;var Vp=`

	struct EquirectHdrInfo {

		sampler2D marginalWeights;
		sampler2D conditionalWeights;
		sampler2D map;

		float totalSum;

	};

`;var zp=`

	#define RECT_AREA_LIGHT_TYPE 0
	#define CIRC_AREA_LIGHT_TYPE 1
	#define SPOT_LIGHT_TYPE 2
	#define DIR_LIGHT_TYPE 3
	#define POINT_LIGHT_TYPE 4

	struct LightsInfo {

		sampler2D tex;
		uint count;

	};

	struct Light {

		vec3 position;
		int type;

		vec3 color;
		float intensity;

		vec3 u;
		vec3 v;
		float area;

		// spot light fields
		float radius;
		float near;
		float decay;
		float distance;
		float coneCos;
		float penumbraCos;
		int iesProfile;

	};

	Light readLightInfo( sampler2D tex, uint index ) {

		uint i = index * 6u;

		vec4 s0 = texelFetch1D( tex, i + 0u );
		vec4 s1 = texelFetch1D( tex, i + 1u );
		vec4 s2 = texelFetch1D( tex, i + 2u );
		vec4 s3 = texelFetch1D( tex, i + 3u );

		Light l;
		l.position = s0.rgb;
		l.type = int( round( s0.a ) );

		l.color = s1.rgb;
		l.intensity = s1.a;

		l.u = s2.rgb;
		l.v = s3.rgb;
		l.area = s3.a;

		if ( l.type == SPOT_LIGHT_TYPE || l.type == POINT_LIGHT_TYPE ) {

			vec4 s4 = texelFetch1D( tex, i + 4u );
			vec4 s5 = texelFetch1D( tex, i + 5u );
			l.radius = s4.r;
			l.decay = s4.g;
			l.distance = s4.b;
			l.coneCos = s4.a;

			l.penumbraCos = s5.r;
			l.iesProfile = int( round( s5.g ) );

		} else {

			l.radius = 0.0;
			l.decay = 0.0;
			l.distance = 0.0;

			l.coneCos = 0.0;
			l.penumbraCos = 0.0;
			l.iesProfile = - 1;

		}

		return l;

	}

`;var Wp=`

	struct Material {

		vec3 color;
		int map;

		float metalness;
		int metalnessMap;

		float roughness;
		int roughnessMap;

		float ior;
		float transmission;
		int transmissionMap;

		float emissiveIntensity;
		vec3 emissive;
		int emissiveMap;

		int normalMap;
		vec2 normalScale;

		float clearcoat;
		int clearcoatMap;
		int clearcoatNormalMap;
		vec2 clearcoatNormalScale;
		float clearcoatRoughness;
		int clearcoatRoughnessMap;

		int iridescenceMap;
		int iridescenceThicknessMap;
		float iridescence;
		float iridescenceIor;
		float iridescenceThicknessMinimum;
		float iridescenceThicknessMaximum;

		vec3 specularColor;
		int specularColorMap;

		float specularIntensity;
		int specularIntensityMap;
		bool thinFilm;

		vec3 attenuationColor;
		float attenuationDistance;

		int alphaMap;

		bool castShadow;
		float opacity;
		float alphaTest;

		float side;
		bool matte;

		float sheen;
		vec3 sheenColor;
		int sheenColorMap;
		float sheenRoughness;
		int sheenRoughnessMap;

		bool vertexColors;
		bool flatShading;
		bool transparent;
		bool fogVolume;

		mat3 mapTransform;
		mat3 metalnessMapTransform;
		mat3 roughnessMapTransform;
		mat3 transmissionMapTransform;
		mat3 emissiveMapTransform;
		mat3 normalMapTransform;
		mat3 clearcoatMapTransform;
		mat3 clearcoatNormalMapTransform;
		mat3 clearcoatRoughnessMapTransform;
		mat3 sheenColorMapTransform;
		mat3 sheenRoughnessMapTransform;
		mat3 iridescenceMapTransform;
		mat3 iridescenceThicknessMapTransform;
		mat3 specularColorMapTransform;
		mat3 specularIntensityMapTransform;
		mat3 alphaMapTransform;

	};

	mat3 readTextureTransform( sampler2D tex, uint index ) {

		mat3 textureTransform;

		vec4 row1 = texelFetch1D( tex, index );
		vec4 row2 = texelFetch1D( tex, index + 1u );

		textureTransform[0] = vec3(row1.r, row2.r, 0.0);
		textureTransform[1] = vec3(row1.g, row2.g, 0.0);
		textureTransform[2] = vec3(row1.b, row2.b, 1.0);

		return textureTransform;

	}

	Material readMaterialInfo( sampler2D tex, uint index ) {

		uint i = index * uint( MATERIAL_PIXELS );

		vec4 s0 = texelFetch1D( tex, i + 0u );
		vec4 s1 = texelFetch1D( tex, i + 1u );
		vec4 s2 = texelFetch1D( tex, i + 2u );
		vec4 s3 = texelFetch1D( tex, i + 3u );
		vec4 s4 = texelFetch1D( tex, i + 4u );
		vec4 s5 = texelFetch1D( tex, i + 5u );
		vec4 s6 = texelFetch1D( tex, i + 6u );
		vec4 s7 = texelFetch1D( tex, i + 7u );
		vec4 s8 = texelFetch1D( tex, i + 8u );
		vec4 s9 = texelFetch1D( tex, i + 9u );
		vec4 s10 = texelFetch1D( tex, i + 10u );
		vec4 s11 = texelFetch1D( tex, i + 11u );
		vec4 s12 = texelFetch1D( tex, i + 12u );
		vec4 s13 = texelFetch1D( tex, i + 13u );
		vec4 s14 = texelFetch1D( tex, i + 14u );

		Material m;
		m.color = s0.rgb;
		m.map = int( round( s0.a ) );

		m.metalness = s1.r;
		m.metalnessMap = int( round( s1.g ) );
		m.roughness = s1.b;
		m.roughnessMap = int( round( s1.a ) );

		m.ior = s2.r;
		m.transmission = s2.g;
		m.transmissionMap = int( round( s2.b ) );
		m.emissiveIntensity = s2.a;

		m.emissive = s3.rgb;
		m.emissiveMap = int( round( s3.a ) );

		m.normalMap = int( round( s4.r ) );
		m.normalScale = s4.gb;

		m.clearcoat = s4.a;
		m.clearcoatMap = int( round( s5.r ) );
		m.clearcoatRoughness = s5.g;
		m.clearcoatRoughnessMap = int( round( s5.b ) );
		m.clearcoatNormalMap = int( round( s5.a ) );
		m.clearcoatNormalScale = s6.rg;

		m.sheen = s6.a;
		m.sheenColor = s7.rgb;
		m.sheenColorMap = int( round( s7.a ) );
		m.sheenRoughness = s8.r;
		m.sheenRoughnessMap = int( round( s8.g ) );

		m.iridescenceMap = int( round( s8.b ) );
		m.iridescenceThicknessMap = int( round( s8.a ) );
		m.iridescence = s9.r;
		m.iridescenceIor = s9.g;
		m.iridescenceThicknessMinimum = s9.b;
		m.iridescenceThicknessMaximum = s9.a;

		m.specularColor = s10.rgb;
		m.specularColorMap = int( round( s10.a ) );

		m.specularIntensity = s11.r;
		m.specularIntensityMap = int( round( s11.g ) );
		m.thinFilm = bool( s11.b );

		m.attenuationColor = s12.rgb;
		m.attenuationDistance = s12.a;

		m.alphaMap = int( round( s13.r ) );

		m.opacity = s13.g;
		m.alphaTest = s13.b;
		m.side = s13.a;

		m.matte = bool( s14.r );
		m.castShadow = bool( s14.g );
		m.vertexColors = bool( int( s14.b ) & 1 );
		m.flatShading = bool( int( s14.b ) & 2 );
		m.fogVolume = bool( int( s14.b ) & 4 );
		m.transparent = bool( s14.a );

		uint firstTextureTransformIdx = i + 15u;

		// mat3( 1.0 ) is an identity matrix
		m.mapTransform = m.map == - 1 ? mat3( 1.0 ) : readTextureTransform( tex, firstTextureTransformIdx );
		m.metalnessMapTransform = m.metalnessMap == - 1 ? mat3( 1.0 ) : readTextureTransform( tex, firstTextureTransformIdx + 2u );
		m.roughnessMapTransform = m.roughnessMap == - 1 ? mat3( 1.0 ) : readTextureTransform( tex, firstTextureTransformIdx + 4u );
		m.transmissionMapTransform = m.transmissionMap == - 1 ? mat3( 1.0 ) : readTextureTransform( tex, firstTextureTransformIdx + 6u );
		m.emissiveMapTransform = m.emissiveMap == - 1 ? mat3( 1.0 ) : readTextureTransform( tex, firstTextureTransformIdx + 8u );
		m.normalMapTransform = m.normalMap == - 1 ? mat3( 1.0 ) : readTextureTransform( tex, firstTextureTransformIdx + 10u );
		m.clearcoatMapTransform = m.clearcoatMap == - 1 ? mat3( 1.0 ) : readTextureTransform( tex, firstTextureTransformIdx + 12u );
		m.clearcoatNormalMapTransform = m.clearcoatNormalMap == - 1 ? mat3( 1.0 ) : readTextureTransform( tex, firstTextureTransformIdx + 14u );
		m.clearcoatRoughnessMapTransform = m.clearcoatRoughnessMap == - 1 ? mat3( 1.0 ) : readTextureTransform( tex, firstTextureTransformIdx + 16u );
		m.sheenColorMapTransform = m.sheenColorMap == - 1 ? mat3( 1.0 ) : readTextureTransform( tex, firstTextureTransformIdx + 18u );
		m.sheenRoughnessMapTransform = m.sheenRoughnessMap == - 1 ? mat3( 1.0 ) : readTextureTransform( tex, firstTextureTransformIdx + 20u );
		m.iridescenceMapTransform = m.iridescenceMap == - 1 ? mat3( 1.0 ) : readTextureTransform( tex, firstTextureTransformIdx + 22u );
		m.iridescenceThicknessMapTransform = m.iridescenceThicknessMap == - 1 ? mat3( 1.0 ) : readTextureTransform( tex, firstTextureTransformIdx + 24u );
		m.specularColorMapTransform = m.specularColorMap == - 1 ? mat3( 1.0 ) : readTextureTransform( tex, firstTextureTransformIdx + 26u );
		m.specularIntensityMapTransform = m.specularIntensityMap == - 1 ? mat3( 1.0 ) : readTextureTransform( tex, firstTextureTransformIdx + 28u );
		m.alphaMapTransform = m.alphaMap == - 1 ? mat3( 1.0 ) : readTextureTransform( tex, firstTextureTransformIdx + 30u );

		return m;

	}

`;var $p=`

	struct SurfaceRecord {

		// surface type
		bool volumeParticle;

		// geometry
		vec3 faceNormal;
		bool frontFace;
		vec3 normal;
		mat3 normalBasis;
		mat3 normalInvBasis;

		// cached properties
		float eta;
		float f0;

		// material
		float roughness;
		float filteredRoughness;
		float metalness;
		vec3 color;
		vec3 emission;

		// transmission
		float ior;
		float transmission;
		bool thinFilm;
		vec3 attenuationColor;
		float attenuationDistance;

		// clearcoat
		vec3 clearcoatNormal;
		mat3 clearcoatBasis;
		mat3 clearcoatInvBasis;
		float clearcoat;
		float clearcoatRoughness;
		float filteredClearcoatRoughness;

		// sheen
		float sheen;
		vec3 sheenColor;
		float sheenRoughness;

		// iridescence
		float iridescence;
		float iridescenceIor;
		float iridescenceThickness;

		// specular
		vec3 specularColor;
		float specularIntensity;
	};

	struct ScatterRecord {
		float specularPdf;
		float pdf;
		vec3 direction;
		vec3 color;
	};

`;var Xp=`

	// samples the the given environment map in the given direction
	vec3 sampleEquirectColor( sampler2D envMap, vec3 direction ) {

		return texture2D( envMap, equirectDirectionToUv( direction ) ).rgb;

	}

	// gets the pdf of the given direction to sample
	float equirectDirectionPdf( vec3 direction ) {

		vec2 uv = equirectDirectionToUv( direction );
		float theta = uv.y * PI;
		float sinTheta = sin( theta );
		if ( sinTheta == 0.0 ) {

			return 0.0;

		}

		return 1.0 / ( 2.0 * PI * PI * sinTheta );

	}

	// samples the color given env map with CDF and returns the pdf of the direction
	float sampleEquirect( vec3 direction, inout vec3 color ) {

		float totalSum = envMapInfo.totalSum;
		if ( totalSum == 0.0 ) {

			color = vec3( 0.0 );
			return 1.0;

		}

		vec2 uv = equirectDirectionToUv( direction );
		color = texture2D( envMapInfo.map, uv ).rgb;

		float lum = luminance( color );
		ivec2 resolution = textureSize( envMapInfo.map, 0 );
		float pdf = lum / totalSum;

		return float( resolution.x * resolution.y ) * pdf * equirectDirectionPdf( direction );

	}

	// samples a direction of the envmap with color and retrieves pdf
	float sampleEquirectProbability( vec2 r, inout vec3 color, inout vec3 direction ) {

		// sample env map cdf
		float v = texture2D( envMapInfo.marginalWeights, vec2( r.x, 0.0 ) ).x;
		float u = texture2D( envMapInfo.conditionalWeights, vec2( r.y, v ) ).x;
		vec2 uv = vec2( u, v );

		vec3 derivedDirection = equirectUvToDirection( uv );
		direction = derivedDirection;
		color = texture2D( envMapInfo.map, uv ).rgb;

		float totalSum = envMapInfo.totalSum;
		float lum = luminance( color );
		ivec2 resolution = textureSize( envMapInfo.map, 0 );
		float pdf = lum / totalSum;

		return float( resolution.x * resolution.y ) * pdf * equirectDirectionPdf( direction );

	}
`;var qp=`

	float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {

		return smoothstep( coneCosine, penumbraCosine, angleCosine );

	}

	float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {

		// based upon Frostbite 3 Moving to Physically-based Rendering
		// page 32, equation 26: E[window1]
		// https://seblagarde.files.wordpress.com/2015/07/course_notes_moving_frostbite_to_pbr_v32.pdf
		float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), EPSILON );

		if ( cutoffDistance > 0.0 ) {

			distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );

		}

		return distanceFalloff;

	}

	float getPhotometricAttenuation( sampler2DArray iesProfiles, int iesProfile, vec3 posToLight, vec3 lightDir, vec3 u, vec3 v ) {

		float cosTheta = dot( posToLight, lightDir );
		float angle = acos( cosTheta ) / PI;

		return texture2D( iesProfiles, vec3( angle, 0.0, iesProfile ) ).r;

	}

	struct LightRecord {

		float dist;
		vec3 direction;
		float pdf;
		vec3 emission;
		int type;

	};

	bool intersectLightAtIndex( sampler2D lights, vec3 rayOrigin, vec3 rayDirection, uint l, inout LightRecord lightRec ) {

		bool didHit = false;
		Light light = readLightInfo( lights, l );

		vec3 u = light.u;
		vec3 v = light.v;

		// check for backface
		vec3 normal = normalize( cross( u, v ) );
		if ( dot( normal, rayDirection ) > 0.0 ) {

			u *= 1.0 / dot( u, u );
			v *= 1.0 / dot( v, v );

			float dist;

			// MIS / light intersection is not supported for punctual lights.
			if(
				( light.type == RECT_AREA_LIGHT_TYPE && intersectsRectangle( light.position, normal, u, v, rayOrigin, rayDirection, dist ) ) ||
				( light.type == CIRC_AREA_LIGHT_TYPE && intersectsCircle( light.position, normal, u, v, rayOrigin, rayDirection, dist ) )
			) {

				float cosTheta = dot( rayDirection, normal );
				didHit = true;
				lightRec.dist = dist;
				lightRec.pdf = ( dist * dist ) / ( light.area * cosTheta );
				lightRec.emission = light.color * light.intensity;
				lightRec.direction = rayDirection;
				lightRec.type = light.type;

			}

		}

		return didHit;

	}

	LightRecord randomAreaLightSample( Light light, vec3 rayOrigin, vec2 ruv ) {

		vec3 randomPos;
		if( light.type == RECT_AREA_LIGHT_TYPE ) {

			// rectangular area light
			randomPos = light.position + light.u * ( ruv.x - 0.5 ) + light.v * ( ruv.y - 0.5 );

		} else if( light.type == CIRC_AREA_LIGHT_TYPE ) {

			// circular area light
			float r = 0.5 * sqrt( ruv.x );
			float theta = ruv.y * 2.0 * PI;
			float x = r * cos( theta );
			float y = r * sin( theta );

			randomPos = light.position + light.u * x + light.v * y;

		}

		vec3 toLight = randomPos - rayOrigin;
		float lightDistSq = dot( toLight, toLight );
		float dist = sqrt( lightDistSq );
		vec3 direction = toLight / dist;
		vec3 lightNormal = normalize( cross( light.u, light.v ) );

		LightRecord lightRec;
		lightRec.type = light.type;
		lightRec.emission = light.color * light.intensity;
		lightRec.dist = dist;
		lightRec.direction = direction;

		// TODO: the denominator is potentially zero
		lightRec.pdf = lightDistSq / ( light.area * dot( direction, lightNormal ) );

		return lightRec;

	}

	LightRecord randomSpotLightSample( Light light, sampler2DArray iesProfiles, vec3 rayOrigin, vec2 ruv ) {

		float radius = light.radius * sqrt( ruv.x );
		float theta = ruv.y * 2.0 * PI;
		float x = radius * cos( theta );
		float y = radius * sin( theta );

		vec3 u = light.u;
		vec3 v = light.v;
		vec3 normal = normalize( cross( u, v ) );

		float angle = acos( light.coneCos );
		float angleTan = tan( angle );
		float startDistance = light.radius / max( angleTan, EPSILON );

		vec3 randomPos = light.position - normal * startDistance + u * x + v * y;
		vec3 toLight = randomPos - rayOrigin;
		float lightDistSq = dot( toLight, toLight );
		float dist = sqrt( lightDistSq );

		vec3 direction = toLight / max( dist, EPSILON );
		float cosTheta = dot( direction, normal );

		float spotAttenuation = light.iesProfile != - 1 ?
			getPhotometricAttenuation( iesProfiles, light.iesProfile, direction, normal, u, v ) :
			getSpotAttenuation( light.coneCos, light.penumbraCos, cosTheta );

		float distanceAttenuation = getDistanceAttenuation( dist, light.distance, light.decay );
		LightRecord lightRec;
		lightRec.type = light.type;
		lightRec.dist = dist;
		lightRec.direction = direction;
		lightRec.emission = light.color * light.intensity * distanceAttenuation * spotAttenuation;
		lightRec.pdf = 1.0;

		return lightRec;

	}

	LightRecord randomLightSample( sampler2D lights, sampler2DArray iesProfiles, uint lightCount, vec3 rayOrigin, vec3 ruv ) {

		LightRecord result;

		// pick a random light
		uint l = uint( ruv.x * float( lightCount ) );
		Light light = readLightInfo( lights, l );

		if ( light.type == SPOT_LIGHT_TYPE ) {

			result = randomSpotLightSample( light, iesProfiles, rayOrigin, ruv.yz );

		} else if ( light.type == POINT_LIGHT_TYPE ) {

			vec3 lightRay = light.u - rayOrigin;
			float lightDist = length( lightRay );
			float cutoffDistance = light.distance;
			float distanceFalloff = 1.0 / max( pow( lightDist, light.decay ), 0.01 );
			if ( cutoffDistance > 0.0 ) {

				distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDist / cutoffDistance ) ) );

			}

			LightRecord rec;
			rec.direction = normalize( lightRay );
			rec.dist = length( lightRay );
			rec.pdf = 1.0;
			rec.emission = light.color * light.intensity * distanceFalloff;
			rec.type = light.type;
			result = rec;

		} else if ( light.type == DIR_LIGHT_TYPE ) {

			LightRecord rec;
			rec.dist = 1e10;
			rec.direction = light.u;
			rec.pdf = 1.0;
			rec.emission = light.color * light.intensity;
			rec.type = light.type;

			result = rec;

		} else {

			// sample the light
			result = randomAreaLightSample( light, rayOrigin, ruv.yz );

		}

		return result;

	}

`;var Yp=`

	vec3 sampleHemisphere( vec3 n, vec2 uv ) {

		// https://www.rorydriscoll.com/2009/01/07/better-sampling/
		// https://graphics.pixar.com/library/OrthonormalB/paper.pdf
		float sign = n.z == 0.0 ? 1.0 : sign( n.z );
		float a = - 1.0 / ( sign + n.z );
		float b = n.x * n.y * a;
		vec3 b1 = vec3( 1.0 + sign * n.x * n.x * a, sign * b, - sign * n.x );
		vec3 b2 = vec3( b, sign + n.y * n.y * a, - n.y );

		float r = sqrt( uv.x );
		float theta = 2.0 * PI * uv.y;
		float x = r * cos( theta );
		float y = r * sin( theta );
		return x * b1 + y * b2 + sqrt( 1.0 - uv.x ) * n;

	}

	vec2 sampleTriangle( vec2 a, vec2 b, vec2 c, vec2 r ) {

		// get the edges of the triangle and the diagonal across the
		// center of the parallelogram
		vec2 e1 = a - b;
		vec2 e2 = c - b;
		vec2 diag = normalize( e1 + e2 );

		// pick the point in the parallelogram
		if ( r.x + r.y > 1.0 ) {

			r = vec2( 1.0 ) - r;

		}

		return e1 * r.x + e2 * r.y;

	}

	vec2 sampleCircle( vec2 uv ) {

		float angle = 2.0 * PI * uv.x;
		float radius = sqrt( uv.y );
		return vec2( cos( angle ), sin( angle ) ) * radius;

	}

	vec3 sampleSphere( vec2 uv ) {

		float u = ( uv.x - 0.5 ) * 2.0;
		float t = uv.y * PI * 2.0;
		float f = sqrt( 1.0 - u * u );

		return vec3( f * cos( t ), f * sin( t ), u );

	}

	vec2 sampleRegularPolygon( int sides, vec3 uvw ) {

		sides = max( sides, 3 );

		vec3 r = uvw;
		float anglePerSegment = 2.0 * PI / float( sides );
		float segment = floor( float( sides ) * r.x );

		float angle1 = anglePerSegment * segment;
		float angle2 = angle1 + anglePerSegment;
		vec2 a = vec2( sin( angle1 ), cos( angle1 ) );
		vec2 b = vec2( 0.0, 0.0 );
		vec2 c = vec2( sin( angle2 ), cos( angle2 ) );

		return sampleTriangle( a, b, c, r.yz );

	}

	// samples an aperture shape with the given number of sides. 0 means circle
	vec2 sampleAperture( int blades, vec3 uvw ) {

		return blades == 0 ?
			sampleCircle( uvw.xy ) :
			sampleRegularPolygon( blades, uvw );

	}


`;var Kp=`

	bool totalInternalReflection( float cosTheta, float eta ) {

		float sinTheta = sqrt( 1.0 - cosTheta * cosTheta );
		return eta * sinTheta > 1.0;

	}

	// https://google.github.io/filament/Filament.md.html#materialsystem/diffusebrdf
	float schlickFresnel( float cosine, float f0 ) {

		return f0 + ( 1.0 - f0 ) * pow( 1.0 - cosine, 5.0 );

	}

	vec3 schlickFresnel( float cosine, vec3 f0 ) {

		return f0 + ( 1.0 - f0 ) * pow( 1.0 - cosine, 5.0 );

	}

	vec3 schlickFresnel( float cosine, vec3 f0, vec3 f90 ) {

		return f0 + ( f90 - f0 ) * pow( 1.0 - cosine, 5.0 );

	}

	float dielectricFresnel( float cosThetaI, float eta ) {

		// https://schuttejoe.github.io/post/disneybsdf/
		float ni = eta;
		float nt = 1.0;

		// Check for total internal reflection
		float sinThetaISq = 1.0f - cosThetaI * cosThetaI;
		float sinThetaTSq = eta * eta * sinThetaISq;
		if( sinThetaTSq >= 1.0 ) {

			return 1.0;

		}

		float sinThetaT = sqrt( sinThetaTSq );

		float cosThetaT = sqrt( max( 0.0, 1.0f - sinThetaT * sinThetaT ) );
		float rParallel = ( ( nt * cosThetaI ) - ( ni * cosThetaT ) ) / ( ( nt * cosThetaI ) + ( ni * cosThetaT ) );
		float rPerpendicular = ( ( ni * cosThetaI ) - ( nt * cosThetaT ) ) / ( ( ni * cosThetaI ) + ( nt * cosThetaT ) );
		return ( rParallel * rParallel + rPerpendicular * rPerpendicular ) / 2.0;

	}

	// https://raytracing.github.io/books/RayTracingInOneWeekend.html#dielectrics/schlickapproximation
	float iorRatioToF0( float eta ) {

		return pow( ( 1.0 - eta ) / ( 1.0 + eta ), 2.0 );

	}

	vec3 evaluateFresnel( float cosTheta, float eta, vec3 f0, vec3 f90 ) {

		if ( totalInternalReflection( cosTheta, eta ) ) {

			return f90;

		}

		return schlickFresnel( cosTheta, f0, f90 );

	}

	// TODO: disney fresnel was removed and replaced with this fresnel function to better align with
	// the glTF but is causing blown out pixels. Should be revisited
	// float evaluateFresnelWeight( float cosTheta, float eta, float f0 ) {

	// 	if ( totalInternalReflection( cosTheta, eta ) ) {

	// 		return 1.0;

	// 	}

	// 	return schlickFresnel( cosTheta, f0 );

	// }

	// https://schuttejoe.github.io/post/disneybsdf/
	float disneyFresnel( vec3 wo, vec3 wi, vec3 wh, float f0, float eta, float metalness ) {

		float dotHV = dot( wo, wh );
		if ( totalInternalReflection( dotHV, eta ) ) {

			return 1.0;

		}

		float dotHL = dot( wi, wh );
		float dielectricFresnel = dielectricFresnel( abs( dotHV ), eta );
		float metallicFresnel = schlickFresnel( dotHL, f0 );

		return mix( dielectricFresnel, metallicFresnel, metalness );

	}

`;var Zp=`

	// Fast arccos approximation used to remove banding artifacts caused by numerical errors in acos.
	// This is a cubic Lagrange interpolating polynomial for x = [-1, -1/2, 0, 1/2, 1].
	// For more information see: https://github.com/gkjohnson/three-gpu-pathtracer/pull/171#issuecomment-1152275248
	float acosApprox( float x ) {

		x = clamp( x, -1.0, 1.0 );
		return ( - 0.69813170079773212 * x * x - 0.87266462599716477 ) * x + 1.5707963267948966;

	}

	// An acos with input values bound to the range [-1, 1].
	float acosSafe( float x ) {

		return acos( clamp( x, -1.0, 1.0 ) );

	}

	float saturateCos( float val ) {

		return clamp( val, 0.001, 1.0 );

	}

	float square( float t ) {

		return t * t;

	}

	vec2 square( vec2 t ) {

		return t * t;

	}

	vec3 square( vec3 t ) {

		return t * t;

	}

	vec4 square( vec4 t ) {

		return t * t;

	}

	vec2 rotateVector( vec2 v, float t ) {

		float ac = cos( t );
		float as = sin( t );
		return vec2(
			v.x * ac - v.y * as,
			v.x * as + v.y * ac
		);

	}

	// forms a basis with the normal vector as Z
	mat3 getBasisFromNormal( vec3 normal ) {

		vec3 other;
		if ( abs( normal.x ) > 0.5 ) {

			other = vec3( 0.0, 1.0, 0.0 );

		} else {

			other = vec3( 1.0, 0.0, 0.0 );

		}

		vec3 ortho = normalize( cross( normal, other ) );
		vec3 ortho2 = normalize( cross( normal, ortho ) );
		return mat3( ortho2, ortho, normal );

	}

`;var jp=`

	// Finds the point where the ray intersects the plane defined by u and v and checks if this point
	// falls in the bounds of the rectangle on that same plane.
	// Plane intersection: https://lousodrome.net/blog/light/2020/07/03/intersection-of-a-ray-and-a-plane/
	bool intersectsRectangle( vec3 center, vec3 normal, vec3 u, vec3 v, vec3 rayOrigin, vec3 rayDirection, inout float dist ) {

		float t = dot( center - rayOrigin, normal ) / dot( rayDirection, normal );

		if ( t > EPSILON ) {

			vec3 p = rayOrigin + rayDirection * t;
			vec3 vi = p - center;

			// check if p falls inside the rectangle
			float a1 = dot( u, vi );
			if ( abs( a1 ) <= 0.5 ) {

				float a2 = dot( v, vi );
				if ( abs( a2 ) <= 0.5 ) {

					dist = t;
					return true;

				}

			}

		}

		return false;

	}

	// Finds the point where the ray intersects the plane defined by u and v and checks if this point
	// falls in the bounds of the circle on that same plane. See above URL for a description of the plane intersection algorithm.
	bool intersectsCircle( vec3 position, vec3 normal, vec3 u, vec3 v, vec3 rayOrigin, vec3 rayDirection, inout float dist ) {

		float t = dot( position - rayOrigin, normal ) / dot( rayDirection, normal );

		if ( t > EPSILON ) {

			vec3 hit = rayOrigin + rayDirection * t;
			vec3 vi = hit - position;

			float a1 = dot( u, vi );
			float a2 = dot( v, vi );

			if( length( vec2( a1, a2 ) ) <= 0.5 ) {

				dist = t;
				return true;

			}

		}

		return false;

	}

`;var Qp=`

	// add texel fetch functions for texture arrays
	vec4 texelFetch1D( sampler2DArray tex, int layer, uint index ) {

		uint width = uint( textureSize( tex, 0 ).x );
		uvec2 uv;
		uv.x = index % width;
		uv.y = index / width;

		return texelFetch( tex, ivec3( uv, layer ), 0 );

	}

	vec4 textureSampleBarycoord( sampler2DArray tex, int layer, vec3 barycoord, uvec3 faceIndices ) {

		return
			barycoord.x * texelFetch1D( tex, layer, faceIndices.x ) +
			barycoord.y * texelFetch1D( tex, layer, faceIndices.y ) +
			barycoord.z * texelFetch1D( tex, layer, faceIndices.z );

	}

`;var Ka=`

	// TODO: possibly this should be renamed something related to material or path tracing logic

	#ifndef RAY_OFFSET
	#define RAY_OFFSET 1e-4
	#endif

	// adjust the hit point by the surface normal by a factor of some offset and the
	// maximum component-wise value of the current point to accommodate floating point
	// error as values increase.
	vec3 stepRayOrigin( vec3 rayOrigin, vec3 rayDirection, vec3 offset, float dist ) {

		vec3 point = rayOrigin + rayDirection * dist;
		vec3 absPoint = abs( point );
		float maxPoint = max( absPoint.x, max( absPoint.y, absPoint.z ) );
		return point + offset * ( maxPoint + 1.0 ) * RAY_OFFSET;

	}

	// https://github.com/KhronosGroup/glTF/blob/main/extensions/2.0/Khronos/KHR_materials_volume/README.md#attenuation
	vec3 transmissionAttenuation( float dist, vec3 attColor, float attDist ) {

		vec3 ot = - log( attColor ) / attDist;
		return exp( - ot * dist );

	}

	vec3 getHalfVector( vec3 wi, vec3 wo, float eta ) {

		// get the half vector - assuming if the light incident vector is on the other side
		// of the that it's transmissive.
		vec3 h;
		if ( wi.z > 0.0 ) {

			h = normalize( wi + wo );

		} else {

			// Scale by the ior ratio to retrieve the appropriate half vector
			// From Section 2.2 on computing the transmission half vector:
			// https://blog.selfshadow.com/publications/s2015-shading-course/burley/s2015_pbs_disney_bsdf_notes.pdf
			h = normalize( wi + wo * eta );

		}

		h *= sign( h.z );
		return h;

	}

	vec3 getHalfVector( vec3 a, vec3 b ) {

		return normalize( a + b );

	}

	// The discrepancy between interpolated surface normal and geometry normal can cause issues when a ray
	// is cast that is on the top side of the geometry normal plane but below the surface normal plane. If
	// we find a ray like that we ignore it to avoid artifacts.
	// This function returns if the direction is on the same side of both planes.
	bool isDirectionValid( vec3 direction, vec3 surfaceNormal, vec3 geometryNormal ) {

		bool aboveSurfaceNormal = dot( direction, surfaceNormal ) > 0.0;
		bool aboveGeometryNormal = dot( direction, geometryNormal ) > 0.0;
		return aboveSurfaceNormal == aboveGeometryNormal;

	}

	// ray sampling x and z are swapped to align with expected background view
	vec2 equirectDirectionToUv( vec3 direction ) {

		// from Spherical.setFromCartesianCoords
		vec2 uv = vec2( atan( direction.z, direction.x ), acos( direction.y ) );
		uv /= vec2( 2.0 * PI, PI );

		// apply adjustments to get values in range [0, 1] and y right side up
		uv.x += 0.5;
		uv.y = 1.0 - uv.y;
		return uv;

	}

	vec3 equirectUvToDirection( vec2 uv ) {

		// undo above adjustments
		uv.x -= 0.5;
		uv.y = 1.0 - uv.y;

		// from Vector3.setFromSphericalCoords
		float theta = uv.x * 2.0 * PI;
		float phi = uv.y * PI;

		float sinPhi = sin( phi );

		return vec3( sinPhi * cos( theta ), cos( phi ), sinPhi * sin( theta ) );

	}

	// power heuristic for multiple importance sampling
	float misHeuristic( float a, float b ) {

		float aa = a * a;
		float bb = b * b;
		return aa / ( aa + bb );

	}

	// tentFilter from Peter Shirley's 'Realistic Ray Tracing (2nd Edition)' book, pg. 60
	// erichlof/THREE.js-PathTracing-Renderer/
	float tentFilter( float x ) {

		return x < 0.5 ? sqrt( 2.0 * x ) - 1.0 : 1.0 - sqrt( 2.0 - ( 2.0 * x ) );

	}
`;var Ul=`

	// https://www.shadertoy.com/view/wltcRS
	uvec4 WHITE_NOISE_SEED;

	void rng_initialize( vec2 p, int frame ) {

		// white noise seed
		WHITE_NOISE_SEED = uvec4( p, uint( frame ), uint( p.x ) + uint( p.y ) );

	}

	// https://www.pcg-random.org/
	void pcg4d( inout uvec4 v ) {

		v = v * 1664525u + 1013904223u;
		v.x += v.y * v.w;
		v.y += v.z * v.x;
		v.z += v.x * v.y;
		v.w += v.y * v.z;
		v = v ^ ( v >> 16u );
		v.x += v.y*v.w;
		v.y += v.z*v.x;
		v.z += v.x*v.y;
		v.w += v.y*v.z;

	}

	// returns [ 0, 1 ]
	float pcgRand() {

		pcg4d( WHITE_NOISE_SEED );
		return float( WHITE_NOISE_SEED.x ) / float( 0xffffffffu );

	}

	vec2 pcgRand2() {

		pcg4d( WHITE_NOISE_SEED );
		return vec2( WHITE_NOISE_SEED.xy ) / float(0xffffffffu);

	}

	vec3 pcgRand3() {

		pcg4d( WHITE_NOISE_SEED );
		return vec3( WHITE_NOISE_SEED.xyz ) / float( 0xffffffffu );

	}

	vec4 pcgRand4() {

		pcg4d( WHITE_NOISE_SEED );
		return vec4( WHITE_NOISE_SEED ) / float( 0xffffffffu );

	}
`;var Jp=`

	uniform sampler2D stratifiedTexture;
	uniform sampler2D stratifiedOffsetTexture;

	uint sobolPixelIndex = 0u;
	uint sobolPathIndex = 0u;
	uint sobolBounceIndex = 0u;
	vec4 pixelSeed = vec4( 0 );

	vec4 rand4( int v ) {

		ivec2 uv = ivec2( v, sobolBounceIndex );
		vec4 stratifiedSample = texelFetch( stratifiedTexture, uv, 0 );
		return fract( stratifiedSample + pixelSeed.r ); // blue noise + stratified samples

	}

	vec3 rand3( int v ) {

		return rand4( v ).xyz;

	}

	vec2 rand2( int v ) {

		return rand4( v ).xy;

	}

	float rand( int v ) {

		return rand4( v ).x;

	}

	void rng_initialize( vec2 screenCoord, int frame ) {

		// tile the small noise texture across the entire screen
		ivec2 noiseSize = ivec2( textureSize( stratifiedOffsetTexture, 0 ) );
		ivec2 pixel = ivec2( screenCoord.xy ) % noiseSize;
		vec2 pixelWidth = 1.0 / vec2( noiseSize );
		vec2 uv = vec2( pixel ) * pixelWidth + pixelWidth * 0.5;

		// note that using "texelFetch" here seems to break Android for some reason
		pixelSeed = texture( stratifiedOffsetTexture, uv );

	}

`;var eh=`

	// diffuse
	float diffuseEval( vec3 wo, vec3 wi, vec3 wh, SurfaceRecord surf, inout vec3 color ) {

		// https://schuttejoe.github.io/post/disneybsdf/
		float fl = schlickFresnel( wi.z, 0.0 );
		float fv = schlickFresnel( wo.z, 0.0 );

		float metalFactor = ( 1.0 - surf.metalness );
		float transFactor = ( 1.0 - surf.transmission );
		float rr = 0.5 + 2.0 * surf.roughness * fl * fl;
		float retro = rr * ( fl + fv + fl * fv * ( rr - 1.0f ) );
		float lambert = ( 1.0f - 0.5f * fl ) * ( 1.0f - 0.5f * fv );

		// TODO: subsurface approx?

		// float F = evaluateFresnelWeight( dot( wo, wh ), surf.eta, surf.f0 );
		float F = disneyFresnel( wo, wi, wh, surf.f0, surf.eta, surf.metalness );
		color = ( 1.0 - F ) * transFactor * metalFactor * wi.z * surf.color * ( retro + lambert ) / PI;

		return wi.z / PI;

	}

	vec3 diffuseDirection( vec3 wo, SurfaceRecord surf ) {

		vec3 lightDirection = sampleSphere( rand2( 11 ) );
		lightDirection.z += 1.0;
		lightDirection = normalize( lightDirection );

		return lightDirection;

	}

	// specular
	float specularEval( vec3 wo, vec3 wi, vec3 wh, SurfaceRecord surf, inout vec3 color ) {

		// if roughness is set to 0 then D === NaN which results in black pixels
		float metalness = surf.metalness;
		float roughness = surf.filteredRoughness;

		float eta = surf.eta;
		float f0 = surf.f0;

		vec3 f0Color = mix( f0 * surf.specularColor * surf.specularIntensity, surf.color, surf.metalness );
		vec3 f90Color = vec3( mix( surf.specularIntensity, 1.0, surf.metalness ) );
		vec3 F = evaluateFresnel( dot( wo, wh ), eta, f0Color, f90Color );

		vec3 iridescenceF = evalIridescence( 1.0, surf.iridescenceIor, dot( wi, wh ), surf.iridescenceThickness, f0Color );
		F = mix( F, iridescenceF,  surf.iridescence );

		// PDF
		// See 14.1.1 Microfacet BxDFs in https://www.pbr-book.org/
		float incidentTheta = acos( wo.z );
		float G = ggxShadowMaskG2( wi, wo, roughness );
		float D = ggxDistribution( wh, roughness );
		float G1 = ggxShadowMaskG1( incidentTheta, roughness );
		float ggxPdf = D * G1 * max( 0.0, abs( dot( wo, wh ) ) ) / abs ( wo.z );

		color = wi.z * F * G * D / ( 4.0 * abs( wi.z * wo.z ) );
		return ggxPdf / ( 4.0 * dot( wo, wh ) );

	}

	vec3 specularDirection( vec3 wo, SurfaceRecord surf ) {

		// sample ggx vndf distribution which gives a new normal
		float roughness = surf.filteredRoughness;
		vec3 halfVector = ggxDirection(
			wo,
			vec2( roughness ),
			rand2( 12 )
		);

		// apply to new ray by reflecting off the new normal
		return - reflect( wo, halfVector );

	}


	// transmission
	/*
	float transmissionEval( vec3 wo, vec3 wi, vec3 wh, SurfaceRecord surf, inout vec3 color ) {

		// See section 4.2 in https://www.cs.cornell.edu/~srm/publications/EGSR07-btdf.pdf

		float filteredRoughness = surf.filteredRoughness;
		float eta = surf.eta;
		bool frontFace = surf.frontFace;
		bool thinFilm = surf.thinFilm;

		color = surf.transmission * surf.color;

		float denom = pow( eta * dot( wi, wh ) + dot( wo, wh ), 2.0 );
		return ggxPDF( wo, wh, filteredRoughness ) / denom;

	}

	vec3 transmissionDirection( vec3 wo, SurfaceRecord surf ) {

		float filteredRoughness = surf.filteredRoughness;
		float eta = surf.eta;
		bool frontFace = surf.frontFace;

		// sample ggx vndf distribution which gives a new normal
		vec3 halfVector = ggxDirection(
			wo,
			vec2( filteredRoughness ),
			rand2( 13 )
		);

		vec3 lightDirection = refract( normalize( - wo ), halfVector, eta );
		if ( surf.thinFilm ) {

			lightDirection = - refract( normalize( - lightDirection ), - vec3( 0.0, 0.0, 1.0 ), 1.0 / eta );

		}

		return normalize( lightDirection );

	}
	*/

	// TODO: This is just using a basic cosine-weighted specular distribution with an
	// incorrect PDF value at the moment. Update it to correctly use a GGX distribution
	float transmissionEval( vec3 wo, vec3 wi, vec3 wh, SurfaceRecord surf, inout vec3 color ) {

		color = surf.transmission * surf.color;

		// PDF
		// float F = evaluateFresnelWeight( dot( wo, wh ), surf.eta, surf.f0 );
		// float F = disneyFresnel( wo, wi, wh, surf.f0, surf.eta, surf.metalness );
		// if ( F >= 1.0 ) {

		// 	return 0.0;

		// }

		// return 1.0 / ( 1.0 - F );

		// reverted to previous to transmission. The above was causing black pixels
		float eta = surf.eta;
		float f0 = surf.f0;
		float cosTheta = min( wo.z, 1.0 );
		float sinTheta = sqrt( 1.0 - cosTheta * cosTheta );
		float reflectance = schlickFresnel( cosTheta, f0 );
		bool cannotRefract = eta * sinTheta > 1.0;
		if ( cannotRefract ) {

			return 0.0;

		}

		return 1.0 / ( 1.0 - reflectance );

	}

	vec3 transmissionDirection( vec3 wo, SurfaceRecord surf ) {

		float roughness = surf.filteredRoughness;
		float eta = surf.eta;
		vec3 halfVector = normalize( vec3( 0.0, 0.0, 1.0 ) + sampleSphere( rand2( 13 ) ) * roughness );
		vec3 lightDirection = refract( normalize( - wo ), halfVector, eta );

		if ( surf.thinFilm ) {

			lightDirection = - refract( normalize( - lightDirection ), - vec3( 0.0, 0.0, 1.0 ), 1.0 / eta );

		}
		return normalize( lightDirection );

	}

	// clearcoat
	float clearcoatEval( vec3 wo, vec3 wi, vec3 wh, SurfaceRecord surf, inout vec3 color ) {

		float ior = 1.5;
		float f0 = iorRatioToF0( ior );
		bool frontFace = surf.frontFace;
		float roughness = surf.filteredClearcoatRoughness;

		float eta = frontFace ? 1.0 / ior : ior;
		float G = ggxShadowMaskG2( wi, wo, roughness );
		float D = ggxDistribution( wh, roughness );
		float F = schlickFresnel( dot( wi, wh ), f0 );

		float fClearcoat = F * D * G / ( 4.0 * abs( wi.z * wo.z ) );
		color = color * ( 1.0 - surf.clearcoat * F ) + fClearcoat * surf.clearcoat * wi.z;

		// PDF
		// See equation (27) in http://jcgt.org/published/0003/02/03/
		return ggxPDF( wo, wh, roughness ) / ( 4.0 * dot( wi, wh ) );

	}

	vec3 clearcoatDirection( vec3 wo, SurfaceRecord surf ) {

		// sample ggx vndf distribution which gives a new normal
		float roughness = surf.filteredClearcoatRoughness;
		vec3 halfVector = ggxDirection(
			wo,
			vec2( roughness ),
			rand2( 14 )
		);

		// apply to new ray by reflecting off the new normal
		return - reflect( wo, halfVector );

	}

	// sheen
	vec3 sheenColor( vec3 wo, vec3 wi, vec3 wh, SurfaceRecord surf ) {

		float cosThetaO = saturateCos( wo.z );
		float cosThetaI = saturateCos( wi.z );
		float cosThetaH = wh.z;

		float D = velvetD( cosThetaH, surf.sheenRoughness );
		float G = velvetG( cosThetaO, cosThetaI, surf.sheenRoughness );

		// See equation (1) in http://www.aconty.com/pdf/s2017_pbs_imageworks_sheen.pdf
		vec3 color = surf.sheenColor;
		color *= D * G / ( 4.0 * abs( cosThetaO * cosThetaI ) );
		color *= wi.z;

		return color;

	}

	// bsdf
	void getLobeWeights(
		vec3 wo, vec3 wi, vec3 wh, vec3 clearcoatWo, SurfaceRecord surf,
		inout float diffuseWeight, inout float specularWeight, inout float transmissionWeight, inout float clearcoatWeight
	) {

		float metalness = surf.metalness;
		float transmission = surf.transmission;
		// float fEstimate = evaluateFresnelWeight( dot( wo, wh ), surf.eta, surf.f0 );
		float fEstimate = disneyFresnel( wo, wi, wh, surf.f0, surf.eta, surf.metalness );

		float transSpecularProb = mix( max( 0.25, fEstimate ), 1.0, metalness );
		float diffSpecularProb = 0.5 + 0.5 * metalness;

		diffuseWeight = ( 1.0 - transmission ) * ( 1.0 - diffSpecularProb );
		specularWeight = transmission * transSpecularProb + ( 1.0 - transmission ) * diffSpecularProb;
		transmissionWeight = transmission * ( 1.0 - transSpecularProb );
		clearcoatWeight = surf.clearcoat * schlickFresnel( clearcoatWo.z, 0.04 );

		float totalWeight = diffuseWeight + specularWeight + transmissionWeight + clearcoatWeight;
		diffuseWeight /= totalWeight;
		specularWeight /= totalWeight;
		transmissionWeight /= totalWeight;
		clearcoatWeight /= totalWeight;
	}

	float bsdfEval(
		vec3 wo, vec3 clearcoatWo, vec3 wi, vec3 clearcoatWi, SurfaceRecord surf,
		float diffuseWeight, float specularWeight, float transmissionWeight, float clearcoatWeight, inout float specularPdf, inout vec3 color
	) {

		float metalness = surf.metalness;
		float transmission = surf.transmission;

		float spdf = 0.0;
		float dpdf = 0.0;
		float tpdf = 0.0;
		float cpdf = 0.0;
		color = vec3( 0.0 );

		vec3 halfVector = getHalfVector( wi, wo, surf.eta );

		// diffuse
		if ( diffuseWeight > 0.0 && wi.z > 0.0 ) {

			dpdf = diffuseEval( wo, wi, halfVector, surf, color );
			color *= 1.0 - surf.transmission;

		}

		// ggx specular
		if ( specularWeight > 0.0 && wi.z > 0.0 ) {

			vec3 outColor;
			spdf = specularEval( wo, wi, getHalfVector( wi, wo ), surf, outColor );
			color += outColor;

		}

		// transmission
		if ( transmissionWeight > 0.0 && wi.z < 0.0 ) {

			tpdf = transmissionEval( wo, wi, halfVector, surf, color );

		}

		// sheen
		color *= mix( 1.0, sheenAlbedoScaling( wo, wi, surf ), surf.sheen );
		color += sheenColor( wo, wi, halfVector, surf ) * surf.sheen;

		// clearcoat
		if ( clearcoatWi.z >= 0.0 && clearcoatWeight > 0.0 ) {

			vec3 clearcoatHalfVector = getHalfVector( clearcoatWo, clearcoatWi );
			cpdf = clearcoatEval( clearcoatWo, clearcoatWi, clearcoatHalfVector, surf, color );

		}

		float pdf =
			dpdf * diffuseWeight
			+ spdf * specularWeight
			+ tpdf * transmissionWeight
			+ cpdf * clearcoatWeight;

		// retrieve specular rays for the shadows flag
		specularPdf = spdf * specularWeight + cpdf * clearcoatWeight;

		return pdf;

	}

	float bsdfResult( vec3 worldWo, vec3 worldWi, SurfaceRecord surf, inout vec3 color ) {

		if ( surf.volumeParticle ) {

			color = surf.color / ( 4.0 * PI );
			return 1.0 / ( 4.0 * PI );

		}

		vec3 wo = normalize( surf.normalInvBasis * worldWo );
		vec3 wi = normalize( surf.normalInvBasis * worldWi );

		vec3 clearcoatWo = normalize( surf.clearcoatInvBasis * worldWo );
		vec3 clearcoatWi = normalize( surf.clearcoatInvBasis * worldWi );

		vec3 wh = getHalfVector( wo, wi, surf.eta );
		float diffuseWeight;
		float specularWeight;
		float transmissionWeight;
		float clearcoatWeight;
		getLobeWeights( wo, wi, wh, clearcoatWo, surf, diffuseWeight, specularWeight, transmissionWeight, clearcoatWeight );

		float specularPdf;
		return bsdfEval( wo, clearcoatWo, wi, clearcoatWi, surf, diffuseWeight, specularWeight, transmissionWeight, clearcoatWeight, specularPdf, color );

	}

	ScatterRecord bsdfSample( vec3 worldWo, SurfaceRecord surf ) {

		if ( surf.volumeParticle ) {

			ScatterRecord sampleRec;
			sampleRec.specularPdf = 0.0;
			sampleRec.pdf = 1.0 / ( 4.0 * PI );
			sampleRec.direction = sampleSphere( rand2( 16 ) );
			sampleRec.color = surf.color / ( 4.0 * PI );
			return sampleRec;

		}

		vec3 wo = normalize( surf.normalInvBasis * worldWo );
		vec3 clearcoatWo = normalize( surf.clearcoatInvBasis * worldWo );
		mat3 normalBasis = surf.normalBasis;
		mat3 invBasis = surf.normalInvBasis;
		mat3 clearcoatNormalBasis = surf.clearcoatBasis;
		mat3 clearcoatInvBasis = surf.clearcoatInvBasis;

		float diffuseWeight;
		float specularWeight;
		float transmissionWeight;
		float clearcoatWeight;
		// using normal and basically-reflected ray since we don't have proper half vector here
		getLobeWeights( wo, wo, vec3( 0, 0, 1 ), clearcoatWo, surf, diffuseWeight, specularWeight, transmissionWeight, clearcoatWeight );

		float pdf[4];
		pdf[0] = diffuseWeight;
		pdf[1] = specularWeight;
		pdf[2] = transmissionWeight;
		pdf[3] = clearcoatWeight;

		float cdf[4];
		cdf[0] = pdf[0];
		cdf[1] = pdf[1] + cdf[0];
		cdf[2] = pdf[2] + cdf[1];
		cdf[3] = pdf[3] + cdf[2];

		if( cdf[3] != 0.0 ) {

			float invMaxCdf = 1.0 / cdf[3];
			cdf[0] *= invMaxCdf;
			cdf[1] *= invMaxCdf;
			cdf[2] *= invMaxCdf;
			cdf[3] *= invMaxCdf;

		} else {

			cdf[0] = 1.0;
			cdf[1] = 0.0;
			cdf[2] = 0.0;
			cdf[3] = 0.0;

		}

		vec3 wi;
		vec3 clearcoatWi;

		float r = rand( 15 );
		if ( r <= cdf[0] ) { // diffuse

			wi = diffuseDirection( wo, surf );
			clearcoatWi = normalize( clearcoatInvBasis * normalize( normalBasis * wi ) );

		} else if ( r <= cdf[1] ) { // specular

			wi = specularDirection( wo, surf );
			clearcoatWi = normalize( clearcoatInvBasis * normalize( normalBasis * wi ) );

		} else if ( r <= cdf[2] ) { // transmission / refraction

			wi = transmissionDirection( wo, surf );
			clearcoatWi = normalize( clearcoatInvBasis * normalize( normalBasis * wi ) );

		} else if ( r <= cdf[3] ) { // clearcoat

			clearcoatWi = clearcoatDirection( clearcoatWo, surf );
			wi = normalize( invBasis * normalize( clearcoatNormalBasis * clearcoatWi ) );

		}

		ScatterRecord result;
		result.pdf = bsdfEval( wo, clearcoatWo, wi, clearcoatWi, surf, diffuseWeight, specularWeight, transmissionWeight, clearcoatWeight, result.specularPdf, result.color );
		result.direction = normalize( surf.normalBasis * wi );

		return result;

	}

`;var th=`

	// returns the hit distance given the material density
	float intersectFogVolume( Material material, float u ) {

		// https://raytracing.github.io/books/RayTracingTheNextWeek.html#volumes/constantdensitymediums
		return material.opacity == 0.0 ? INFINITY : ( - 1.0 / material.opacity ) * log( u );

	}

	ScatterRecord sampleFogVolume( SurfaceRecord surf, vec2 uv ) {

		ScatterRecord sampleRec;
		sampleRec.specularPdf = 0.0;
		sampleRec.pdf = 1.0 / ( 2.0 * PI );
		sampleRec.direction = sampleSphere( uv );
		sampleRec.color = surf.color;
		return sampleRec;

	}

`;var nh=`

	// The GGX functions provide sampling and distribution information for normals as output so
	// in order to get probability of scatter direction the half vector must be computed and provided.
	// [0] https://www.cs.cornell.edu/~srm/publications/EGSR07-btdf.pdf
	// [1] https://hal.archives-ouvertes.fr/hal-01509746/document
	// [2] http://jcgt.org/published/0007/04/01/
	// [4] http://jcgt.org/published/0003/02/03/

	// trowbridge-reitz === GGX === GTR

	vec3 ggxDirection( vec3 incidentDir, vec2 roughness, vec2 uv ) {

		// TODO: try GGXVNDF implementation from reference [2], here. Needs to update ggxDistribution
		// function below, as well

		// Implementation from reference [1]
		// stretch view
		vec3 V = normalize( vec3( roughness * incidentDir.xy, incidentDir.z ) );

		// orthonormal basis
		vec3 T1 = ( V.z < 0.9999 ) ? normalize( cross( V, vec3( 0.0, 0.0, 1.0 ) ) ) : vec3( 1.0, 0.0, 0.0 );
		vec3 T2 = cross( T1, V );

		// sample point with polar coordinates (r, phi)
		float a = 1.0 / ( 1.0 + V.z );
		float r = sqrt( uv.x );
		float phi = ( uv.y < a ) ? uv.y / a * PI : PI + ( uv.y - a ) / ( 1.0 - a ) * PI;
		float P1 = r * cos( phi );
		float P2 = r * sin( phi ) * ( ( uv.y < a ) ? 1.0 : V.z );

		// compute normal
		vec3 N = P1 * T1 + P2 * T2 + V * sqrt( max( 0.0, 1.0 - P1 * P1 - P2 * P2 ) );

		// unstretch
		N = normalize( vec3( roughness * N.xy, max( 0.0, N.z ) ) );

		return N;

	}

	// Below are PDF and related functions for use in a Monte Carlo path tracer
	// as specified in Appendix B of the following paper
	// See equation (34) from reference [0]
	float ggxLamda( float theta, float roughness ) {

		float tanTheta = tan( theta );
		float tanTheta2 = tanTheta * tanTheta;
		float alpha2 = roughness * roughness;

		float numerator = - 1.0 + sqrt( 1.0 + alpha2 * tanTheta2 );
		return numerator / 2.0;

	}

	// See equation (34) from reference [0]
	float ggxShadowMaskG1( float theta, float roughness ) {

		return 1.0 / ( 1.0 + ggxLamda( theta, roughness ) );

	}

	// See equation (125) from reference [4]
	float ggxShadowMaskG2( vec3 wi, vec3 wo, float roughness ) {

		float incidentTheta = acos( wi.z );
		float scatterTheta = acos( wo.z );
		return 1.0 / ( 1.0 + ggxLamda( incidentTheta, roughness ) + ggxLamda( scatterTheta, roughness ) );

	}

	// See equation (33) from reference [0]
	float ggxDistribution( vec3 halfVector, float roughness ) {

		float a2 = roughness * roughness;
		a2 = max( EPSILON, a2 );
		float cosTheta = halfVector.z;
		float cosTheta4 = pow( cosTheta, 4.0 );

		if ( cosTheta == 0.0 ) return 0.0;

		float theta = acosSafe( halfVector.z );
		float tanTheta = tan( theta );
		float tanTheta2 = pow( tanTheta, 2.0 );

		float denom = PI * cosTheta4 * pow( a2 + tanTheta2, 2.0 );
		return ( a2 / denom );

	}

	// See equation (3) from reference [2]
	float ggxPDF( vec3 wi, vec3 halfVector, float roughness ) {

		float incidentTheta = acos( wi.z );
		float D = ggxDistribution( halfVector, roughness );
		float G1 = ggxShadowMaskG1( incidentTheta, roughness );

		return D * G1 * max( 0.0, dot( wi, halfVector ) ) / wi.z;

	}

`;var ih=`

	// XYZ to sRGB color space
	const mat3 XYZ_TO_REC709 = mat3(
		3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);

	vec3 fresnel0ToIor( vec3 fresnel0 ) {

		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );

	}

	// Conversion FO/IOR
	vec3 iorToFresnel0( vec3 transmittedIor, float incidentIor ) {

		return square( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );

	}

	// ior is a value between 1.0 and 3.0. 1.0 is air interface
	float iorToFresnel0( float transmittedIor, float incidentIor ) {

		return square( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ) );

	}

	// Fresnel equations for dielectric/dielectric interfaces. See https://belcour.github.io/blog/research/2017/05/01/brdf-thin-film.html
	vec3 evalSensitivity( float OPD, vec3 shift ) {

		float phase = 2.0 * PI * OPD * 1.0e-9;

		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );

		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - square( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * square( phase ) );
		xyz /= 1.0685e-7;

		vec3 srgb = XYZ_TO_REC709 * xyz;
		return srgb;

	}

	// See Section 4. Analytic Spectral Integration, A Practical Extension to Microfacet Theory for the Modeling of Varying Iridescence, https://hal.archives-ouvertes.fr/hal-01518344/document
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {

		vec3 I;

		// Force iridescenceIor -> outsideIOR when thinFilmThickness -> 0.0
		float iridescenceIor = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );

		// Evaluate the cosTheta on the base layer (Snell law)
		float sinTheta2Sq = square( outsideIOR / iridescenceIor ) * ( 1.0 - square( cosTheta1 ) );

		// Handle TIR:
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {

			return vec3( 1.0 );

		}

		float cosTheta2 = sqrt( cosTheta2Sq );

		// First interface
		float R0 = iorToFresnel0( iridescenceIor, outsideIOR );
		float R12 = schlickFresnel( cosTheta1, R0 );
		float R21 = R12;
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIor < outsideIOR ) {

			phi12 = PI;

		}

		float phi21 = PI - phi12;

		// Second interface
		vec3 baseIOR = fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) ); // guard against 1.0
		vec3 R1 = iorToFresnel0( baseIOR, iridescenceIor );
		vec3 R23 = schlickFresnel( cosTheta2, R1 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[0] < iridescenceIor ) {

			phi23[ 0 ] = PI;

		}

		if ( baseIOR[1] < iridescenceIor ) {

			phi23[ 1 ] = PI;

		}

		if ( baseIOR[2] < iridescenceIor ) {

			phi23[ 2 ] = PI;

		}

		// Phase shift
		float OPD = 2.0 * iridescenceIor * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;

		// Compound terms
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = square( T121 ) * R23 / ( vec3( 1.0 ) - R123 );

		// Reflectance term for m = 0 (DC term amplitude)
		vec3 C0 = R12 + Rs;
		I = C0;

		// Reflectance term for m > 0 (pairs of diracs)
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {

			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;

		}

		// Since out of gamut colors might be produced, negative color values are clamped to 0.
		return max( I, vec3( 0.0 ) );

	}

`;var rh=`

	// See equation (2) in http://www.aconty.com/pdf/s2017_pbs_imageworks_sheen.pdf
	float velvetD( float cosThetaH, float roughness ) {

		float alpha = max( roughness, 0.07 );
		alpha = alpha * alpha;

		float invAlpha = 1.0 / alpha;

		float sqrCosThetaH = cosThetaH * cosThetaH;
		float sinThetaH = max( 1.0 - sqrCosThetaH, 0.001 );

		return ( 2.0 + invAlpha ) * pow( sinThetaH, 0.5 * invAlpha ) / ( 2.0 * PI );

	}

	float velvetParamsInterpolate( int i, float oneMinusAlphaSquared ) {

		const float p0[5] = float[5]( 25.3245, 3.32435, 0.16801, -1.27393, -4.85967 );
		const float p1[5] = float[5]( 21.5473, 3.82987, 0.19823, -1.97760, -4.32054 );

		return mix( p1[i], p0[i], oneMinusAlphaSquared );

	}

	float velvetL( float x, float alpha ) {

		float oneMinusAlpha = 1.0 - alpha;
		float oneMinusAlphaSquared = oneMinusAlpha * oneMinusAlpha;

		float a = velvetParamsInterpolate( 0, oneMinusAlphaSquared );
		float b = velvetParamsInterpolate( 1, oneMinusAlphaSquared );
		float c = velvetParamsInterpolate( 2, oneMinusAlphaSquared );
		float d = velvetParamsInterpolate( 3, oneMinusAlphaSquared );
		float e = velvetParamsInterpolate( 4, oneMinusAlphaSquared );

		return a / ( 1.0 + b * pow( abs( x ), c ) ) + d * x + e;

	}

	// See equation (3) in http://www.aconty.com/pdf/s2017_pbs_imageworks_sheen.pdf
	float velvetLambda( float cosTheta, float alpha ) {

		return abs( cosTheta ) < 0.5 ? exp( velvetL( cosTheta, alpha ) ) : exp( 2.0 * velvetL( 0.5, alpha ) - velvetL( 1.0 - cosTheta, alpha ) );

	}

	// See Section 3, Shadowing Term, in http://www.aconty.com/pdf/s2017_pbs_imageworks_sheen.pdf
	float velvetG( float cosThetaO, float cosThetaI, float roughness ) {

		float alpha = max( roughness, 0.07 );
		alpha = alpha * alpha;

		return 1.0 / ( 1.0 + velvetLambda( cosThetaO, alpha ) + velvetLambda( cosThetaI, alpha ) );

	}

	float directionalAlbedoSheen( float cosTheta, float alpha ) {

		cosTheta = saturate( cosTheta );

		float c = 1.0 - cosTheta;
		float c3 = c * c * c;

		return 0.65584461 * c3 + 1.0 / ( 4.16526551 + exp( -7.97291361 * sqrt( alpha ) + 6.33516894 ) );

	}

	float sheenAlbedoScaling( vec3 wo, vec3 wi, SurfaceRecord surf ) {

		float alpha = max( surf.sheenRoughness, 0.07 );
		alpha = alpha * alpha;

		float maxSheenColor = max( max( surf.sheenColor.r, surf.sheenColor.g ), surf.sheenColor.b );

		float eWo = directionalAlbedoSheen( saturateCos( wo.z ), alpha );
		float eWi = directionalAlbedoSheen( saturateCos( wi.z ), alpha );

		return min( 1.0 - maxSheenColor * eWo, 1.0 - maxSheenColor * eWi );

	}

	// See Section 5, Layering, in http://www.aconty.com/pdf/s2017_pbs_imageworks_sheen.pdf
	float sheenAlbedoScaling( vec3 wo, SurfaceRecord surf ) {

		float alpha = max( surf.sheenRoughness, 0.07 );
		alpha = alpha * alpha;

		float maxSheenColor = max( max( surf.sheenColor.r, surf.sheenColor.g ), surf.sheenColor.b );

		float eWo = directionalAlbedoSheen( saturateCos( wo.z ), alpha );

		return 1.0 - maxSheenColor * eWo;

	}

`;var oh=`

#ifndef FOG_CHECK_ITERATIONS
#define FOG_CHECK_ITERATIONS 30
#endif

// returns whether the given material is a fog material or not
bool isMaterialFogVolume( sampler2D materials, uint materialIndex ) {

	uint i = materialIndex * uint( MATERIAL_PIXELS );
	vec4 s14 = texelFetch1D( materials, i + 14u );
	return bool( int( s14.b ) & 4 );

}

// returns true if we're within the first fog volume we hit
bool bvhIntersectFogVolumeHit(
	vec3 rayOrigin, vec3 rayDirection,
	usampler2D materialIndexAttribute, sampler2D materials,
	inout Material material
) {

	material.fogVolume = false;

	for ( int i = 0; i < FOG_CHECK_ITERATIONS; i ++ ) {

		// find nearest hit
		uvec4 faceIndices = uvec4( 0u );
		vec3 faceNormal = vec3( 0.0, 0.0, 1.0 );
		vec3 barycoord = vec3( 0.0 );
		float side = 1.0;
		float dist = 0.0;
		bool hit = bvhIntersectFirstHit( bvh, rayOrigin, rayDirection, faceIndices, faceNormal, barycoord, side, dist );
		if ( hit ) {

			// if it's a fog volume return whether we hit the front or back face
			uint materialIndex = uTexelFetch1D( materialIndexAttribute, faceIndices.x ).r;
			if ( isMaterialFogVolume( materials, materialIndex ) ) {

				material = readMaterialInfo( materials, materialIndex );
				return side == - 1.0;

			} else {

				// move the ray forward
				rayOrigin = stepRayOrigin( rayOrigin, rayDirection, - faceNormal, dist );

			}

		} else {

			return false;

		}

	}

	return false;

}

`;var ah=`

	// step through multiple surface hits and accumulate color attenuation based on transmissive surfaces
	// returns true if a solid surface was hit
	bool attenuateHit(
		RenderState state,
		Ray ray, float rayDist,
		out vec3 color
	) {

		// store the original bounce index so we can reset it after
		uint originalBounceIndex = sobolBounceIndex;

		int traversals = state.traversals;
		int transmissiveTraversals = state.transmissiveTraversals;
		bool isShadowRay = state.isShadowRay;
		Material fogMaterial = state.fogMaterial;

		vec3 startPoint = ray.origin;

		// hit results
		SurfaceHit surfaceHit;

		color = vec3( 1.0 );

		bool result = true;
		for ( int i = 0; i < traversals; i ++ ) {

			sobolBounceIndex ++;

			int hitType = traceScene( ray, fogMaterial, surfaceHit );

			if ( hitType == FOG_HIT ) {

				result = true;
				break;

			} else if ( hitType == SURFACE_HIT ) {

				float totalDist = distance( startPoint, ray.origin + ray.direction * surfaceHit.dist );
				if ( totalDist > rayDist ) {

					result = false;
					break;

				}

				// TODO: attenuate the contribution based on the PDF of the resulting ray including refraction values
				// Should be able to work using the material BSDF functions which will take into account specularity, etc.
				// TODO: should we account for emissive surfaces here?

				uint materialIndex = uTexelFetch1D( materialIndexAttribute, surfaceHit.faceIndices.x ).r;
				Material material = readMaterialInfo( materials, materialIndex );

				// adjust the ray to the new surface
				bool isEntering = surfaceHit.side == 1.0;
				ray.origin = stepRayOrigin( ray.origin, ray.direction, - surfaceHit.faceNormal, surfaceHit.dist );

				#if FEATURE_FOG

				if ( material.fogVolume ) {

					fogMaterial = material;
					fogMaterial.fogVolume = surfaceHit.side == 1.0;
					i -= sign( transmissiveTraversals );
					transmissiveTraversals --;
					continue;

				}

				#endif

				if ( ! material.castShadow && isShadowRay ) {

					continue;

				}

				vec2 uv = textureSampleBarycoord( attributesArray, ATTR_UV, surfaceHit.barycoord, surfaceHit.faceIndices.xyz ).xy;
				vec4 vertexColor = textureSampleBarycoord( attributesArray, ATTR_COLOR, surfaceHit.barycoord, surfaceHit.faceIndices.xyz );

				// albedo
				vec4 albedo = vec4( material.color, material.opacity );
				if ( material.map != - 1 ) {

					vec3 uvPrime = material.mapTransform * vec3( uv, 1 );
					albedo *= texture2D( textures, vec3( uvPrime.xy, material.map ) );

				}

				if ( material.vertexColors ) {

					albedo *= vertexColor;

				}

				// alphaMap
				if ( material.alphaMap != - 1 ) {

					vec3 uvPrime = material.alphaMapTransform * vec3( uv, 1 );
					albedo.a *= texture2D( textures, vec3( uvPrime.xy, material.alphaMap ) ).x;

				}

				// transmission
				float transmission = material.transmission;
				if ( material.transmissionMap != - 1 ) {

					vec3 uvPrime = material.transmissionMapTransform * vec3( uv, 1 );
					transmission *= texture2D( textures, vec3( uvPrime.xy, material.transmissionMap ) ).r;

				}

				// metalness
				float metalness = material.metalness;
				if ( material.metalnessMap != - 1 ) {

					vec3 uvPrime = material.metalnessMapTransform * vec3( uv, 1 );
					metalness *= texture2D( textures, vec3( uvPrime.xy, material.metalnessMap ) ).b;

				}

				float alphaTest = material.alphaTest;
				bool useAlphaTest = alphaTest != 0.0;
				float transmissionFactor = ( 1.0 - metalness ) * transmission;
				if (
					transmissionFactor < rand( 9 ) && ! (
						// material sidedness
						material.side != 0.0 && surfaceHit.side == material.side

						// alpha test
						|| useAlphaTest && albedo.a < alphaTest

						// opacity
						|| material.transparent && ! useAlphaTest && albedo.a < rand( 10 )
					)
				) {

					result = true;
					break;

				}

				if ( surfaceHit.side == 1.0 && isEntering ) {

					// only attenuate by surface color on the way in
					color *= mix( vec3( 1.0 ), albedo.rgb, transmissionFactor );

				} else if ( surfaceHit.side == - 1.0 ) {

					// attenuate by medium once we hit the opposite side of the model
					color *= transmissionAttenuation( surfaceHit.dist, material.attenuationColor, material.attenuationDistance );

				}

				bool isTransmissiveRay = dot( ray.direction, surfaceHit.faceNormal * surfaceHit.side ) < 0.0;
				if ( ( isTransmissiveRay || isEntering ) && transmissiveTraversals > 0 ) {

					i -= sign( transmissiveTraversals );
					transmissiveTraversals --;

				}

			} else {

				result = false;
				break;

			}

		}

		// reset the bounce index
		sobolBounceIndex = originalBounceIndex;
		return result;

	}

`;var sh=`

	vec3 ndcToRayOrigin( vec2 coord ) {

		vec4 rayOrigin4 = cameraWorldMatrix * invProjectionMatrix * vec4( coord, - 1.0, 1.0 );
		return rayOrigin4.xyz / rayOrigin4.w;
	}

	Ray getCameraRay() {

		vec2 ssd = vec2( 1.0 ) / resolution;

		// Jitter the camera ray by finding a uv coordinate at a random sample
		// around this pixel's UV coordinate for AA
		vec2 ruv = rand2( 0 );
		vec2 jitteredUv = vUv + vec2( tentFilter( ruv.x ) * ssd.x, tentFilter( ruv.y ) * ssd.y );
		Ray ray;

		#if CAMERA_TYPE == 2

			// Equirectangular projection
			vec4 rayDirection4 = vec4( equirectUvToDirection( jitteredUv ), 0.0 );
			vec4 rayOrigin4 = vec4( 0.0, 0.0, 0.0, 1.0 );

			rayDirection4 = cameraWorldMatrix * rayDirection4;
			rayOrigin4 = cameraWorldMatrix * rayOrigin4;

			ray.direction = normalize( rayDirection4.xyz );
			ray.origin = rayOrigin4.xyz / rayOrigin4.w;

		#else

			// get [- 1, 1] normalized device coordinates
			vec2 ndc = 2.0 * jitteredUv - vec2( 1.0 );
			ray.origin = ndcToRayOrigin( ndc );

			#if CAMERA_TYPE == 1

				// Orthographic projection
				ray.direction = ( cameraWorldMatrix * vec4( 0.0, 0.0, - 1.0, 0.0 ) ).xyz;
				ray.direction = normalize( ray.direction );

			#else

				// Perspective projection
				ray.direction = normalize( mat3( cameraWorldMatrix ) * ( invProjectionMatrix * vec4( ndc, 0.0, 1.0 ) ).xyz );

			#endif

		#endif

		#if FEATURE_DOF
		{

			// depth of field
			vec3 focalPoint = ray.origin + normalize( ray.direction ) * physicalCamera.focusDistance;

			// get the aperture sample
			// if blades === 0 then we assume a circle
			vec3 shapeUVW= rand3( 1 );
			int blades = physicalCamera.apertureBlades;
			float anamorphicRatio = physicalCamera.anamorphicRatio;
			vec2 apertureSample = sampleAperture( blades, shapeUVW );
			apertureSample *= physicalCamera.bokehSize * 0.5 * 1e-3;

			// rotate the aperture shape
			apertureSample =
				rotateVector( apertureSample, physicalCamera.apertureRotation ) *
				saturate( vec2( anamorphicRatio, 1.0 / anamorphicRatio ) );

			// create the new ray
			ray.origin += ( cameraWorldMatrix * vec4( apertureSample, 0.0, 0.0 ) ).xyz;
			ray.direction = focalPoint - ray.origin;

		}
		#endif

		ray.direction = normalize( ray.direction );

		return ray;

	}

`;var ch=`

	vec3 directLightContribution( vec3 worldWo, SurfaceRecord surf, RenderState state, vec3 rayOrigin ) {

		vec3 result = vec3( 0.0 );

		// uniformly pick a light or environment map
		if( lightsDenom != 0.0 && rand( 5 ) < float( lights.count ) / lightsDenom ) {

			// sample a light or environment
			LightRecord lightRec = randomLightSample( lights.tex, iesProfiles, lights.count, rayOrigin, rand3( 6 ) );

			bool isSampleBelowSurface = ! surf.volumeParticle && dot( surf.faceNormal, lightRec.direction ) < 0.0;
			if ( isSampleBelowSurface ) {

				lightRec.pdf = 0.0;

			}

			// check if a ray could even reach the light area
			Ray lightRay;
			lightRay.origin = rayOrigin;
			lightRay.direction = lightRec.direction;
			vec3 attenuatedColor;
			if (
				lightRec.pdf > 0.0 &&
				isDirectionValid( lightRec.direction, surf.normal, surf.faceNormal ) &&
				! attenuateHit( state, lightRay, lightRec.dist, attenuatedColor )
			) {

				// get the material pdf
				vec3 sampleColor;
				float lightMaterialPdf = bsdfResult( worldWo, lightRec.direction, surf, sampleColor );
				bool isValidSampleColor = all( greaterThanEqual( sampleColor, vec3( 0.0 ) ) );
				if ( lightMaterialPdf > 0.0 && isValidSampleColor ) {

					// weight the direct light contribution
					float lightPdf = lightRec.pdf / lightsDenom;
					float misWeight = lightRec.type == SPOT_LIGHT_TYPE || lightRec.type == DIR_LIGHT_TYPE || lightRec.type == POINT_LIGHT_TYPE ? 1.0 : misHeuristic( lightPdf, lightMaterialPdf );
					result = attenuatedColor * lightRec.emission * state.throughputColor * sampleColor * misWeight / lightPdf;

				}

			}

		} else if ( envMapInfo.totalSum != 0.0 && environmentIntensity != 0.0 ) {

			// find a sample in the environment map to include in the contribution
			vec3 envColor, envDirection;
			float envPdf = sampleEquirectProbability( rand2( 7 ), envColor, envDirection );
			envDirection = invEnvRotation3x3 * envDirection;

			// this env sampling is not set up for transmissive sampling and yields overly bright
			// results so we ignore the sample in this case.
			// TODO: this should be improved but how? The env samples could traverse a few layers?
			bool isSampleBelowSurface = ! surf.volumeParticle && dot( surf.faceNormal, envDirection ) < 0.0;
			if ( isSampleBelowSurface ) {

				envPdf = 0.0;

			}

			// check if a ray could even reach the surface
			Ray envRay;
			envRay.origin = rayOrigin;
			envRay.direction = envDirection;
			vec3 attenuatedColor;
			if (
				envPdf > 0.0 &&
				isDirectionValid( envDirection, surf.normal, surf.faceNormal ) &&
				! attenuateHit( state, envRay, INFINITY, attenuatedColor )
			) {

				// get the material pdf
				vec3 sampleColor;
				float envMaterialPdf = bsdfResult( worldWo, envDirection, surf, sampleColor );
				bool isValidSampleColor = all( greaterThanEqual( sampleColor, vec3( 0.0 ) ) );
				if ( envMaterialPdf > 0.0 && isValidSampleColor ) {

					// weight the direct light contribution
					envPdf /= lightsDenom;
					float misWeight = misHeuristic( envPdf, envMaterialPdf );
					result = attenuatedColor * environmentIntensity * envColor * state.throughputColor * sampleColor * misWeight / envPdf;

				}

			}

		}

		// Function changed to have a single return statement to potentially help with crashes on Mac OS.
		// See issue #470
		return result;

	}

`;var lh=`

	#define SKIP_SURFACE 0
	#define HIT_SURFACE 1
	int getSurfaceRecord(
		Material material, SurfaceHit surfaceHit, sampler2DArray attributesArray,
		float accumulatedRoughness,
		inout SurfaceRecord surf
	) {

		if ( material.fogVolume ) {

			vec3 normal = vec3( 0, 0, 1 );

			SurfaceRecord fogSurface;
			fogSurface.volumeParticle = true;
			fogSurface.color = material.color;
			fogSurface.emission = material.emissiveIntensity * material.emissive;
			fogSurface.normal = normal;
			fogSurface.faceNormal = normal;
			fogSurface.clearcoatNormal = normal;

			surf = fogSurface;
			return HIT_SURFACE;

		}

		// uv coord for textures
		vec2 uv = textureSampleBarycoord( attributesArray, ATTR_UV, surfaceHit.barycoord, surfaceHit.faceIndices.xyz ).xy;
		vec4 vertexColor = textureSampleBarycoord( attributesArray, ATTR_COLOR, surfaceHit.barycoord, surfaceHit.faceIndices.xyz );

		// albedo
		vec4 albedo = vec4( material.color, material.opacity );
		if ( material.map != - 1 ) {

			vec3 uvPrime = material.mapTransform * vec3( uv, 1 );
			albedo *= texture2D( textures, vec3( uvPrime.xy, material.map ) );

		}

		if ( material.vertexColors ) {

			albedo *= vertexColor;

		}

		// alphaMap
		if ( material.alphaMap != - 1 ) {

			vec3 uvPrime = material.alphaMapTransform * vec3( uv, 1 );
			albedo.a *= texture2D( textures, vec3( uvPrime.xy, material.alphaMap ) ).x;

		}

		// possibly skip this sample if it's transparent, alpha test is enabled, or we hit the wrong material side
		// and it's single sided.
		// - alpha test is disabled when it === 0
		// - the material sidedness test is complicated because we want light to pass through the back side but still
		// be able to see the front side. This boolean checks if the side we hit is the front side on the first ray
		// and we're rendering the other then we skip it. Do the opposite on subsequent bounces to get incoming light.
		float alphaTest = material.alphaTest;
		bool useAlphaTest = alphaTest != 0.0;
		if (
			// material sidedness
			material.side != 0.0 && surfaceHit.side != material.side

			// alpha test
			|| useAlphaTest && albedo.a < alphaTest

			// opacity
			|| material.transparent && ! useAlphaTest && albedo.a < rand( 3 )
		) {

			return SKIP_SURFACE;

		}

		// fetch the interpolated smooth normal
		vec3 normal = normalize( textureSampleBarycoord(
			attributesArray,
			ATTR_NORMAL,
			surfaceHit.barycoord,
			surfaceHit.faceIndices.xyz
		).xyz );

		// roughness
		float roughness = material.roughness;
		if ( material.roughnessMap != - 1 ) {

			vec3 uvPrime = material.roughnessMapTransform * vec3( uv, 1 );
			roughness *= texture2D( textures, vec3( uvPrime.xy, material.roughnessMap ) ).g;

		}

		// metalness
		float metalness = material.metalness;
		if ( material.metalnessMap != - 1 ) {

			vec3 uvPrime = material.metalnessMapTransform * vec3( uv, 1 );
			metalness *= texture2D( textures, vec3( uvPrime.xy, material.metalnessMap ) ).b;

		}

		// emission
		vec3 emission = material.emissiveIntensity * material.emissive;
		if ( material.emissiveMap != - 1 ) {

			vec3 uvPrime = material.emissiveMapTransform * vec3( uv, 1 );
			emission *= texture2D( textures, vec3( uvPrime.xy, material.emissiveMap ) ).xyz;

		}

		// transmission
		float transmission = material.transmission;
		if ( material.transmissionMap != - 1 ) {

			vec3 uvPrime = material.transmissionMapTransform * vec3( uv, 1 );
			transmission *= texture2D( textures, vec3( uvPrime.xy, material.transmissionMap ) ).r;

		}

		// normal
		if ( material.flatShading ) {

			// if we're rendering a flat shaded object then use the face normals - the face normal
			// is provided based on the side the ray hits the mesh so flip it to align with the
			// interpolated vertex normals.
			normal = surfaceHit.faceNormal * surfaceHit.side;

		}

		vec3 baseNormal = normal;
		if ( material.normalMap != - 1 ) {

			vec4 tangentSample = textureSampleBarycoord(
				attributesArray,
				ATTR_TANGENT,
				surfaceHit.barycoord,
				surfaceHit.faceIndices.xyz
			);

			// some provided tangents can be malformed (0, 0, 0) causing the normal to be degenerate
			// resulting in NaNs and slow path tracing.
			if ( length( tangentSample.xyz ) > 0.0 ) {

				vec3 tangent = normalize( tangentSample.xyz );
				vec3 bitangent = normalize( cross( normal, tangent ) * tangentSample.w );
				mat3 vTBN = mat3( tangent, bitangent, normal );

				vec3 uvPrime = material.normalMapTransform * vec3( uv, 1 );
				vec3 texNormal = texture2D( textures, vec3( uvPrime.xy, material.normalMap ) ).xyz * 2.0 - 1.0;
				texNormal.xy *= material.normalScale;
				normal = vTBN * texNormal;

			}

		}

		normal *= surfaceHit.side;

		// clearcoat
		float clearcoat = material.clearcoat;
		if ( material.clearcoatMap != - 1 ) {

			vec3 uvPrime = material.clearcoatMapTransform * vec3( uv, 1 );
			clearcoat *= texture2D( textures, vec3( uvPrime.xy, material.clearcoatMap ) ).r;

		}

		// clearcoatRoughness
		float clearcoatRoughness = material.clearcoatRoughness;
		if ( material.clearcoatRoughnessMap != - 1 ) {

			vec3 uvPrime = material.clearcoatRoughnessMapTransform * vec3( uv, 1 );
			clearcoatRoughness *= texture2D( textures, vec3( uvPrime.xy, material.clearcoatRoughnessMap ) ).g;

		}

		// clearcoatNormal
		vec3 clearcoatNormal = baseNormal;
		if ( material.clearcoatNormalMap != - 1 ) {

			vec4 tangentSample = textureSampleBarycoord(
				attributesArray,
				ATTR_TANGENT,
				surfaceHit.barycoord,
				surfaceHit.faceIndices.xyz
			);

			// some provided tangents can be malformed (0, 0, 0) causing the normal to be degenerate
			// resulting in NaNs and slow path tracing.
			if ( length( tangentSample.xyz ) > 0.0 ) {

				vec3 tangent = normalize( tangentSample.xyz );
				vec3 bitangent = normalize( cross( clearcoatNormal, tangent ) * tangentSample.w );
				mat3 vTBN = mat3( tangent, bitangent, clearcoatNormal );

				vec3 uvPrime = material.clearcoatNormalMapTransform * vec3( uv, 1 );
				vec3 texNormal = texture2D( textures, vec3( uvPrime.xy, material.clearcoatNormalMap ) ).xyz * 2.0 - 1.0;
				texNormal.xy *= material.clearcoatNormalScale;
				clearcoatNormal = vTBN * texNormal;

			}

		}

		clearcoatNormal *= surfaceHit.side;

		// sheenColor
		vec3 sheenColor = material.sheenColor;
		if ( material.sheenColorMap != - 1 ) {

			vec3 uvPrime = material.sheenColorMapTransform * vec3( uv, 1 );
			sheenColor *= texture2D( textures, vec3( uvPrime.xy, material.sheenColorMap ) ).rgb;

		}

		// sheenRoughness
		float sheenRoughness = material.sheenRoughness;
		if ( material.sheenRoughnessMap != - 1 ) {

			vec3 uvPrime = material.sheenRoughnessMapTransform * vec3( uv, 1 );
			sheenRoughness *= texture2D( textures, vec3( uvPrime.xy, material.sheenRoughnessMap ) ).a;

		}

		// iridescence
		float iridescence = material.iridescence;
		if ( material.iridescenceMap != - 1 ) {

			vec3 uvPrime = material.iridescenceMapTransform * vec3( uv, 1 );
			iridescence *= texture2D( textures, vec3( uvPrime.xy, material.iridescenceMap ) ).r;

		}

		// iridescence thickness
		float iridescenceThickness = material.iridescenceThicknessMaximum;
		if ( material.iridescenceThicknessMap != - 1 ) {

			vec3 uvPrime = material.iridescenceThicknessMapTransform * vec3( uv, 1 );
			float iridescenceThicknessSampled = texture2D( textures, vec3( uvPrime.xy, material.iridescenceThicknessMap ) ).g;
			iridescenceThickness = mix( material.iridescenceThicknessMinimum, material.iridescenceThicknessMaximum, iridescenceThicknessSampled );

		}

		iridescence = iridescenceThickness == 0.0 ? 0.0 : iridescence;

		// specular color
		vec3 specularColor = material.specularColor;
		if ( material.specularColorMap != - 1 ) {

			vec3 uvPrime = material.specularColorMapTransform * vec3( uv, 1 );
			specularColor *= texture2D( textures, vec3( uvPrime.xy, material.specularColorMap ) ).rgb;

		}

		// specular intensity
		float specularIntensity = material.specularIntensity;
		if ( material.specularIntensityMap != - 1 ) {

			vec3 uvPrime = material.specularIntensityMapTransform * vec3( uv, 1 );
			specularIntensity *= texture2D( textures, vec3( uvPrime.xy, material.specularIntensityMap ) ).a;

		}

		surf.volumeParticle = false;

		surf.faceNormal = surfaceHit.faceNormal;
		surf.normal = normal;

		surf.metalness = metalness;
		surf.color = albedo.rgb;
		surf.emission = emission;

		surf.ior = material.ior;
		surf.transmission = transmission;
		surf.thinFilm = material.thinFilm;
		surf.attenuationColor = material.attenuationColor;
		surf.attenuationDistance = material.attenuationDistance;

		surf.clearcoatNormal = clearcoatNormal;
		surf.clearcoat = clearcoat;

		surf.sheen = material.sheen;
		surf.sheenColor = sheenColor;

		surf.iridescence = iridescence;
		surf.iridescenceIor = material.iridescenceIor;
		surf.iridescenceThickness = iridescenceThickness;

		surf.specularColor = specularColor;
		surf.specularIntensity = specularIntensity;

		// apply perceptual roughness factor from gltf. sheen perceptual roughness is
		// applied by its brdf function
		// https://registry.khronos.org/glTF/specs/2.0/glTF-2.0.html#microfacet-surfaces
		surf.roughness = roughness * roughness;
		surf.clearcoatRoughness = clearcoatRoughness * clearcoatRoughness;
		surf.sheenRoughness = sheenRoughness;

		// frontFace is used to determine transmissive properties and PDF. If no transmission is used
		// then we can just always assume this is a front face.
		surf.frontFace = surfaceHit.side == 1.0 || transmission == 0.0;
		surf.eta = material.thinFilm || surf.frontFace ? 1.0 / material.ior : material.ior;
		surf.f0 = iorRatioToF0( surf.eta );

		// Compute the filtered roughness value to use during specular reflection computations.
		// The accumulated roughness value is scaled by a user setting and a "magic value" of 5.0.
		// If we're exiting something transmissive then scale the factor down significantly so we can retain
		// sharp internal reflections
		surf.filteredRoughness = applyFilteredGlossy( surf.roughness, accumulatedRoughness );
		surf.filteredClearcoatRoughness = applyFilteredGlossy( surf.clearcoatRoughness, accumulatedRoughness );

		// get the normal frames
		surf.normalBasis = getBasisFromNormal( surf.normal );
		surf.normalInvBasis = inverse( surf.normalBasis );

		surf.clearcoatBasis = getBasisFromNormal( surf.clearcoatNormal );
		surf.clearcoatInvBasis = inverse( surf.clearcoatBasis );

		return HIT_SURFACE;

	}
`;var uh=`

	struct Ray {

		vec3 origin;
		vec3 direction;

	};

	struct SurfaceHit {

		uvec4 faceIndices;
		vec3 barycoord;
		vec3 faceNormal;
		float side;
		float dist;

	};

	struct RenderState {

		bool firstRay;
		bool transmissiveRay;
		bool isShadowRay;
		float accumulatedRoughness;
		int transmissiveTraversals;
		int traversals;
		uint depth;
		vec3 throughputColor;
		Material fogMaterial;

	};

	RenderState initRenderState() {

		RenderState result;
		result.firstRay = true;
		result.transmissiveRay = true;
		result.isShadowRay = false;
		result.accumulatedRoughness = 0.0;
		result.transmissiveTraversals = 0;
		result.traversals = 0;
		result.throughputColor = vec3( 1.0 );
		result.depth = 0u;
		result.fogMaterial.fogVolume = false;
		return result;

	}

`;var fh=`

	#define NO_HIT 0
	#define SURFACE_HIT 1
	#define LIGHT_HIT 2
	#define FOG_HIT 3

	// Passing the global variable 'lights' into this function caused shader program errors.
	// So global variables like 'lights' and 'bvh' were moved out of the function parameters.
	// For more information, refer to: https://github.com/gkjohnson/three-gpu-pathtracer/pull/457
	int traceScene(
		Ray ray, Material fogMaterial, inout SurfaceHit surfaceHit
	) {

		int result = NO_HIT;
		bool hit = bvhIntersectFirstHit( bvh, ray.origin, ray.direction, surfaceHit.faceIndices, surfaceHit.faceNormal, surfaceHit.barycoord, surfaceHit.side, surfaceHit.dist );

		#if FEATURE_FOG

		if ( fogMaterial.fogVolume ) {

			// offset the distance so we don't run into issues with particles on the same surface
			// as other objects
			float particleDist = intersectFogVolume( fogMaterial, rand( 1 ) );
			if ( particleDist + RAY_OFFSET < surfaceHit.dist ) {

				surfaceHit.side = 1.0;
				surfaceHit.faceNormal = normalize( - ray.direction );
				surfaceHit.dist = particleDist;
				return FOG_HIT;

			}

		}

		#endif

		if ( hit ) {

			result = SURFACE_HIT;

		}

		return result;

	}

`;var Za=class extends ui{onBeforeRender(){this.setDefine("FEATURE_DOF",this.physicalCamera.bokehSize===0?0:1),this.setDefine("FEATURE_BACKGROUND_MAP",this.backgroundMap?1:0),this.setDefine("FEATURE_FOG",this.materials.features.isUsed("FOG")?1:0)}constructor(e){super({transparent:!0,depthWrite:!1,defines:{FEATURE_MIS:1,FEATURE_RUSSIAN_ROULETTE:1,FEATURE_DOF:1,FEATURE_BACKGROUND_MAP:0,FEATURE_FOG:1,RANDOM_TYPE:2,CAMERA_TYPE:0,DEBUG_MODE:0,ATTR_NORMAL:0,ATTR_TANGENT:1,ATTR_UV:2,ATTR_COLOR:3,MATERIAL_PIXELS:za},uniforms:{resolution:{value:new Ne},opacity:{value:1},bounces:{value:10},transmissiveBounces:{value:10},filterGlossyFactor:{value:0},physicalCamera:{value:new Ua},cameraWorldMatrix:{value:new $e},invProjectionMatrix:{value:new $e},bvh:{value:new Ta},attributesArray:{value:new Ha},materialIndexAttribute:{value:new gr},materials:{value:new Va},textures:{value:new so().texture},lights:{value:new Oa},iesProfiles:{value:new so(360,180,{type:Mt,wrapS:Kt,wrapT:Kt}).texture},environmentIntensity:{value:1},environmentRotation:{value:new $e},envMapInfo:{value:new Ba},backgroundBlur:{value:0},backgroundMap:{value:null},backgroundAlpha:{value:1},backgroundIntensity:{value:1},backgroundRotation:{value:new $e},seed:{value:0},sobolTexture:{value:null},stratifiedTexture:{value:new Xa},stratifiedOffsetTexture:{value:new Ya(64,1)}},vertexShader:`

				varying vec2 vUv;
				void main() {

					vec4 mvPosition = vec4( position, 1.0 );
					mvPosition = modelViewMatrix * mvPosition;
					gl_Position = projectionMatrix * mvPosition;

					vUv = uv;

				}

			`,fragmentShader:`
				#define RAY_OFFSET 1e-4
				#define INFINITY 1e20

				precision highp isampler2D;
				precision highp usampler2D;
				precision highp sampler2DArray;
				vec4 envMapTexelToLinear( vec4 a ) { return a; }
				#include <common>

				// bvh intersection
				${Di.common_functions}
				${Di.bvh_struct_definitions}
				${Di.bvh_ray_functions}

				// uniform structs
				${kp}
				${zp}
				${Vp}
				${Wp}
				${$p}

				// random
				#if RANDOM_TYPE == 2 	// Stratified List

					${Jp}

				#elif RANDOM_TYPE == 1 	// Sobol

					${Ul}
					${La}
					${Pp}

					#define rand(v) sobol(v)
					#define rand2(v) sobol2(v)
					#define rand3(v) sobol3(v)
					#define rand4(v) sobol4(v)

				#else 					// PCG

				${Ul}

					// Using the sobol functions seems to break the the compiler on MacOS
					// - specifically the "sobolReverseBits" function.
					uint sobolPixelIndex = 0u;
					uint sobolPathIndex = 0u;
					uint sobolBounceIndex = 0u;

					#define rand(v) pcgRand()
					#define rand2(v) pcgRand2()
					#define rand3(v) pcgRand3()
					#define rand4(v) pcgRand4()

				#endif

				// common
				${Qp}
				${Kp}
				${Ka}
				${Zp}
				${jp}

				// environment
				uniform EquirectHdrInfo envMapInfo;
				uniform mat4 environmentRotation;
				uniform float environmentIntensity;

				// lighting
				uniform sampler2DArray iesProfiles;
				uniform LightsInfo lights;

				// background
				uniform float backgroundBlur;
				uniform float backgroundAlpha;
				#if FEATURE_BACKGROUND_MAP

				uniform sampler2D backgroundMap;
				uniform mat4 backgroundRotation;
				uniform float backgroundIntensity;

				#endif

				// camera
				uniform mat4 cameraWorldMatrix;
				uniform mat4 invProjectionMatrix;
				#if FEATURE_DOF

				uniform PhysicalCamera physicalCamera;

				#endif

				// geometry
				uniform sampler2DArray attributesArray;
				uniform usampler2D materialIndexAttribute;
				uniform sampler2D materials;
				uniform sampler2DArray textures;
				uniform BVH bvh;

				// path tracer
				uniform int bounces;
				uniform int transmissiveBounces;
				uniform float filterGlossyFactor;
				uniform int seed;

				// image
				uniform vec2 resolution;
				uniform float opacity;

				varying vec2 vUv;

				// globals
				mat3 envRotation3x3;
				mat3 invEnvRotation3x3;
				float lightsDenom;

				// sampling
				${Yp}
				${Xp}
				${qp}

				${oh}
				${nh}
				${rh}
				${ih}
				${th}
				${eh}

				float applyFilteredGlossy( float roughness, float accumulatedRoughness ) {

					return clamp(
						max(
							roughness,
							accumulatedRoughness * filterGlossyFactor * 5.0 ),
						0.0,
						1.0
					);

				}

				vec3 sampleBackground( vec3 direction, vec2 uv ) {

					vec3 sampleDir = sampleHemisphere( direction, uv ) * 0.5 * backgroundBlur;

					#if FEATURE_BACKGROUND_MAP

					sampleDir = normalize( mat3( backgroundRotation ) * direction + sampleDir );
					return backgroundIntensity * sampleEquirectColor( backgroundMap, sampleDir );

					#else

					sampleDir = normalize( envRotation3x3 * direction + sampleDir );
					return environmentIntensity * sampleEquirectColor( envMapInfo.map, sampleDir );

					#endif

				}

				${uh}
				${sh}
				${fh}
				${ah}
				${ch}
				${lh}

				void main() {

					// init
					rng_initialize( gl_FragCoord.xy, seed );
					sobolPixelIndex = ( uint( gl_FragCoord.x ) << 16 ) | uint( gl_FragCoord.y );
					sobolPathIndex = uint( seed );

					// get camera ray
					Ray ray = getCameraRay();

					// inverse environment rotation
					envRotation3x3 = mat3( environmentRotation );
					invEnvRotation3x3 = inverse( envRotation3x3 );
					lightsDenom =
						( environmentIntensity == 0.0 || envMapInfo.totalSum == 0.0 ) && lights.count != 0u ?
							float( lights.count ) :
							float( lights.count + 1u );

					// final color
					gl_FragColor = vec4( 0, 0, 0, 1 );

					// surface results
					SurfaceHit surfaceHit;
					ScatterRecord scatterRec;

					// path tracing state
					RenderState state = initRenderState();
					state.transmissiveTraversals = transmissiveBounces;
					#if FEATURE_FOG

					state.fogMaterial.fogVolume = bvhIntersectFogVolumeHit(
						ray.origin, - ray.direction,
						materialIndexAttribute, materials,
						state.fogMaterial
					);

					#endif

					for ( int i = 0; i < bounces; i ++ ) {

						sobolBounceIndex ++;

						state.depth ++;
						state.traversals = bounces - i;
						state.firstRay = i == 0 && state.transmissiveTraversals == transmissiveBounces;

						int hitType = traceScene( ray, state.fogMaterial, surfaceHit );

						// check if we intersect any lights and accumulate the light contribution
						// TODO: we can add support for light surface rendering in the else condition if we
						// add the ability to toggle visibility of the the light
						if ( ! state.firstRay && ! state.transmissiveRay ) {

							LightRecord lightRec;
							float lightDist = hitType == NO_HIT ? INFINITY : surfaceHit.dist;
							for ( uint i = 0u; i < lights.count; i ++ ) {

								if (
									intersectLightAtIndex( lights.tex, ray.origin, ray.direction, i, lightRec ) &&
									lightRec.dist < lightDist
								) {

									#if FEATURE_MIS

									// weight the contribution
									// NOTE: Only area lights are supported for forward sampling and can be hit
									float misWeight = misHeuristic( scatterRec.pdf, lightRec.pdf / lightsDenom );
									gl_FragColor.rgb += lightRec.emission * state.throughputColor * misWeight;

									#else

									gl_FragColor.rgb += lightRec.emission * state.throughputColor;

									#endif

								}

							}

						}

						if ( hitType == NO_HIT ) {

							if ( state.firstRay || state.transmissiveRay ) {

								gl_FragColor.rgb += sampleBackground( ray.direction, rand2( 2 ) ) * state.throughputColor;
								gl_FragColor.a = backgroundAlpha;

							} else {

								#if FEATURE_MIS

								// get the PDF of the hit envmap point
								vec3 envColor;
								float envPdf = sampleEquirect( envRotation3x3 * ray.direction, envColor );
								envPdf /= lightsDenom;

								// and weight the contribution
								float misWeight = misHeuristic( scatterRec.pdf, envPdf );
								gl_FragColor.rgb += environmentIntensity * envColor * state.throughputColor * misWeight;

								#else

								gl_FragColor.rgb +=
									environmentIntensity *
									sampleEquirectColor( envMapInfo.map, envRotation3x3 * ray.direction ) *
									state.throughputColor;

								#endif

							}
							break;

						}

						uint materialIndex = uTexelFetch1D( materialIndexAttribute, surfaceHit.faceIndices.x ).r;
						Material material = readMaterialInfo( materials, materialIndex );

						#if FEATURE_FOG

						if ( hitType == FOG_HIT ) {

							material = state.fogMaterial;
							state.accumulatedRoughness += 0.2;

						} else if ( material.fogVolume ) {

							state.fogMaterial = material;
							state.fogMaterial.fogVolume = surfaceHit.side == 1.0;

							ray.origin = stepRayOrigin( ray.origin, ray.direction, - surfaceHit.faceNormal, surfaceHit.dist );

							i -= sign( state.transmissiveTraversals );
							state.transmissiveTraversals -= sign( state.transmissiveTraversals );
							continue;

						}

						#endif

						// early out if this is a matte material
						if ( material.matte && state.firstRay ) {

							gl_FragColor = vec4( 0.0 );
							break;

						}

						// if we've determined that this is a shadow ray and we've hit an item with no shadow casting
						// then skip it
						if ( ! material.castShadow && state.isShadowRay ) {

							ray.origin = stepRayOrigin( ray.origin, ray.direction, - surfaceHit.faceNormal, surfaceHit.dist );
							continue;

						}

						SurfaceRecord surf;
						if (
							getSurfaceRecord(
								material, surfaceHit, attributesArray, state.accumulatedRoughness,
								surf
							) == SKIP_SURFACE
						) {

							// only allow a limited number of transparency discards otherwise we could
							// crash the context with too long a loop.
							i -= sign( state.transmissiveTraversals );
							state.transmissiveTraversals -= sign( state.transmissiveTraversals );

							ray.origin = stepRayOrigin( ray.origin, ray.direction, - surfaceHit.faceNormal, surfaceHit.dist );
							continue;

						}

						scatterRec = bsdfSample( - ray.direction, surf );
						state.isShadowRay = scatterRec.specularPdf < rand( 4 );

						bool isBelowSurface = ! surf.volumeParticle && dot( scatterRec.direction, surf.faceNormal ) < 0.0;
						vec3 hitPoint = stepRayOrigin( ray.origin, ray.direction, isBelowSurface ? - surf.faceNormal : surf.faceNormal, surfaceHit.dist );

						// next event estimation
						#if FEATURE_MIS

						gl_FragColor.rgb += directLightContribution( - ray.direction, surf, state, hitPoint );

						#endif

						// accumulate a roughness value to offset diffuse, specular, diffuse rays that have high contribution
						// to a single pixel resulting in fireflies
						// TODO: handle transmissive surfaces
						if ( ! surf.volumeParticle && ! isBelowSurface ) {

							// determine if this is a rough normal or not by checking how far off straight up it is
							vec3 halfVector = normalize( - ray.direction + scatterRec.direction );
							state.accumulatedRoughness += max(
								sin( acosApprox( dot( halfVector, surf.normal ) ) ),
								sin( acosApprox( dot( halfVector, surf.clearcoatNormal ) ) )
							);

							state.transmissiveRay = false;

						}

						// accumulate emissive color
						gl_FragColor.rgb += ( surf.emission * state.throughputColor );

						// skip the sample if our PDF or ray is impossible
						if ( scatterRec.pdf <= 0.0 || ! isDirectionValid( scatterRec.direction, surf.normal, surf.faceNormal ) ) {

							break;

						}

						// if we're bouncing around the inside a transmissive material then decrement
						// perform this separate from a bounce
						bool isTransmissiveRay = ! surf.volumeParticle && dot( scatterRec.direction, surf.faceNormal * surfaceHit.side ) < 0.0;
						if ( ( isTransmissiveRay || isBelowSurface ) && state.transmissiveTraversals > 0 ) {

							state.transmissiveTraversals --;
							i --;

						}

						//

						// handle throughput color transformation
						// attenuate the throughput color by the medium color
						if ( ! surf.frontFace ) {

							state.throughputColor *= transmissionAttenuation( surfaceHit.dist, surf.attenuationColor, surf.attenuationDistance );

						}

						#if FEATURE_RUSSIAN_ROULETTE

						// russian roulette path termination
						// https://www.arnoldrenderer.com/research/physically_based_shader_design_in_arnold.pdf
						uint minBounces = 3u;
						float depthProb = float( state.depth < minBounces );

						float rrProb = luminance( state.throughputColor * scatterRec.color / scatterRec.pdf );
						rrProb /= luminance( state.throughputColor );
						rrProb = sqrt( rrProb );
						rrProb = max( rrProb, depthProb );
						rrProb = min( rrProb, 1.0 );
						if ( rand( 8 ) > rrProb ) {

							break;

						}

						// perform sample clamping here to avoid bright pixels
						state.throughputColor *= min( 1.0 / rrProb, 20.0 );

						#endif

						// adjust the throughput and discard and exit if we find discard the sample if there are any NaNs
						state.throughputColor *= scatterRec.color / scatterRec.pdf;
						if ( any( isnan( state.throughputColor ) ) || any( isinf( state.throughputColor ) ) ) {

							break;

						}

						//

						// prepare for next ray
						ray.direction = scatterRec.direction;
						ray.origin = hitPoint;

					}

					gl_FragColor.a *= opacity;

					#if DEBUG_MODE == 1

					// output the number of rays checked in the path and number of
					// transmissive rays encountered.
					gl_FragColor.rgb = vec3(
						float( state.depth ),
						transmissiveBounces - state.transmissiveTraversals,
						0.0
					);
					gl_FragColor.a = 1.0;

					#endif

				}

			`}),this.setValues(e)}};function*KS(){let{_renderer:t,_fsQuad:e,_blendQuad:n,_primaryTarget:i,_blendTargets:r,_sobolTarget:o,_subframe:a,alpha:c,material:l}=this,f=new At,p=new At,u=n.material,[s,h]=r;for(;;){c?(u.opacity=this._opacityFactor/(this.samples+1),l.blending=Ot,l.opacity=1):(l.opacity=this._opacityFactor/(this.samples+1),l.blending=Xn);let[g,b,d,m]=a,_=i.width,E=i.height;l.resolution.set(_*d,E*m),l.sobolTexture=o.texture,l.stratifiedTexture.init(20,l.bounces+l.transmissiveBounces+5),l.stratifiedTexture.next(),l.seed++;let v=this.tiles.x||1,T=this.tiles.y||1,M=v*T,R=Math.ceil(_*d),x=Math.ceil(E*m),A=Math.floor(g*_),w=Math.floor(b*E),D=Math.ceil(R/v),C=Math.ceil(x/T);for(let L=0;L<T;L++)for(let I=0;I<v;I++){let B=t.getRenderTarget(),z=t.autoClear,W=t.getScissorTest();t.getScissor(f),t.getViewport(p);let ne=I,K=L;if(!this.stableTiles){let te=this._currentTile%(v*T);ne=te%v,K=~~(te/v),this._currentTile=te+1}let ee=T-K-1;i.scissor.set(A+ne*D,w+ee*C,Math.min(D,R-ne*D),Math.min(C,x-ee*C)),i.viewport.set(A,w,R,x),t.setRenderTarget(i),t.setScissorTest(!0),t.autoClear=!1,e.render(t),t.setViewport(p),t.setScissor(f),t.setScissorTest(W),t.setRenderTarget(B),t.autoClear=z,c&&(u.target1=s.texture,u.target2=i.texture,t.setRenderTarget(h),n.render(t),t.setRenderTarget(B)),this.samples+=1/M,I===v-1&&L===T-1&&(this.samples=Math.round(this.samples)),yield}[s,h]=[h,s]}}var dh=new Xe,lo=class{get material(){return this._fsQuad.material}set material(e){this._fsQuad.material.removeEventListener("recompilation",this._compileFunction),e.addEventListener("recompilation",this._compileFunction),this._fsQuad.material=e}get target(){return this._alpha?this._blendTargets[1]:this._primaryTarget}set alpha(e){this._alpha!==e&&(e||(this._blendTargets[0].dispose(),this._blendTargets[1].dispose()),this._alpha=e,this.reset())}get alpha(){return this._alpha}get isCompiling(){return!!this._compilePromise}constructor(e){this.camera=null,this.tiles=new Ne(3,3),this.stableNoise=!1,this.stableTiles=!0,this.samples=0,this._subframe=new At(0,0,1,1),this._opacityFactor=1,this._renderer=e,this._alpha=!1,this._fsQuad=new Tn(new Za),this._blendQuad=new Tn(new Ca),this._task=null,this._currentTile=0,this._compilePromise=null,this._sobolTarget=new Na().generate(e),this._primaryTarget=new Dt(1,1,{format:Pe,type:Be,magFilter:Fe,minFilter:Fe}),this._blendTargets=[new Dt(1,1,{format:Pe,type:Be,magFilter:Fe,minFilter:Fe}),new Dt(1,1,{format:Pe,type:Be,magFilter:Fe,minFilter:Fe})],this._compileFunction=()=>{let n=this.compileMaterial(this._fsQuad._mesh);n.then(()=>{this._compilePromise===n&&(this._compilePromise=null)}),this._compilePromise=n},this.material.addEventListener("recompilation",this._compileFunction)}compileMaterial(){return this._renderer.compileAsync(this._fsQuad._mesh)}setCamera(e){let{material:n}=this;n.cameraWorldMatrix.copy(e.matrixWorld),n.invProjectionMatrix.copy(e.projectionMatrixInverse),n.physicalCamera.updateFrom(e);let i=0;e.projectionMatrix.elements[15]>0&&(i=1),e.isEquirectCamera&&(i=2),n.setDefine("CAMERA_TYPE",i),this.camera=e}setSize(e,n){e=Math.ceil(e),n=Math.ceil(n),!(this._primaryTarget.width===e&&this._primaryTarget.height===n)&&(this._primaryTarget.setSize(e,n),this._blendTargets[0].setSize(e,n),this._blendTargets[1].setSize(e,n),this.reset())}getSize(e){e.x=this._primaryTarget.width,e.y=this._primaryTarget.height}dispose(){this._primaryTarget.dispose(),this._blendTargets[0].dispose(),this._blendTargets[1].dispose(),this._sobolTarget.dispose(),this._fsQuad.dispose(),this._blendQuad.dispose(),this._task=null}reset(){let{_renderer:e,_primaryTarget:n,_blendTargets:i}=this,r=e.getRenderTarget(),o=e.getClearAlpha();e.getClearColor(dh),e.setRenderTarget(n),e.setClearColor(0,0),e.clearColor(),e.setRenderTarget(i[0]),e.setClearColor(0,0),e.clearColor(),e.setRenderTarget(i[1]),e.setClearColor(0,0),e.clearColor(),e.setClearColor(dh,o),e.setRenderTarget(r),this.samples=0,this._task=null,this.material.stratifiedTexture.stableNoise=this.stableNoise,this.stableNoise&&(this.material.seed=0,this.material.stratifiedTexture.reset())}update(){this.material.onBeforeRender(),!this.isCompiling&&(this._task||(this._task=KS.call(this)),this._task.next())}};var Bi=new Ne,ph=new Ne,ja=new Uc,Qa=new Xe,Ja=class extends wt{constructor(e=512,n=512){super(new Float32Array(e*n*4),e,n,Pe,Be,ni,pn,Kt,st,st),this.generationCallback=null}update(){this.dispose(),this.needsUpdate=!0;let{data:e,width:n,height:i}=this.image;for(let r=0;r<n;r++)for(let o=0;o<i;o++){ph.set(n,i),Bi.set(r/n,o/i),Bi.x-=.5,Bi.y=1-Bi.y,ja.theta=Bi.x*2*Math.PI,ja.phi=Bi.y*Math.PI,ja.radius=1,this.generationCallback(ja,Bi,ph,Qa);let c=4*(o*n+r);e[c+0]=Qa.r,e[c+1]=Qa.g,e[c+2]=Qa.b,e[c+3]=1}}copy(e){return super.copy(e),this.generationCallback=e.generationCallback,this}};var hh=new j,es=class extends Ja{constructor(e=512){super(e,e),this.topColor=new Xe().set(16777215),this.bottomColor=new Xe().set(0),this.exponent=2,this.generationCallback=(n,i,r,o)=>{hh.setFromSpherical(n);let a=hh.y*.5+.5;o.lerpColors(this.bottomColor,this.topColor,a**this.exponent)}}copy(e){return super.copy(e),this.topColor.copy(e.topColor),this.bottomColor.copy(e.bottomColor),this}};var ts=class extends qt{get map(){return this.uniforms.map.value}set map(e){this.uniforms.map.value=e}get opacity(){return this.uniforms.opacity.value}set opacity(e){this.uniforms&&(this.uniforms.opacity.value=e)}constructor(e){super({uniforms:{map:{value:null},opacity:{value:1}},vertexShader:`
				varying vec2 vUv;
				void main() {

					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

				}
			`,fragmentShader:`
				uniform sampler2D map;
				uniform float opacity;
				varying vec2 vUv;

				vec4 clampedTexelFatch( sampler2D map, ivec2 px, int lod ) {

					vec4 res = texelFetch( map, ivec2( px.x, px.y ), 0 );

					#if defined( TONE_MAPPING )

					res.xyz = toneMapping( res.xyz );

					#endif

			  		return linearToOutputTexel( res );

				}

				void main() {

					vec2 size = vec2( textureSize( map, 0 ) );
					vec2 pxUv = vUv * size;
					vec2 pxCurr = floor( pxUv );
					vec2 pxFrac = fract( pxUv ) - 0.5;
					vec2 pxOffset;
					pxOffset.x = pxFrac.x > 0.0 ? 1.0 : - 1.0;
					pxOffset.y = pxFrac.y > 0.0 ? 1.0 : - 1.0;

					vec2 pxNext = clamp( pxOffset + pxCurr, vec2( 0.0 ), size - 1.0 );
					vec2 alpha = abs( pxFrac );

					vec4 p1 = mix(
						clampedTexelFatch( map, ivec2( pxCurr.x, pxCurr.y ), 0 ),
						clampedTexelFatch( map, ivec2( pxNext.x, pxCurr.y ), 0 ),
						alpha.x
					);

					vec4 p2 = mix(
						clampedTexelFatch( map, ivec2( pxCurr.x, pxNext.y ), 0 ),
						clampedTexelFatch( map, ivec2( pxNext.x, pxNext.y ), 0 ),
						alpha.x
					);

					gl_FragColor = mix( p1, p2, alpha.y );
					gl_FragColor.a *= opacity;
					#include <premultiplied_alpha_fragment>

				}
			`}),this.setValues(e)}};var Fl=class extends qt{constructor(){super({uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:`
				varying vec2 vUv;
				void main() {

					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

				}`,fragmentShader:`
				#define ENVMAP_TYPE_CUBE_UV

				uniform samplerCube envMap;
				uniform float flipEnvMap;
				varying vec2 vUv;

				#include <common>
				#include <cube_uv_reflection_fragment>

				${Ka}

				void main() {

					vec3 rayDirection = equirectUvToDirection( vUv );
					rayDirection.x *= flipEnvMap;
					gl_FragColor = textureCube( envMap, rayDirection );

				}`}),this.depthWrite=!1,this.depthTest=!1}},uo=class{constructor(e){this._renderer=e,this._quad=new Tn(new Fl)}generate(e,n=null,i=null){if(!e.isCubeTexture)throw new Error("CubeToEquirectMaterial: Source can only be cube textures.");let r=e.images[0],o=this._renderer,a=this._quad;n===null&&(n=4*r.height),i===null&&(i=2*r.height);let c=new Dt(n,i,{type:Be,colorSpace:r.colorSpace}),l=r.height,f=Math.log2(l)-2,p=1/l,u=1/(3*Math.max(Math.pow(2,f),7*16));a.material.defines.CUBEUV_MAX_MIP=`${f}.0`,a.material.defines.CUBEUV_TEXEL_WIDTH=u,a.material.defines.CUBEUV_TEXEL_HEIGHT=p,a.material.uniforms.envMap.value=e,a.material.uniforms.flipEnvMap.value=e.isRenderTargetTexture?1:-1,a.material.needsUpdate=!0;let s=o.getRenderTarget(),h=o.autoClear;o.autoClear=!0,o.setRenderTarget(c),a.render(o),o.setRenderTarget(s),o.autoClear=h;let g=new Uint16Array(n*i*4),b=new Float32Array(n*i*4);o.readRenderTargetPixels(c,0,0,n,i,b),c.dispose();for(let m=0,_=b.length;m<_;m++)g[m]=vn.toHalfFloat(b[m]);let d=new wt(g,n,i,Pe,Mt);return d.minFilter=Gs,d.magFilter=st,d.wrapS=pn,d.wrapT=pn,d.mapping=ni,d.needsUpdate=!0,d}dispose(){this._quad.dispose()}};function ZS(t){return t.extensions.get("EXT_float_blend")}var Tr=new Ne,Bl=class{get multipleImportanceSampling(){return!!this._pathTracer.material.defines.FEATURE_MIS}set multipleImportanceSampling(e){this._pathTracer.material.setDefine("FEATURE_MIS",e?1:0)}get transmissiveBounces(){return this._pathTracer.material.transmissiveBounces}set transmissiveBounces(e){this._pathTracer.material.transmissiveBounces=e}get bounces(){return this._pathTracer.material.bounces}set bounces(e){this._pathTracer.material.bounces=e}get filterGlossyFactor(){return this._pathTracer.material.filterGlossyFactor}set filterGlossyFactor(e){this._pathTracer.material.filterGlossyFactor=e}get samples(){return this._pathTracer.samples}get target(){return this._pathTracer.target}get tiles(){return this._pathTracer.tiles}get stableNoise(){return this._pathTracer.stableNoise}set stableNoise(e){this._pathTracer.stableNoise=e}get isCompiling(){return!!this._pathTracer.isCompiling}constructor(e){this._renderer=e,this._generator=new Pa,this._pathTracer=new lo(e),this._queueReset=!1,this._clock=new Nc,this._compilePromise=null,this._lowResPathTracer=new lo(e),this._lowResPathTracer.tiles.set(1,1),this._quad=new Tn(new ts({map:null,transparent:!0,blending:Ot,premultipliedAlpha:e.getContextAttributes().premultipliedAlpha})),this._materials=null,this._previousEnvironment=null,this._previousBackground=null,this._internalBackground=null,this.renderDelay=100,this.minSamples=5,this.fadeDuration=500,this.enablePathTracing=!0,this.pausePathTracing=!1,this.dynamicLowRes=!1,this.lowResScale=.25,this.renderScale=1,this.synchronizeRenderSize=!0,this.rasterizeScene=!0,this.renderToCanvas=!0,this.textureSize=new Ne(1024,1024),this.rasterizeSceneCallback=(n,i)=>{this._renderer.render(n,i)},this.renderToCanvasCallback=(n,i,r)=>{let o=i.autoClear;i.autoClear=!1,r.render(i),i.autoClear=o},this.setScene(new wc,new Yn)}setBVHWorker(e){this._generator.setBVHWorker(e)}setScene(e,n,i={}){e.updateMatrixWorld(!0),n.updateMatrixWorld();let r=this._generator;if(r.setObjects(e),this._buildAsync)return r.generateAsync(i.onProgress).then(o=>this._updateFromResults(e,n,o));{let o=r.generate();return this._updateFromResults(e,n,o)}}setSceneAsync(...e){this._buildAsync=!0;let n=this.setScene(...e);return this._buildAsync=!1,n}setCamera(e){this.camera=e,this.updateCamera()}updateCamera(){let e=this.camera;e.updateMatrixWorld(),this._pathTracer.setCamera(e),this._lowResPathTracer.setCamera(e),this.reset()}updateMaterials(){let e=this._pathTracer.material,n=this._renderer,i=this._materials,r=this.textureSize,o=Up(i);e.textures.setTextures(n,o,r.x,r.y),e.materials.updateFrom(i,o),this.reset()}updateLights(){let e=this.scene,n=this._renderer,i=this._pathTracer.material,r=Fp(e),o=Np(r);i.lights.updateFrom(r,o),i.iesProfiles.setTextures(n,o),this.reset()}updateEnvironment(){let e=this.scene,n=this._pathTracer.material;if(this._internalBackground&&(this._internalBackground.dispose(),this._internalBackground=null),n.backgroundBlur=e.backgroundBlurriness,n.backgroundIntensity=e.backgroundIntensity??1,n.backgroundRotation.makeRotationFromEuler(e.backgroundRotation).invert(),e.background===null)n.backgroundMap=null,n.backgroundAlpha=0;else if(e.background.isColor){this._colorBackground=this._colorBackground||new es(16);let i=this._colorBackground;i.topColor.equals(e.background)||(i.topColor.set(e.background),i.bottomColor.set(e.background),i.update()),n.backgroundMap=i,n.backgroundAlpha=1}else if(e.background.isCubeTexture){if(e.background!==this._previousBackground){let i=new uo(this._renderer).generate(e.background);this._internalBackground=i,n.backgroundMap=i,n.backgroundAlpha=1}}else n.backgroundMap=e.background,n.backgroundAlpha=1;if(n.environmentIntensity=e.environment!==null?e.environmentIntensity??1:0,n.environmentRotation.makeRotationFromEuler(e.environmentRotation).invert(),this._previousEnvironment!==e.environment&&e.environment!==null)if(e.environment.isCubeTexture){let i=new uo(this._renderer).generate(e.environment);n.envMapInfo.updateFrom(i)}else n.envMapInfo.updateFrom(e.environment);this._previousEnvironment=e.environment,this._previousBackground=e.background,this.reset()}_updateFromResults(e,n,i){let{materials:r,geometry:o,bvh:a,bvhChanged:c,needsMaterialIndexUpdate:l}=i;this._materials=r;let p=this._pathTracer.material;return c&&(p.bvh.updateFrom(a),p.attributesArray.updateFrom(o.attributes.normal,o.attributes.tangent,o.attributes.uv,o.attributes.color)),l&&p.materialIndexAttribute.updateFrom(o.attributes.materialIndex),this._previousScene=e,this.scene=e,this.camera=n,this.updateCamera(),this.updateMaterials(),this.updateEnvironment(),this.updateLights(),i}renderSample(){let e=this._lowResPathTracer,n=this._pathTracer,i=this._renderer,r=this._clock,o=this._quad;this._updateScale(),this._queueReset&&(n.reset(),e.reset(),this._queueReset=!1,o.material.opacity=0,r.start());let a=r.getDelta()*1e3,c=r.getElapsedTime()*1e3;if(!this.pausePathTracing&&this.enablePathTracing&&this.renderDelay<=c&&!this.isCompiling&&n.update(),n.alpha=n.material.backgroundAlpha!==1||!ZS(i),e.alpha=n.alpha,this.renderToCanvas){let l=this._renderer,f=this.minSamples;if(c>=this.renderDelay&&this.samples>=this.minSamples&&(this.fadeDuration!==0?o.material.opacity=Math.min(o.material.opacity+a/this.fadeDuration,1):o.material.opacity=1),!this.enablePathTracing||this.samples<f||o.material.opacity<1){if(this.dynamicLowRes&&!this.isCompiling){e.samples<1&&(e.material=n.material,e.update());let p=o.material.opacity;o.material.opacity=1-o.material.opacity,o.material.map=e.target.texture,o.render(l),o.material.opacity=p}(!this.dynamicLowRes&&this.rasterizeScene||this.dynamicLowRes&&this.isCompiling)&&this.rasterizeSceneCallback(this.scene,this.camera)}this.enablePathTracing&&o.material.opacity>0&&(o.material.opacity<1&&(o.material.blending=this.dynamicLowRes?Br:Xn),o.material.map=n.target.texture,this.renderToCanvasCallback(n.target,l,o),o.material.blending=Ot)}}reset(){this._queueReset=!0,this._pathTracer.samples=0}dispose(){this._quad.dispose(),this._quad.material.dispose(),this._pathTracer.dispose()}_updateScale(){if(this.synchronizeRenderSize){this._renderer.getDrawingBufferSize(Tr);let e=Math.floor(this.renderScale*Tr.x),n=Math.floor(this.renderScale*Tr.y);if(this._pathTracer.getSize(Tr),Tr.x!==e||Tr.y!==n){let i=this.lowResScale;this._pathTracer.setSize(e,n),this._lowResPathTracer.setSize(Math.floor(e*i),Math.floor(n*i))}}}};var ns=class{constructor(e){this.name="WorkerBase",this.running=!1,this.worker=e,this.worker.onerror=n=>{throw n.message?new Error(`${this.name}: Could not create Web Worker with error "${n.message}"`):new Error(`${this.name}: Could not create Web Worker.`)}}runTask(){}generate(...e){if(this.running)throw new Error("GenerateMeshBVHWorker: Already running job.");if(this.worker===null)throw new Error("GenerateMeshBVHWorker: Worker has been disposed.");this.running=!0;let n=this.runTask(this.worker,...e);return n.finally(()=>{this.running=!1}),n}dispose(){this.worker.terminate(),this.worker=null}};var Ol=class extends ns{constructor(){let e=new Worker(new URL("./generateMeshBVH.worker.js",import.meta.url),{type:"module"});super(e),this.name="GenerateMeshBVHWorker"}runTask(e,n,i={}){return new Promise((r,o)=>{if(n.getAttribute("position").isInterleavedBufferAttribute||n.index&&n.index.isInterleavedBufferAttribute)throw new Error("GenerateMeshBVHWorker: InterleavedBufferAttribute are not supported for the geometry attributes.");e.onerror=f=>{o(new Error(`GenerateMeshBVHWorker: ${f.message}`))},e.onmessage=f=>{let{data:p}=f;if(p.error)o(new Error(p.error)),e.onmessage=null;else if(p.serialized){let{serialized:u,position:s}=p,h=mr.deserialize(u,n,{setIndex:!1}),g=Object.assign({setBoundingBox:!0},i);if(n.attributes.position.array=s,u.index)if(n.index)n.index.array=u.index;else{let b=new Tt(u.index,1,!1);n.setIndex(b)}g.setBoundingBox&&(n.boundingBox=h.getBoundingBox(new Gt)),i.onProgress&&i.onProgress(p.progress),r(h),e.onmessage=null}else i.onProgress&&i.onProgress(p.progress)};let a=n.index?n.index.array:null,c=n.attributes.position.array,l=[c];a&&l.push(a),e.postMessage({index:a,position:c,options:{...i,onProgress:null,includedProgressCallback:!!i.onProgress,groups:[...n.groups]}},l.map(f=>f.buffer).filter(f=>typeof SharedArrayBuffer>"u"||!(f instanceof SharedArrayBuffer)))})}};var Gl=class{dims=[];paddedDims=[];layout="x";dataType="Float32";getByteSize(){let e=1;for(let n of this.paddedDims)e*=n;return this.dataType==="Float32"?e*=4:this.dataType==="Float16"&&(e*=2),e}},Hl=class{desc;data;constructor(e,n){this.desc=e,this.data=n}},kl=class{_view;offset=0;constructor(e){this._view=e}read(e){let n=this._view,i=this.offset;switch(this.offset+=e,e){case 1:return n.getUint8(i);case 2:return n.getUint16(i,!0);case 4:return n.getUint32(i,!0);case 8:return Number(n.getBigUint64(i,!0));default:throw new Error("unsupported read size")}}};function mh(t){let e=new Uint8Array(t),n=new kl(new DataView(t));if(n.read(2)!==16855)throw new Error("invalid or corrupted weights blob");let r=n.read(1),o=n.read(1);if(r!==2)throw new Error("unsupported weights blob version");let a=n.read(8);n.offset=a;let c=n.read(4),l=new Map;for(let f=0;f<c;++f){let p=new Gl,u=n.read(2),s=new TextDecoder().decode(e.subarray(n.offset,n.offset+u));n.offset+=u;let h=n.read(1);for(let _=0;_<h;++_)p.dims.push(n.read(4));p.paddedDims=[...p.dims],new TextDecoder().decode(e.subarray(n.offset,n.offset+h))==="oihw"&&(p.layout="oihw"),n.offset+=h;let b=String.fromCharCode(n.read(1));if(b==="f")p.dataType="Float32";else if(b==="h")p.dataType="Float16";else throw new Error("invalid tensor data type");let d=n.read(8),m=e.slice(d,d+p.getByteSize());l.set(s,new Hl(p,m))}return l}function jS(t,e){return t.channels===e.channels}var is=8,Oi=class{autoUpdateOutputBuffer=!0;_label;_device;_outputBuffers={};_pipeline;_bindGroups=[];_needsUpdatePipeline=!0;_needsResizeBuffer=!0;_inputs=[];_outputs=[];_uniforms=[];_uniformBuffers={};_width=10;_height=10;_execWidth;_execHeight;_csCode="";_csMain;_csDefine;_groupOffsets={inputs:0,uniforms:1,outputs:2};constructor(e,n,i){this._label=e,this._device=n,this._csMain=i.csMain,this._csDefine=i.csDefine,this._inputs=i.inputs,this._outputs=i.outputs,this._uniforms=i.uniforms,this.autoUpdateOutputBuffer=i.autoUpdateOutputBuffer??!0,i.uniforms.forEach(r=>{this._uniformBuffers[r.label]=n.createBuffer({label:this._label,size:r.data.byteLength,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST}),this._device.queue.writeBuffer(this._uniformBuffers[r.label],0,r.data)})}setCSCode({csDefine:e,csMain:n}){this._csDefine=e,this._csMain=n,this._needsUpdatePipeline=!0}setSize(e,n){e=Math.ceil(e),n=Math.ceil(n);let i=e!==this._width||n!==this._height;this._width=e,this._height=n,i&&(this._needsResizeBuffer=!0,this._needsUpdatePipeline=!0)}setExecuteSize(e,n){e=Math.ceil(e),n=Math.ceil(n),this._execWidth=e,this._execHeight=n}setOutputParams(e){this.autoUpdateOutputBuffer&&this._updateOutputBuffers(e),this._needsUpdatePipeline=!0}setOutputBuffers(e){this._outputBuffers=Object.keys(e).reduce((n,i)=>(n[i]={buffer:e[i],params:{channels:4}},n),{})}setUniform(e,n){let i=this._uniformBuffers[e];this._device.queue.writeBuffer(i,0,n)}getOutput(e){return this._needsResizeBuffer&&this.autoUpdateOutputBuffer&&(this._resizeOutputBuffers(),this._needsResizeBuffer=!1),this._outputBuffers[e].buffer}dispose(e=!0){Object.keys(this._uniformBuffers).forEach(n=>{this._uniformBuffers[n].destroy()}),e&&Object.keys(this._outputBuffers).forEach(n=>{this._outputBuffers[n].buffer.destroy()})}_createBuffer(e){let n=this._width*this._height*4*4;return this._device.createBuffer({label:this._label,size:Math.max(n,80),usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_DST|GPUBufferUsage.COPY_SRC})}_resizeOutputBuffers(){let e=this._outputBuffers;for(let n in e){let{buffer:i,params:r}=e[n];i.destroy(),e[n].buffer=this._createBuffer(r)}}_updateOutputBuffers(e){let n=this._outputBuffers;for(let i in e){let r=e[i];if(!jS(r,n[i]?.params||{})){n[i]?.buffer.destroy();let o=this._createBuffer(r);n[i]={buffer:o,params:r}}}}_updatePipeline(e,n){if(!this._needsUpdatePipeline)return;this._needsUpdatePipeline=!1;let i=this._device,r=this._getFullCs(e,n);r!==this._csCode&&(this._csCode=r,this._pipeline=i.createComputePipeline({label:this._label,layout:"auto",compute:{module:i.createShaderModule({label:this._label,code:r}),entryPoint:"main"}}),this._updateBindGroups())}_getFullCs(e,n){let i=this._inputs,r=this._uniforms,o=0,a=this._groupOffsets={inputs:0,uniforms:0,outputs:0};return i.length>0&&o++,r.length>0&&(a.uniforms=o,o++),a.outputs=o,`
${i.sort().map((l,f)=>{let p=`@group(${a.inputs}) @binding(${f}) `,u=`in_${l}`;return n[l]==="texture"?`${p} var ${u}: texture_2d<f32>;`:`${p} var<storage, read> ${u}: array<vec${e[l].channels}f>;`}).join(`
`)}
${this._uniforms.map((l,f)=>`@group(${a.uniforms}) @binding(${f}) var<uniform> ${l.label}: ${l.type};`).join(`
`)}

${this._outputs.map((l,f)=>`@group(${a.outputs}) @binding(${f}) var<storage, read_write> out_${l}: array<vec${this._outputBuffers[l].params.channels}f>;`).join(`
`)}
${this._csDefine??""}
@compute @workgroup_size(${is}, ${is}, 1)
fn main(@builtin(global_invocation_id) globalId: vec3u) {
${this._csMain}
}
`}_updateBindGroups(){let e=[],n=this._device,i=this._groupOffsets;this._uniforms.length>0&&(e[i.uniforms]=n.createBindGroup({label:this._label,layout:this._pipeline.getBindGroupLayout(i.uniforms),entries:this._uniforms.map((r,o)=>({binding:o,resource:{buffer:this._uniformBuffers[r.label]}}))})),this._bindGroups=e}createPass(e,n){this._needsResizeBuffer&&this.autoUpdateOutputBuffer&&(this._resizeOutputBuffers(),this._needsResizeBuffer=!1);let i=this._inputs.reduce((a,c)=>(a[c]=n[c].buffer?"buffer":"texture",a),{});this._updatePipeline(n,i);let r=this._groupOffsets;this._inputs.length>0&&(this._bindGroups[r.inputs]=this._device.createBindGroup({label:this._label,layout:this._pipeline.getBindGroupLayout(r.inputs),entries:this._inputs.map((a,c)=>({binding:c,resource:n[a].buffer?{buffer:n[a].buffer}:n[a].texture.createView()}))})),this._bindGroups[r.outputs]=this._device.createBindGroup({label:this._label,layout:this._pipeline.getBindGroupLayout(r.outputs),entries:this._outputs.map((a,c)=>({binding:c,resource:{buffer:this._outputBuffers[a].buffer}}))});let o=e.beginComputePass();o.setPipeline(this._pipeline),this._bindGroups.forEach((a,c)=>{o.setBindGroup(c,a)}),o.dispatchWorkgroups(Math.ceil((this._execWidth??this._width)/is),Math.ceil((this._execHeight??this._height)/is),1),o.end()}};var Vl=1412.83765,zl=1.64593172,Wl=.431384981,$l=-.00294139609,Xl=.192653254,ql=.00626026094,Yl=.998620152,_h=15794576e-13,vh=.0322087631,xh=.00223151711,Sh=.370974749;function Th(t){return t<=_h?t=Vl*t:t<=vh?t=zl*Math.pow(t,Wl)+$l:t=Xl*Math.log(t+ql)+Yl,t}function QS(t){return t<=xh?t=t/Vl:t<=Sh?t=Math.pow((t-$l)/zl,1/Wl):t=Math.exp((t-Yl)/Xl)-ql,t}var JS=65504,bh=Th(JS),Eh=1/bh,yh=bh,br=class{x;y;width;height;constructor(e,n,i,r){this.x=e,this.y=n,this.width=i,this.height=r}};function Mh({data:t,channels:e}){let n=0;for(let a=0;a<t.length;a+=e){let c=t[a],l=t[a+1],f=t[a+2],p=.212671*c+.71516*l+.072169*f;n+=Math.log2(p+1e-4)}let i=t.length/e,r=n/i;return .18/Math.pow(2,r)}function Ah({data:t,channels:e,inputScale:n}){let i=new Float32Array(t.length);i.set(t);for(let r=0;r<i.length;r+=e)for(let o=0;o<3;o++){let a=i[r+o]*n;i[r+o]=Th(a)*Eh}return i}function wh({data:t,channels:e,inputScale:n}){let i=new Float32Array(t.length);i.set(t);let r=1/n;for(let o=0;o<i.length;o+=e)for(let a=0;a<3;a++){let c=i[o+a]*yh;i[o+a]=QS(c)*r}return i}var gh=`
const a = ${Vl};
const b = ${zl};
const c = ${Wl};
const d = ${$l};
const e = ${Xl};
const f = ${ql};
const g = ${Yl};
const y0 =${_h};
const y1 =${vh};
const x0 =${xh};
const x1 =${Sh};

const normScale = ${Eh};
const rcpNormScale = ${yh};
`,rs=class{_device;_isHDR;_inputPassAux;_inputPassColor;_outputPass;_copyPass;_isInputTexture;constructor(e,n){this._device=e,this._isHDR=n;let i=[{label:"inputScale",type:"f32",data:new Float32Array([1])},{label:"inputSize",type:"vec2i",data:new Int32Array(2)},{label:"outputSize",type:"vec2i",data:new Int32Array(2)},{label:"inputOffset",type:"vec2i",data:new Int32Array(2)}];this._inputPassAux=new Oi("inputPassAux",this._device,{inputs:["color","albedo","normal"],outputs:["color","albedo","normal"],uniforms:i,csDefine:"",csMain:""}),this._inputPassColor=new Oi("inputPassColor",this._device,{inputs:["color"],outputs:["color"],uniforms:i,csDefine:"",csMain:""}),this._outputPass=new Oi("outputPass",this._device,{inputs:["color","raw"],outputs:["color"],uniforms:[{label:"inputScale",type:"f32",data:new Float32Array([1])},{label:"inputSize",type:"vec2i",data:new Int32Array(2)},{label:"outputSize",type:"vec2i",data:new Int32Array(2)},{label:"imageSize",type:"vec2i",data:new Int32Array(2)},{label:"inputOffset",type:"vec2i",data:new Int32Array(2)},{label:"outputOffset",type:"vec2i",data:new Int32Array(2)}],csDefine:"",csMain:""}),this._copyPass=new Oi("copyPass",this._device,{inputs:["color"],outputs:["color"],autoUpdateOutputBuffer:!1,uniforms:[{label:"size",type:"vec2i",data:new Int32Array(2)}],csMain:`
let outIdx = i32(globalId.x + globalId.y * u32(size.x));
out_color[outIdx] = textureLoad(in_color, globalId.xy, 0);
`}),this._inputPassAux.setOutputParams({color:{channels:3},albedo:{channels:3},normal:{channels:3}}),this._inputPassColor.setOutputParams({color:{channels:3}}),this._outputPass.setOutputParams({color:{channels:4}})}_updatePasses(e,n=!1){if(this._isInputTexture!=null&&this._isInputTexture===e)return;this._isInputTexture=e;let i=this._isHDR,r=`
${gh}
fn PUForward(y: f32) -> f32 {
  if (y <= y0) {
    return a * y;
  } else if (y <= y1) {
    return b * pow(y, c) + d;
  } else {
    return e * log(y + f) + g;
  }
}`;function o(c){return e?`textureLoad(in_${c}, globalId.xy + vec2u(inputOffset), 0)`:`in_${c}[inIdx]`}let a=`
let x = i32(globalId.x);
let y = i32(globalId.y);
let inIdx = (y + inputOffset.y) * inputSize.x + (x + inputOffset.x);
let col = ${o("color")};

let outIdx = y * outputSize.x + x;

if (${n}) {
  // Denoise the inversed alpha. Or the anti aliased edge will be too dark after denoised
  out_color[outIdx] = vec3f(1.0 - col.a);
}
else if (${i}) {
  out_color[outIdx] = vec3f(PUForward(col.r * inputScale), PUForward(col.g * inputScale), PUForward(col.b * inputScale)) * normScale;
}
else {
  out_color[outIdx] = col.rgb;
}
`;this._inputPassAux.setCSCode({csDefine:r,csMain:`
${a}
let alb = ${o("albedo")};
let nor = ${o("normal")};
out_normal[outIdx] = nor.rgb;
out_albedo[outIdx] = alb.rgb;
  `}),this._inputPassColor.setCSCode({csDefine:r,csMain:`
${a}
`}),this._outputPass.setCSCode({csDefine:`
${gh}
fn PUInverse(y: f32) -> f32 {
  if (y <= x0) {
    return y / a;
  } else if (y <= x1) {
    return pow((y - d) / b, 1 / c);
  } else {
    return exp((y - g) / e) - f;
  }
}
`,csMain:`
let x = i32(globalId.x);
let y = i32(globalId.y);
if (x >= outputSize.x || y >= outputSize.y) {
  return;
}
let inIdx = (y + inputOffset.y) * inputSize.x + x + inputOffset.x;
let outIdx = (y + outputOffset.y) * imageSize.x + x + outputOffset.x;
let col = in_color[inIdx];
let raw = ${e?"textureLoad(in_raw, globalId.xy + vec2u(outputOffset), 0)":"in_raw[outIdx]"};

if (${n}) {
  out_color[outIdx] = vec4f(raw.rgb, 1.0 - col.r);
}
else if (${i}) {
  out_color[outIdx] = vec4f(
    vec3f(PUInverse(col.r * rcpNormScale), PUInverse(col.g * rcpNormScale), PUInverse(col.b * rcpNormScale)) / inputScale,
    // Pick the alpha
    raw.a
  );
}
else {
  out_color[outIdx] = vec4f(col.rgb, raw.a);
}
`})}setImageSize(e,n){this._inputPassAux.setUniform("inputSize",new Int32Array([e,n])),this._inputPassColor.setUniform("inputSize",new Int32Array([e,n])),this._outputPass.setUniform("imageSize",new Int32Array([e,n])),this._outputPass.setSize(e,n),this._copyPass.setSize(e,n),this._copyPass.setUniform("size",new Int32Array([e,n]))}setInputTile(e){let n=new Int32Array([e.width,e.height]);[this._inputPassAux,this._inputPassColor].forEach(i=>{i.setUniform("inputOffset",new Int32Array([e.x,e.y])),i.setUniform("outputSize",n),i.setSize(n[0],n[1])}),this._outputPass.setUniform("inputSize",n)}setOutputTile(e,n){let i=this._outputPass,r=new Int32Array([e.width,e.height]),o=e.x-n.x,a=e.y-n.y;i.setUniform("outputSize",r),i.setUniform("inputOffset",new Int32Array([o,a])),i.setUniform("outputOffset",new Int32Array([e.x,e.y])),i.setExecuteSize(r[0],r[1])}forward(e,n,i,r){let o=e instanceof GPUTexture;this._updatePasses(o,r);let a=this._inputPassAux,c=this._inputPassColor,l=this._device.createCommandEncoder();function f(p){return p instanceof GPUTexture?{texture:p,channels:4}:{buffer:p,channels:4}}return n&&i?a.createPass(l,{color:f(e),albedo:f(n),normal:f(i)}):c.createPass(l,{color:f(e)}),this._device.queue.submit([l.finish()]),n&&i?{color:a.getOutput("color"),albedo:a.getOutput("albedo"),normal:a.getOutput("normal")}:{color:c.getOutput("color")}}inverse(e,n){let r=this._device.createCommandEncoder(),o=this._outputPass;return o.createPass(r,{color:{buffer:e,channels:4},raw:n instanceof GPUBuffer?{buffer:n,channels:4}:{texture:n,channels:4}}),this._device.queue.submit([r.finish()]),o.getOutput("color")}copyInputDataToOutput(e){let n=this._device.createCommandEncoder(),r=this._outputPass.getOutput("color"),o=this._copyPass;e instanceof GPUTexture?(o.setOutputBuffers({color:r}),o.createPass(n,{color:{texture:e,channels:4}})):n.copyBufferToBuffer(e,0,r,0,r.size),this._device.queue.submit([n.finish()])}dispose(){this._outputPass.dispose(),this._inputPassAux.dispose(),this._inputPassColor.dispose(),this._copyPass.dispose(!1)}};function fo(t,e){return Math.ceil(t/e)*e}function eT(t,e){return Math.floor(t/e)*e}function Kl(t,e,n){return Math.min(Math.max(t,e),n)}function tT(t){let e=[...t].sort((i,r)=>i-r),n=Math.floor(e.length/2);return e.length%2?e[n]:(e[n-1]+e[n])/2}function Zl(t,e){return t<=e?Math.min(fo(t,16),e):e}var os=class{enabled;maxTileSize;minTileSize;targetTileTimeMs;_tileSize;_adjustmentStep;constructor(e,n=!0){let i=typeof n=="object"?n:{};this.enabled=n!==!1,this.maxTileSize=Math.max(16,eT(e,16)),this.minTileSize=Kl(fo(i.minTileSize??256,16),16,this.maxTileSize),this.targetTileTimeMs=Math.max(1,i.targetTileTimeMs??16),this._adjustmentStep=Math.max(16,fo(i.adjustmentStep??128,16)),this._tileSize=this.enabled?Kl(fo(i.initialTileSize??384,16),this.minTileSize,this.maxTileSize):this.maxTileSize}get tileSize(){return this._tileSize}observe(e){if(!this.enabled||e.length===0)return!1;let n=e.filter(o=>Number.isFinite(o)&&o>=0);if(n.length===0)return!1;let i=tT(n),r=this._tileSize;return i>this.targetTileTimeMs*1.25?r-=this._adjustmentStep:i<this.targetTileTimeMs*.65&&(r+=this._adjustmentStep),r=Kl(fo(r,16),this.minTileSize,this.maxTileSize),r===this._tileSize?!1:(this._tileSize=r,!0)}};async function Rh(t){try{await t.onSubmittedWorkDone()}catch{}}function We(t,e){return{op:"conv2d",id:t,input:e,weight:`${t}.weight`,bias:`${t}.bias`,activation:"relu",padding:"same"}}function fi(t,e){return{op:"maxPool2d",id:t,input:e,size:2,stride:2,padding:"same"}}function di(t,e){return{op:"upsample2d",id:t,input:e,scale:2,mode:"nearest"}}function pi(t,e,n){return{op:"concat",id:t,inputs:[e,n],axis:"channels"}}var Ih={schemaVersion:1,id:"oidn-unet-small-v1",family:"oidn-unet-small",input:"input",output:"dec_conv0",receptiveField:174,nodes:[We("enc_conv0","input"),We("enc_conv1","enc_conv0"),fi("pool1","enc_conv1"),We("enc_conv2","pool1"),fi("pool2","enc_conv2"),We("enc_conv3","pool2"),fi("pool3","enc_conv3"),We("enc_conv4","pool3"),fi("pool4","enc_conv4"),We("enc_conv5a","pool4"),We("enc_conv5b","enc_conv5a"),di("up4","enc_conv5b"),pi("concat4","up4","pool3"),We("dec_conv4a","concat4"),We("dec_conv4b","dec_conv4a"),di("up3","dec_conv4b"),pi("concat3","up3","pool2"),We("dec_conv3a","concat3"),We("dec_conv3b","dec_conv3a"),di("up2","dec_conv3b"),pi("concat2","up2","pool1"),We("dec_conv2a","concat2"),We("dec_conv2b","dec_conv2a"),di("up1","dec_conv2b"),pi("concat1","up1","input"),We("dec_conv1a","concat1"),We("dec_conv1b","dec_conv1a"),We("dec_conv0","dec_conv1b")]},Dh={schemaVersion:1,id:"oidn-unet-large-v1",family:"oidn-unet-large",input:"input",output:"dec_conv1c",receptiveField:202,nodes:[We("enc_conv1a","input"),We("enc_conv1b","enc_conv1a"),fi("pool1","enc_conv1b"),We("enc_conv2a","pool1"),We("enc_conv2b","enc_conv2a"),fi("pool2","enc_conv2b"),We("enc_conv3a","pool2"),We("enc_conv3b","enc_conv3a"),fi("pool3","enc_conv3b"),We("enc_conv4a","pool3"),We("enc_conv4b","enc_conv4a"),fi("pool4","enc_conv4b"),We("enc_conv5a","pool4"),We("enc_conv5b","enc_conv5a"),di("up4","enc_conv5b"),pi("concat4","up4","pool3"),We("dec_conv4a","concat4"),We("dec_conv4b","dec_conv4a"),di("up3","dec_conv4b"),pi("concat3","up3","pool2"),We("dec_conv3a","concat3"),We("dec_conv3b","dec_conv3a"),di("up2","dec_conv3b"),pi("concat2","up2","pool1"),We("dec_conv2a","concat2"),We("dec_conv2b","dec_conv2a"),di("up1","dec_conv2b"),pi("concat1","up1","input"),We("dec_conv1a","concat1"),We("dec_conv1b","dec_conv1a"),We("dec_conv1c","dec_conv1b")]},nT=[Ih,Dh];function Lh(t){let e=new Set;for(let n of t.nodes)n.op==="conv2d"&&(e.add(n.weight),e.add(n.bias));return e}function Ph(t){return t.desc.getByteSize()}function Nh(t){return[...t].sort().join(", ")}function as(t,e=nT){let n=e.filter(i=>{let r=Lh(i);return[...r].some(o=>!t.has(o))?!1:i.allowAdditionalTensors===!0||[...t.keys()].every(o=>r.has(o))});if(n.length===1)return n[0];throw n.length>1?new Error(`Ambiguous OIDN model topology: ${n.map(i=>i.id).join(", ")}`):new Error(`Unsupported OIDN model topology. TZA tensors: ${Nh(t.keys())}`)}function Ch(t,e,n){let i=t.get(e);if(!i)throw new Error(`Model ${n} is missing tensor ${e}`);if(i.data.byteLength!==Ph(i))throw new Error(`Tensor ${e} has ${i.data.byteLength} bytes, expected ${Ph(i)}`);return i}function jl(t,e=as(t)){if(e.schemaVersion!==1)throw new Error(`Unsupported model descriptor schema ${e.schemaVersion}`);let n=Lh(e);if(!e.allowAdditionalTensors){let u=[...t.keys()].filter(s=>!n.has(s));if(u.length>0)throw new Error(`Model ${e.id} has unexpected tensors: ${Nh(u)}`)}let i=new Map,r=new Map,o=new Map,a=new Set([e.input]),c,l,f=(u,s)=>{let h=i.get(u);if(h===void 0)throw new Error(`Model ${e.id} node ${s} reads unknown or forward value ${u}`);return h};for(let u of e.nodes){if(a.has(u.id))throw new Error(`Model ${e.id} produces duplicate value ${u.id}`);if(u.op==="conv2d"){let s=Ch(t,u.weight,e.id),h=Ch(t,u.bias,e.id),g=s.desc.dims;if(s.desc.layout!=="oihw"||g.length!==4)throw new Error(`Tensor ${u.weight} must use OIHW layout`);if(g[2]!==3||g[3]!==3)throw new Error(`Tensor ${u.weight} must use a 3x3 kernel`);if(h.desc.layout!=="x"||h.desc.dims.length!==1)throw new Error(`Tensor ${u.bias} must be a one-dimensional bias`);if(h.desc.dims[0]!==g[0])throw new Error(`Tensor ${u.bias} has ${h.desc.dims[0]} channels, expected ${g[0]}`);if(s.desc.dataType!==h.desc.dataType)throw new Error(`Weight and bias dtype differ for ${u.id}`);if(l&&l!==s.desc.dataType)throw new Error(`Mixed tensor dtypes are not supported by model ${e.id}`);l=s.desc.dataType,u.input===e.input&&c===void 0&&(c=g[1],i.set(e.input,c));let b=f(u.input,u.id);if(b!==g[1])throw new Error(`Tensor ${u.weight} expects ${g[1]} input channels, but ${u.input} provides ${b}`);i.set(u.id,g[0]),r.set(u.id,{weight:s,bias:h,inputChannels:g[1],outputChannels:g[0],kernelHeight:g[2],kernelWidth:g[3]}),o.set(u.id,{inputChannels:g[1],outputChannels:g[0]})}else if(u.op==="concat"){if(u.inputs.length<2)throw new Error(`Concat ${u.id} requires at least two inputs`);let s=u.inputs.reduce((h,g)=>h+f(g,u.id),0);i.set(u.id,s)}else i.set(u.id,f(u.input,u.id));a.add(u.id)}if(c===void 0||l===void 0)throw new Error(`Model ${e.id} has no convolution reading its input`);let p=i.get(e.output);if(p===void 0)throw new Error(`Model ${e.id} output ${e.output} is not produced`);if(p!==3)throw new Error(`Model ${e.id} must produce 3 channels, got ${p}`);return{spec:e,inputChannels:c,outputChannels:p,tensorDataType:l,channelsByValue:i,convChannels:o,convTensors:r}}var Uh="This is not an object",Fh="This is not a Float16Array object",Ql="This constructor is not a subclass of Float16Array",ss="The constructor property value is not an object",Bh="Species constructor didn't return TypedArray object",Oh="Derived constructor created TypedArray object which was too small length",Er="Attempting to access detached ArrayBuffer",po="Cannot convert undefined or null to object",cs="Cannot mix BigInt and other types, use explicit conversions",Jl="@@iterator property is not callable",eu="Reduce of empty array with no initial value",Gh="The comparison function must be either a function or undefined",ls="Offset is out of bounds";function ht(t){return(e,...n)=>cn(t,e,n)}function yr(t,e){return ht(hi(t,e).get)}var{apply:cn,construct:Mr,defineProperty:nu,get:fs,getOwnPropertyDescriptor:hi,getPrototypeOf:Ar,has:ho,ownKeys:ds,set:iu,setPrototypeOf:ru}=Reflect,Hh=Proxy,{EPSILON:kh,MAX_SAFE_INTEGER:ou,isFinite:ps,isNaN:jn}=Number,{iterator:bn,species:Vh,toStringTag:hs,for:zh}=Symbol,Gi=Object,{create:mo,defineProperty:Hi,freeze:Wh,is:au}=Gi,tu=Gi.prototype,$h=tu.__lookupGetter__?ht(tu.__lookupGetter__):(t,e)=>{if(t==null)throw mt(po);let n=Gi(t);do{let i=hi(n,e);if(i!==void 0)return Vn(i,"get")?i.get:void 0}while((n=Ar(n))!==null)},Vn=Gi.hasOwn||ht(tu.hasOwnProperty),Xh=Array,su=Xh.isArray,ms=Xh.prototype,qh=ht(ms.join),Yh=ht(ms.push),Kh=ht(ms.toLocaleString),go=ms[bn],Zh=ht(go),{abs:jh,trunc:gs}=Math,wr=ArrayBuffer,Qh=wr.isView,Jh=wr.prototype,em=ht(Jh.slice),tm=yr(Jh,"byteLength"),us=typeof SharedArrayBuffer<"u"?SharedArrayBuffer:null,nm=us&&yr(us.prototype,"byteLength"),_s=Ar(Uint8Array),iT=_s.from,Vt=_s.prototype,im=Vt[bn],rm=ht(Vt.keys),om=ht(Vt.values),am=ht(Vt.entries),sm=ht(Vt.set),cu=ht(Vt.reverse),cm=ht(Vt.fill),lm=ht(Vt.copyWithin),lu=ht(Vt.sort),Rr=ht(Vt.slice),um=ht(Vt.subarray),zt=yr(Vt,"buffer"),mi=yr(Vt,"byteOffset"),Je=yr(Vt,"length"),uu=yr(Vt,hs),fm=Uint8Array,ln=Uint16Array,fu=(...t)=>cn(iT,ln,t),vs=Uint32Array,dm=Float32Array,Qn=Ar([][bn]()),Pr=ht(Qn.next),pm=ht(function*(){}().next),hm=Ar(Qn),mm=DataView.prototype,O3=ht(mm.getUint16),G3=ht(mm.setUint16),mt=TypeError,xs=RangeError,du=WeakSet,gm=du.prototype,_m=ht(gm.add),vm=ht(gm.has),Cr=WeakMap,pu=Cr.prototype,Ir=ht(pu.get),xm=ht(pu.has),_o=ht(pu.set);var Sm=new Cr,rT=mo(null,{next:{value:function(){let e=Ir(Sm,this);return Pr(e)}},[bn]:{value:function(){return this}}});function vo(t){if(t[bn]===go&&Qn.next===Pr)return t;let e=mo(rT);return _o(Sm,e,Zh(t)),e}var Tm=new Cr,bm=mo(hm,{next:{value:function(){let e=Ir(Tm,this);return pm(e)},writable:!0,configurable:!0}});for(let t of ds(Qn))t!=="next"&&Hi(bm,t,hi(Qn,t));function hu(t){let e=mo(bm);return _o(Tm,e,t),e}function ki(t){return t!==null&&typeof t=="object"||typeof t=="function"}function mu(t){return t!==null&&typeof t=="object"}function xo(t){return uu(t)!==void 0}function Ss(t){let e=uu(t);return e==="BigInt64Array"||e==="BigUint64Array"}function oT(t){try{return su(t)?!1:(tm(t),!0)}catch{return!1}}function gu(t){if(us===null)return!1;try{return nm(t),!0}catch{return!1}}function Em(t){return oT(t)||gu(t)}function _u(t){return su(t)?t[bn]===go&&Qn.next===Pr:!1}function ym(t){return xo(t)?t[bn]===im&&Qn.next===Pr:!1}function So(t){if(typeof t!="string")return!1;let e=+t;return t!==e+""||!ps(e)?!1:e===gs(e)}var To=zh("__Float16Array__");function Mm(t){if(!mu(t))return!1;let e=Ar(t);if(!mu(e))return!1;let n=e.constructor;if(n===void 0)return!1;if(!ki(n))throw mt(ss);return ho(n,To)}var vu=1/kh;function aT(t){return t+vu-vu}var wm=6103515625e-14,sT=65504,Rm=.0009765625,Am=Rm*wm,cT=Rm*vu;function lT(t){let e=+t;if(!ps(e)||e===0)return e;let n=e>0?1:-1,i=jh(e);if(i<wm)return n*aT(i/Am)*Am;let r=(1+cT)*i,o=r-(r-i);return o>sT||jn(o)?n*(1/0):n*o}var Pm=new wr(4),Cm=new dm(Pm),Im=new vs(Pm),Nn=new ln(512),Un=new fm(512);for(let t=0;t<256;++t){let e=t-127;e<-24?(Nn[t]=0,Nn[t|256]=32768,Un[t]=24,Un[t|256]=24):e<-14?(Nn[t]=1024>>-e-14,Nn[t|256]=1024>>-e-14|32768,Un[t]=-e-1,Un[t|256]=-e-1):e<=15?(Nn[t]=e+15<<10,Nn[t|256]=e+15<<10|32768,Un[t]=13,Un[t|256]=13):e<128?(Nn[t]=31744,Nn[t|256]=64512,Un[t]=24,Un[t|256]=24):(Nn[t]=31744,Nn[t|256]=64512,Un[t]=13,Un[t|256]=13)}function Fn(t){Cm[0]=lT(t);let e=Im[0],n=e>>23&511;return Nn[n]+((e&8388607)>>Un[n])}var xu=new vs(2048);for(let t=1;t<1024;++t){let e=t<<13,n=0;for(;(e&8388608)===0;)e<<=1,n-=8388608;e&=-8388609,n+=947912704,xu[t]=e|n}for(let t=1024;t<2048;++t)xu[t]=939524096+(t-1024<<13);var Dr=new vs(64);for(let t=1;t<31;++t)Dr[t]=t<<23;Dr[31]=1199570944;Dr[32]=2147483648;for(let t=33;t<63;++t)Dr[t]=2147483648+(t-32<<23);Dr[63]=3347054592;var Dm=new ln(64);for(let t=1;t<64;++t)t!==32&&(Dm[t]=1024);function ct(t){let e=t>>10;return Im[0]=xu[Dm[e]+(t&1023)]+Dr[e],Cm[0]}function zn(t){let e=+t;return jn(e)||e===0?0:gs(e)}function Ts(t){let e=zn(t);return e<0?0:e<ou?e:ou}function bo(t,e){if(!ki(t))throw mt(Uh);let n=t.constructor;if(n===void 0)return e;if(!ki(n))throw mt(ss);let i=n[Vh];return i??e}function Lr(t){if(gu(t))return!1;try{return em(t,0,0),!1}catch{}return!0}function Su(t,e){let n=jn(t),i=jn(e);if(n&&i)return 0;if(n)return 1;if(i||t<e)return-1;if(t>e)return 1;if(t===0&&e===0){let r=au(t,0),o=au(e,0);if(!r&&o)return-1;if(r&&!o)return 1}return 0}var Tu=2,Es=new Cr;function Vi(t){return xm(Es,t)||!Qh(t)&&Mm(t)}function ot(t){if(!Vi(t))throw mt(Fh)}function bs(t,e){let n=Vi(t),i=xo(t);if(!n&&!i)throw mt(Bh);if(typeof e=="number"){let r;if(n){let o=Le(t);r=Je(o)}else r=Je(t);if(r<e)throw mt(Oh)}if(Ss(t))throw mt(cs)}function Le(t){let e=Ir(Es,t);if(e!==void 0){let r=zt(e);if(Lr(r))throw mt(Er);return e}let n=t.buffer;if(Lr(n))throw mt(Er);let i=Mr(un,[n,t.byteOffset,t.length],t.constructor);return Ir(Es,i)}function Lm(t){let e=Je(t),n=[];for(let i=0;i<e;++i)n[i]=ct(t[i]);return n}var Nm=new du;for(let t of ds(Vt)){if(t===hs)continue;let e=hi(Vt,t);Vn(e,"get")&&typeof e.get=="function"&&_m(Nm,e.get)}var uT=Wh({get(t,e,n){return So(e)&&Vn(t,e)?ct(fs(t,e)):vm(Nm,$h(t,e))?fs(t,e):fs(t,e,n)},set(t,e,n,i){return So(e)&&Vn(t,e)?iu(t,e,Fn(n)):iu(t,e,n,i)},getOwnPropertyDescriptor(t,e){if(So(e)&&Vn(t,e)){let n=hi(t,e);return n.value=ct(n.value),n}return hi(t,e)},defineProperty(t,e,n){return So(e)&&Vn(t,e)&&Vn(n,"value")?(n.value=Fn(n.value),nu(t,e,n)):nu(t,e,n)}}),un=class t{constructor(e,n,i){let r;if(Vi(e))r=Mr(ln,[Le(e)],new.target);else if(ki(e)&&!Em(e)){let a,c;if(xo(e)){a=e,c=Je(e);let l=zt(e);if(Lr(l))throw mt(Er);if(Ss(e))throw mt(cs);let f=new wr(c*Tu);r=Mr(ln,[f],new.target)}else{let l=e[bn];if(l!=null&&typeof l!="function")throw mt(Jl);l!=null?_u(e)?(a=e,c=e.length):(a=[...e],c=a.length):(a=e,c=Ts(a.length)),r=Mr(ln,[c],new.target)}for(let l=0;l<c;++l)r[l]=Fn(a[l])}else r=Mr(ln,arguments,new.target);let o=new Hh(r,uT);return _o(Es,o,r),o}static from(e,...n){let i=this;if(!ho(i,To))throw mt(Ql);if(i===t){if(Vi(e)&&n.length===0){let p=Le(e),u=new ln(zt(p),mi(p),Je(p));return new t(zt(Rr(u)))}if(n.length===0)return new t(zt(fu(e,Fn)));let l=n[0],f=n[1];return new t(zt(fu(e,function(p,...u){return Fn(cn(l,this,[p,...vo(u)]))},f)))}let r,o,a=e[bn];if(a!=null&&typeof a!="function")throw mt(Jl);if(a!=null)_u(e)?(r=e,o=e.length):ym(e)?(r=e,o=Je(e)):(r=[...e],o=r.length);else{if(e==null)throw mt(po);r=Gi(e),o=Ts(r.length)}let c=new i(o);if(n.length===0)for(let l=0;l<o;++l)c[l]=r[l];else{let l=n[0],f=n[1];for(let p=0;p<o;++p)c[p]=cn(l,f,[r[p],p])}return c}static of(...e){let n=this;if(!ho(n,To))throw mt(Ql);let i=e.length;if(n===t){let o=new t(i),a=Le(o);for(let c=0;c<i;++c)a[c]=Fn(e[c]);return o}let r=new n(i);for(let o=0;o<i;++o)r[o]=e[o];return r}keys(){ot(this);let e=Le(this);return rm(e)}values(){ot(this);let e=Le(this);return hu(function*(){for(let n of om(e))yield ct(n)}())}entries(){ot(this);let e=Le(this);return hu(function*(){for(let[n,i]of am(e))yield[n,ct(i)]}())}at(e){ot(this);let n=Le(this),i=Je(n),r=zn(e),o=r>=0?r:i+r;if(!(o<0||o>=i))return ct(n[o])}with(e,n){ot(this);let i=Le(this),r=Je(i),o=zn(e),a=o>=0?o:r+o,c=+n;if(a<0||a>=r)throw xs(ls);let l=new ln(zt(i),mi(i),Je(i)),f=new t(zt(Rr(l))),p=Le(f);return p[a]=Fn(c),f}map(e,...n){ot(this);let i=Le(this),r=Je(i),o=n[0],a=bo(i,t);if(a===t){let l=new t(r),f=Le(l);for(let p=0;p<r;++p){let u=ct(i[p]);f[p]=Fn(cn(e,o,[u,p,this]))}return l}let c=new a(r);bs(c,r);for(let l=0;l<r;++l){let f=ct(i[l]);c[l]=cn(e,o,[f,l,this])}return c}filter(e,...n){ot(this);let i=Le(this),r=Je(i),o=n[0],a=[];for(let f=0;f<r;++f){let p=ct(i[f]);cn(e,o,[p,f,this])&&Yh(a,p)}let c=bo(i,t),l=new c(a);return bs(l),l}reduce(e,...n){ot(this);let i=Le(this),r=Je(i);if(r===0&&n.length===0)throw mt(eu);let o,a;n.length===0?(o=ct(i[0]),a=1):(o=n[0],a=0);for(let c=a;c<r;++c)o=e(o,ct(i[c]),c,this);return o}reduceRight(e,...n){ot(this);let i=Le(this),r=Je(i);if(r===0&&n.length===0)throw mt(eu);let o,a;n.length===0?(o=ct(i[r-1]),a=r-2):(o=n[0],a=r-1);for(let c=a;c>=0;--c)o=e(o,ct(i[c]),c,this);return o}forEach(e,...n){ot(this);let i=Le(this),r=Je(i),o=n[0];for(let a=0;a<r;++a)cn(e,o,[ct(i[a]),a,this])}find(e,...n){ot(this);let i=Le(this),r=Je(i),o=n[0];for(let a=0;a<r;++a){let c=ct(i[a]);if(cn(e,o,[c,a,this]))return c}}findIndex(e,...n){ot(this);let i=Le(this),r=Je(i),o=n[0];for(let a=0;a<r;++a){let c=ct(i[a]);if(cn(e,o,[c,a,this]))return a}return-1}findLast(e,...n){ot(this);let i=Le(this),r=Je(i),o=n[0];for(let a=r-1;a>=0;--a){let c=ct(i[a]);if(cn(e,o,[c,a,this]))return c}}findLastIndex(e,...n){ot(this);let i=Le(this),r=Je(i),o=n[0];for(let a=r-1;a>=0;--a){let c=ct(i[a]);if(cn(e,o,[c,a,this]))return a}return-1}every(e,...n){ot(this);let i=Le(this),r=Je(i),o=n[0];for(let a=0;a<r;++a)if(!cn(e,o,[ct(i[a]),a,this]))return!1;return!0}some(e,...n){ot(this);let i=Le(this),r=Je(i),o=n[0];for(let a=0;a<r;++a)if(cn(e,o,[ct(i[a]),a,this]))return!0;return!1}set(e,...n){ot(this);let i=Le(this),r=zn(n[0]);if(r<0)throw xs(ls);if(e==null)throw mt(po);if(Ss(e))throw mt(cs);if(Vi(e))return sm(Le(this),Le(e),r);if(xo(e)){let l=zt(e);if(Lr(l))throw mt(Er)}let o=Je(i),a=Gi(e),c=Ts(a.length);if(r===1/0||c+r>o)throw xs(ls);for(let l=0;l<c;++l)i[l+r]=Fn(a[l])}reverse(){ot(this);let e=Le(this);return cu(e),this}toReversed(){ot(this);let e=Le(this),n=new ln(zt(e),mi(e),Je(e)),i=new t(zt(Rr(n))),r=Le(i);return cu(r),i}fill(e,...n){ot(this);let i=Le(this);return cm(i,Fn(e),...vo(n)),this}copyWithin(e,n,...i){ot(this);let r=Le(this);return lm(r,e,n,...vo(i)),this}sort(e){ot(this);let n=Le(this),i=e!==void 0?e:Su;return lu(n,(r,o)=>i(ct(r),ct(o))),this}toSorted(e){ot(this);let n=Le(this);if(e!==void 0&&typeof e!="function")throw new mt(Gh);let i=e!==void 0?e:Su,r=new ln(zt(n),mi(n),Je(n)),o=new t(zt(Rr(r))),a=Le(o);return lu(a,(c,l)=>i(ct(c),ct(l))),o}slice(e,n){ot(this);let i=Le(this),r=bo(i,t);if(r===t){let g=new ln(zt(i),mi(i),Je(i));return new t(zt(Rr(g,e,n)))}let o=Je(i),a=zn(e),c=n===void 0?o:zn(n),l;a===-1/0?l=0:a<0?l=o+a>0?o+a:0:l=o<a?o:a;let f;c===-1/0?f=0:c<0?f=o+c>0?o+c:0:f=o<c?o:c;let p=f-l>0?f-l:0,u=new r(p);if(bs(u,p),p===0)return u;let s=zt(i);if(Lr(s))throw mt(Er);let h=0;for(;l<f;)u[h]=ct(i[l]),++l,++h;return u}subarray(e,n){ot(this);let i=Le(this),r=bo(i,t),o=new ln(zt(i),mi(i),Je(i)),a=um(o,e,n),c=new r(zt(a),mi(a),Je(a));return bs(c),c}indexOf(e,...n){ot(this);let i=Le(this),r=Je(i),o=zn(n[0]);if(o===1/0)return-1;o<0&&(o+=r,o<0&&(o=0));for(let a=o;a<r;++a)if(Vn(i,a)&&ct(i[a])===e)return a;return-1}lastIndexOf(e,...n){ot(this);let i=Le(this),r=Je(i),o=n.length>=1?zn(n[0]):r-1;if(o===-1/0)return-1;o>=0?o=o<r-1?o:r-1:o+=r;for(let a=o;a>=0;--a)if(Vn(i,a)&&ct(i[a])===e)return a;return-1}includes(e,...n){ot(this);let i=Le(this),r=Je(i),o=zn(n[0]);if(o===1/0)return!1;o<0&&(o+=r,o<0&&(o=0));let a=jn(e);for(let c=o;c<r;++c){let l=ct(i[c]);if(a&&jn(l)||l===e)return!0}return!1}join(e){ot(this);let n=Le(this),i=Lm(n);return qh(i,e)}toLocaleString(...e){ot(this);let n=Le(this),i=Lm(n);return Kh(i,...vo(e))}get[hs](){if(Vi(this))return"Float16Array"}};Hi(un,"BYTES_PER_ELEMENT",{value:Tu});Hi(un,To,{});ru(un,_s);var ys=un.prototype;Hi(ys,"BYTES_PER_ELEMENT",{value:Tu});Hi(ys,bn,{value:ys.values,writable:!0,configurable:!0});ru(ys,Vt);function fT(t){return t.op==="concat"?t.inputs:[t.input]}function dT(t){let e=new Map;for(let n of t.nodes)for(let i of fT(n)){let r=e.get(i)??[];r.push(n),e.set(i,r)}return e}function bu(t,e,n){let i=t.get(e);if(!(i?.length!==1||i[0].op!==n))return i[0]}function Eo(t,e={}){let n=t.spec,i=dT(n),r=new Map(n.nodes.map(p=>[p.id,p])),o=new Set,a=new Map,c=0,l=0;if(e.fuseConvPool!==!1)for(let p of n.nodes){if(p.op!=="conv2d"||p.activation!=="relu")continue;let u=bu(i,p.id,"maxPool2d");!u||u.size!==2||u.stride!==2||(o.add(p.id),a.set(u.id,{op:"fusedConvReluMaxPool2d",id:u.id,input:p.input,conv:p,pool:u}),c++)}if(e.fuseUpsampleConcatConv!==!1)for(let p of n.nodes){if(p.op!=="conv2d")continue;let u=r.get(p.input);if(u?.op!=="concat"||u.inputs.length!==2||bu(i,u.id,"conv2d")!==p)continue;let s=t.channelsByValue.get(u.inputs[0]);if(s===void 0||s%4!==0)continue;let h=u.inputs.map(b=>{let d=r.get(b);return d?.op==="upsample2d"&&d.scale===2&&d.mode==="nearest"&&bu(i,d.id,"concat")===u?{value:d.input,upsample:d}:{value:b}});if(h.filter(b=>b.upsample).length===1){o.add(u.id);for(let b of u.inputs){let d=r.get(b);d?.op==="upsample2d"&&o.add(d.id)}a.set(p.id,{op:"fusedUpsampleConcatConv2d",id:p.id,inputs:h,conv:p}),l++}}let f=[];for(let p of n.nodes){let u=a.get(p.id);u?f.push(u):o.has(p.id)||f.push(p)}return{spec:n,nodes:f,fusions:{convPool:c,upsampleConcatConv:l}}}function pT(t){return t.op==="concat"?t.inputs:t.op==="fusedUpsampleConcatConv2d"?t.inputs.map(e=>e.value):[t.input]}function Um(t,e){return t.width===e.width&&t.height===e.height}function Eu(t,e,n,i){if(!Number.isInteger(e)||e<=0||!Number.isInteger(n)||n<=0)throw new Error(`Invalid model input size ${e}x${n}`);let r=Eo(t,i),o={width:e,height:n,channels:t.inputChannels},a=new Map([[t.spec.input,o]]),c=[],l=(u,s)=>{let h=a.get(u);if(!h)throw new Error(`Planned node ${s} reads missing value ${u}`);return h};for(let u of r.nodes){let s;if(u.op==="conv2d"){let h=l(u.input,u.id);s={width:h.width,height:h.height,channels:t.convChannels.get(u.id).outputChannels}}else if(u.op==="maxPool2d"){let h=l(u.input,u.id);s={width:Math.ceil(h.width/2),height:Math.ceil(h.height/2),channels:h.channels}}else if(u.op==="upsample2d"){let h=l(u.input,u.id);s={width:h.width*2,height:h.height*2,channels:h.channels}}else if(u.op==="concat"){let h=u.inputs.map(g=>l(g,u.id));if(h.some(g=>!Um(g,h[0])))throw new Error(`Concat ${u.id} has mismatched spatial shapes`);s={width:h[0].width,height:h[0].height,channels:h.reduce((g,b)=>g+b.channels,0)}}else if(u.op==="fusedConvReluMaxPool2d"){let h=l(u.input,u.id);s={width:Math.ceil(h.width/2),height:Math.ceil(h.height/2),channels:t.convChannels.get(u.conv.id).outputChannels}}else{let h=u.inputs.map(g=>{let b=l(g.value,u.id);return g.upsample?{...b,width:b.width*2,height:b.height*2}:b});if(h.some(g=>!Um(g,h[0])))throw new Error(`Fused decoder ${u.id} has mismatched spatial shapes`);s={width:h[0].width,height:h[0].height,channels:t.convChannels.get(u.conv.id).outputChannels}}a.set(u.id,s),c.push(s)}let f=new Map;r.nodes.forEach((u,s)=>{for(let h of pT(u))f.set(h,s)}),f.set(t.spec.output,r.nodes.length);let p=r.nodes.map((u,s)=>({node:u,outputShape:c[s],lastUse:f.get(u.id)??s}));return{...r,inputShape:o,valueShapes:a,plannedNodes:p}}var Nr=class{_stats=new Map;track(e,n){let i=this._stats.get(e);return i||(i={created:0,destroyed:0,live:0,peakLive:0,resources:new Set},this._stats.set(e,i)),i.resources.has(n)||(i.resources.add(n),i.created++,i.live++,i.peakLive=Math.max(i.peakLive,i.live)),n}release(e,n,i){if(!n)return!1;let r=this._stats.get(e);if(!r?.resources.delete(n))return!1;try{i()}finally{r.destroyed++,r.live--}return!0}snapshot(e=0){let n=0,i=0,r=0,o=0,a={};for(let[c,l]of this._stats){let f={created:l.created,destroyed:l.destroyed,live:l.live,peakLive:l.peakLive};a[c]=f,n+=f.live,i+=f.created,r+=f.destroyed,o+=f.peakLive}return{live:n,created:i,destroyed:r,peakLive:o,pending:e,byKind:a}}};var Fm=new WeakMap;function hT(t){let e=Fm.get(t);return e||(e={ready:new Map,pending:new Map},Fm.set(t,e)),e}var tn=8,wn=8,en=4,zi=wn*en,En=wn,gn=8,Rt=8,Rn=Rt+2;function Mu(t,e){return Math.ceil(t/e)*e}function Lt(t){return Math.ceil(t/4)}function mT(t,e){return t.width*t.height*Lt(t.channels)*4*e}var yo;function Hm(t){let e=t&32768?-1:1,n=t>>>10&31,i=t&1023;return n===0?e*i*2**-24:n===31?i===0?e*(1/0):NaN:e*(1+i/1024)*2**(n-15)}function gT(){if(!yo){yo=new Float32Array(65536);for(let t=0;t<yo.length;t++)yo[t]=Hm(t)}return yo}function Bm(t){if(t.desc.dataType==="Float32")return new Float32Array(t.data.buffer,t.data.byteOffset,t.data.byteLength/4);let e=new Uint16Array(t.data.buffer,t.data.byteOffset,t.data.byteLength/2),n=new Float32Array(e.length);if(e.length<4096)for(let i=0;i<e.length;i++)n[i]=Hm(e[i]);else{let i=gT();for(let r=0;r<e.length;r++)n[r]=i[e[r]]}return n}function yu(t,e,n,i){let r=Mu(n.byteLength,4),o=t.createBuffer({label:e,size:r,usage:i,mappedAtCreation:!0});return new Uint8Array(o.getMappedRange()).set(new Uint8Array(n.buffer,n.byteOffset,n.byteLength)),o.unmap(),o}function Om(t,e,n){let i=new Uint32Array(Mu(n.length,4));return i.set(n),yu(t,e,i,GPUBufferUsage.UNIFORM)}function _T(t,e,n,i){let r=Lt(n.inputChannels),o=Lt(n.outputChannels),a=o*n.kernelHeight*n.kernelWidth*r*4*4,c=i==="fp16"&&n.weight.desc.dataType==="Float16",l=c?new Uint16Array(a):i==="fp16"?new un(a):new Float32Array(a),f=c?new Uint16Array(n.weight.data.buffer,n.weight.data.byteOffset,n.weight.data.byteLength/2):Bm(n.weight);for(let s=0;s<o;s++)for(let h=0;h<n.kernelHeight;h++)for(let g=0;g<n.kernelWidth;g++)for(let b=0;b<r;b++)for(let d=0;d<4;d++){let m=s*4+d;for(let _=0;_<4;_++){let E=b*4+_,T=(((s*n.kernelHeight+h)*n.kernelWidth+g)*r+b)*16+_*4+d;if(m<n.outputChannels&&E<n.inputChannels){let M=((m*n.inputChannels+E)*n.kernelHeight+h)*n.kernelWidth+g;l[T]=f[M]}}}let p=new Float32Array(o*4);p.set(Bm(n.bias));let u=yu(t,`oidn/${e}/weights/${i}`,l,GPUBufferUsage.STORAGE);try{return{weights:u,bias:yu(t,`oidn/${e}/bias`,p,GPUBufferUsage.STORAGE)}}catch(s){throw u.destroy(),s}}function nn(t){return t==="fp16"?"vec4<f16>":"vec4<f32>"}function Wn(t){return t==="fp16"?`enable f16;
`:""}function $n(t,e){return e==="fp16"?`vec4<f16>(${t})`:t}function gi(t,e){return e==="relu"?`max(${t}, vec4<f32>(0.0))`:t}function Ao(t,e,n){return n==="fp32"?`
let inputValue = vec4<f32>(${t});
let weightBase = ${e};
acc = fma(vec4<f32>(weights[weightBase]), vec4<f32>(inputValue.x), acc);
acc = fma(vec4<f32>(weights[weightBase + 1u]), vec4<f32>(inputValue.y), acc);
acc = fma(vec4<f32>(weights[weightBase + 2u]), vec4<f32>(inputValue.z), acc);
acc = fma(vec4<f32>(weights[weightBase + 3u]), vec4<f32>(inputValue.w), acc);
`:`
let inputValue = vec4<f16>(${t});
let weightBase = ${e};
var partial = vec4<f16>(0.0h);
partial = fma(weights[weightBase], vec4<f16>(inputValue.x), partial);
partial = fma(weights[weightBase + 1u], vec4<f16>(inputValue.y), partial);
partial = fma(weights[weightBase + 2u], vec4<f16>(inputValue.z), partial);
partial = fma(weights[weightBase + 3u], vec4<f16>(inputValue.w), partial);
acc += vec4<f32>(partial);
`}function vT(t,e,n){let i=n==="fp16"?"vec4<f16>":"vec4<f32>",r=n==="fp16"?`var partial = vec4<f16>(0.0h);
partial = fma(subgroupBroadcast(weights[weightBase], 0u), ${i}(inputValue.x), partial);
partial = fma(subgroupBroadcast(weights[weightBase + 1u], 0u), ${i}(inputValue.y), partial);
partial = fma(subgroupBroadcast(weights[weightBase + 2u], 0u), ${i}(inputValue.z), partial);
partial = fma(subgroupBroadcast(weights[weightBase + 3u], 0u), ${i}(inputValue.w), partial);
acc += vec4<f32>(partial);`:`acc = fma(subgroupBroadcast(weights[weightBase], 0u), vec4<f32>(inputValue.x), acc);
acc = fma(subgroupBroadcast(weights[weightBase + 1u], 0u), vec4<f32>(inputValue.y), acc);
acc = fma(subgroupBroadcast(weights[weightBase + 2u], 0u), vec4<f32>(inputValue.z), acc);
acc = fma(subgroupBroadcast(weights[weightBase + 3u], 0u), vec4<f32>(inputValue.w), acc);`;return`
let inputValue = ${i}(${t});
let weightBase = ${e};
${r}
`}function km(t){return t==="fp16"?`
    var partial: array<vec4<f16>, ${en}>;
    for (var row = 0u; row < ${en}u; row++) {
      partial[row] = vec4<f16>(0.0h);
    }
    for (var tileK = 0u; tileK < ${gn}u; tileK++) {
      let weightBase =
        (tileK * ${En}u + localId.x) * 4u;
      for (var row = 0u; row < ${en}u; row++) {
        let tileSpatial =
          localId.y * ${en}u + row;
        let inputValue =
          inputTile[tileSpatial * ${gn}u + tileK];
        partial[row] = fma(
          weightTile[weightBase],
          vec4<f16>(inputValue.x),
          partial[row]
        );
        partial[row] = fma(
          weightTile[weightBase + 1u],
          vec4<f16>(inputValue.y),
          partial[row]
        );
        partial[row] = fma(
          weightTile[weightBase + 2u],
          vec4<f16>(inputValue.z),
          partial[row]
        );
        partial[row] = fma(
          weightTile[weightBase + 3u],
          vec4<f16>(inputValue.w),
          partial[row]
        );
      }
    }
    for (var row = 0u; row < ${en}u; row++) {
      acc[row] += vec4<f32>(partial[row]);
    }
`:`
    for (var tileK = 0u; tileK < ${gn}u; tileK++) {
      let weightBase =
        (tileK * ${En}u + localId.x) * 4u;
      for (var row = 0u; row < ${en}u; row++) {
        let tileSpatial =
          localId.y * ${en}u + row;
        let inputValue =
          inputTile[tileSpatial * ${gn}u + tileK];
        acc[row] = fma(
          weightTile[weightBase],
          vec4<f32>(inputValue.x),
          acc[row]
        );
        acc[row] = fma(
          weightTile[weightBase + 1u],
          vec4<f32>(inputValue.y),
          acc[row]
        );
        acc[row] = fma(
          weightTile[weightBase + 2u],
          vec4<f32>(inputValue.z),
          acc[row]
        );
        acc[row] = fma(
          weightTile[weightBase + 3u],
          vec4<f32>(inputValue.w),
          acc[row]
        );
      }
    }
`}function xT(t,e,n,i,r){let o=nn(t),a=nn(t),c=nn(e),l=$n(gi("acc",n),e);return`${Wn(t)}
struct Params {
  inputWidth: u32,
  inputHeight: u32,
  outputWidth: u32,
  outputHeight: u32,
  inputBlocks: u32,
  outputBlocks: u32,
}

@group(0) @binding(0) var<storage, read> inputData: array<${o}>;
@group(0) @binding(1) var<storage, read> weights: array<${a}>;
@group(0) @binding(2) var<storage, read> bias: array<vec4<f32>>;
@group(0) @binding(3) var<storage, read_write> outputData: array<${c}>;
@group(0) @binding(4) var<uniform> params: Params;

@compute @workgroup_size(${tn}, ${tn}, 1)
fn main(@builtin(global_invocation_id) gid: vec3<u32>) {
  if (gid.x >= params.outputWidth || gid.y >= params.outputHeight || gid.z >= ${r}u) {
    return;
  }
  var acc = bias[gid.z];
  for (var ky = 0u; ky < 3u; ky++) {
    let inputY = i32(gid.y) + i32(ky) - 1;
    if (inputY < 0 || inputY >= i32(params.inputHeight)) { continue; }
    for (var kx = 0u; kx < 3u; kx++) {
      let inputX = i32(gid.x) + i32(kx) - 1;
      if (inputX < 0 || inputX >= i32(params.inputWidth)) { continue; }
      let pixelBase = (u32(inputY) * params.inputWidth + u32(inputX)) * ${i}u;
      for (var inputBlock = 0u; inputBlock < ${i}u; inputBlock++) {
        ${Ao("inputData[pixelBase + inputBlock]",`((((gid.z * 3u + ky) * 3u + kx) * ${i}u + inputBlock) * 4u)`,t)}
      }
    }
  }
  let outputIndex = (gid.y * params.outputWidth + gid.x) * ${r}u + gid.z;
  outputData[outputIndex] = ${l};
}
`}function ST(t,e,n,i,r){let o=nn(t),a=nn(t),c=nn(e),l=$n(gi("acc",n),e);return`${Wn(t)}
enable subgroups;
struct Params {
  inputWidth: u32,
  inputHeight: u32,
  outputWidth: u32,
  outputHeight: u32,
  inputBlocks: u32,
  outputBlocks: u32,
}
@group(0) @binding(0) var<storage, read> inputData: array<${o}>;
@group(0) @binding(1) var<storage, read> weights: array<${a}>;
@group(0) @binding(2) var<storage, read> bias: array<vec4<f32>>;
@group(0) @binding(3) var<storage, read_write> outputData: array<${c}>;
@group(0) @binding(4) var<uniform> params: Params;

@compute @workgroup_size(${tn}, ${tn}, 1)
fn main(@builtin(global_invocation_id) gid: vec3<u32>) {
  let outputInBounds =
    gid.x < params.outputWidth && gid.y < params.outputHeight;
  var acc = bias[gid.z];
  for (var ky = 0u; ky < 3u; ky++) {
    let inputY = i32(gid.y) + i32(ky) - 1;
    let clampedY = u32(clamp(inputY, 0, i32(params.inputHeight) - 1));
    for (var kx = 0u; kx < 3u; kx++) {
      let inputX = i32(gid.x) + i32(kx) - 1;
      let clampedX = u32(clamp(inputX, 0, i32(params.inputWidth) - 1));
      let inputInBounds =
        outputInBounds && inputX >= 0 && inputY >= 0 &&
        inputX < i32(params.inputWidth) && inputY < i32(params.inputHeight);
      let pixelBase =
        (clampedY * params.inputWidth + clampedX) * ${i}u;
      for (var inputBlock = 0u; inputBlock < ${i}u; inputBlock++) {
        ${vT(`select(${o}(0.0), inputData[pixelBase + inputBlock], inputInBounds)`,`((((gid.z * 3u + ky) * 3u + kx) * ${i}u + inputBlock) * 4u)`,t)}
      }
    }
  }
  if (outputInBounds) {
    let outputIndex =
      (gid.y * params.outputWidth + gid.x) * ${r}u + gid.z;
    outputData[outputIndex] = ${l};
  }
}
`}function TT(t,e,n,i,r){let o=nn(t),a=nn(e),c=$n(gi("acc",n),e),l=Rn*Rn*i,f=Rt*Rt;return`${Wn(t)}
struct Params {
  inputWidth: u32,
  inputHeight: u32,
  outputWidth: u32,
  outputHeight: u32,
  inputBlocks: u32,
  outputBlocks: u32,
}
@group(0) @binding(0) var<storage, read> inputData: array<${o}>;
@group(0) @binding(1) var<storage, read> weights: array<${o}>;
@group(0) @binding(2) var<storage, read> bias: array<vec4<f32>>;
@group(0) @binding(3) var<storage, read_write> outputData: array<${a}>;
@group(0) @binding(4) var<uniform> params: Params;

var<workgroup> inputPatch: array<${o}, ${l}>;

@compute @workgroup_size(${Rt}, ${Rt}, 1)
fn main(
  @builtin(local_invocation_id) localId: vec3<u32>,
  @builtin(workgroup_id) workgroupId: vec3<u32>
) {
  let localLinear =
    localId.y * ${Rt}u + localId.x;
  for (
    var loadIndex = localLinear;
    loadIndex < ${l}u;
    loadIndex += ${f}u
  ) {
    let patchPixel = loadIndex / ${i}u;
    let inputBlock = loadIndex % ${i}u;
    let patchX = patchPixel % ${Rn}u;
    let patchY = patchPixel / ${Rn}u;
    let inputX =
      i32(workgroupId.x * ${Rt}u + patchX) - 1;
    let inputY =
      i32(workgroupId.y * ${Rt}u + patchY) - 1;
    var value = ${o}(0.0);
    if (
      inputX >= 0 && inputX < i32(params.inputWidth) &&
      inputY >= 0 && inputY < i32(params.inputHeight)
    ) {
      let inputIndex =
        (u32(inputY) * params.inputWidth + u32(inputX)) *
        ${i}u + inputBlock;
      value = inputData[inputIndex];
    }
    inputPatch[loadIndex] = value;
  }
  workgroupBarrier();

  let outputX =
    workgroupId.x * ${Rt}u + localId.x;
  let outputY =
    workgroupId.y * ${Rt}u + localId.y;
  let outputBlock = workgroupId.z;
  if (
    outputX >= params.outputWidth || outputY >= params.outputHeight ||
    outputBlock >= ${r}u
  ) {
    return;
  }

  var acc = bias[outputBlock];
  for (var ky = 0u; ky < 3u; ky++) {
    for (var kx = 0u; kx < 3u; kx++) {
      let patchBase =
        ((localId.y + ky) * ${Rn}u + localId.x + kx) *
        ${i}u;
      for (var inputBlock = 0u; inputBlock < ${i}u; inputBlock++) {
        ${Ao("inputPatch[patchBase + inputBlock]",`((((outputBlock * 3u + ky) * 3u + kx) * ${i}u + inputBlock) * 4u)`,t)}
      }
    }
  }
  let outputIndex =
    (outputY * params.outputWidth + outputX) * ${r}u + outputBlock;
  outputData[outputIndex] = ${c};
}
`}function bT(t,e,n,i,r){let o=nn(t),a=nn(e),c=$n(gi("acc",n),e),l=wn*wn,f=zi*gn,p=gn*En*4;return`${Wn(t)}
struct Params {
  inputWidth: u32,
  inputHeight: u32,
  outputWidth: u32,
  outputHeight: u32,
  inputBlocks: u32,
  outputBlocks: u32,
}
@group(0) @binding(0) var<storage, read> inputData: array<${o}>;
@group(0) @binding(1) var<storage, read> weights: array<${o}>;
@group(0) @binding(2) var<storage, read> bias: array<vec4<f32>>;
@group(0) @binding(3) var<storage, read_write> outputData: array<${a}>;
@group(0) @binding(4) var<uniform> params: Params;

var<workgroup> inputTile: array<${o}, ${f}>;
var<workgroup> weightTile: array<${o}, ${p}>;

@compute @workgroup_size(${wn}, ${wn}, 1)
fn main(
  @builtin(local_invocation_id) localId: vec3<u32>,
  @builtin(workgroup_id) workgroupId: vec3<u32>
) {
  let spatialBase =
    workgroupId.x * ${zi}u +
    localId.y * ${en}u;
  let outputBlock =
    workgroupId.y * ${En}u + localId.x;
  let spatialCount = params.outputWidth * params.outputHeight;
  var acc: array<vec4<f32>, ${en}>;
  if (outputBlock < ${r}u) {
    for (var row = 0u; row < ${en}u; row++) {
      acc[row] = bias[outputBlock];
    }
  }

  let localLinear =
    localId.y * ${wn}u + localId.x;
  let totalK = ${i*9}u;
  for (var kBase = 0u; kBase < totalK; kBase += ${gn}u) {
    for (
      var loadIndex = localLinear;
      loadIndex < ${f}u;
      loadIndex += ${l}u
    ) {
      let tileSpatial = loadIndex / ${gn}u;
      let tileK = loadIndex % ${gn}u;
      let inputSpatialIndex =
        workgroupId.x * ${zi}u + tileSpatial;
      let kIndex = kBase + tileK;
      var value = ${o}(0.0);
      if (inputSpatialIndex < spatialCount && kIndex < totalK) {
        let outputY = inputSpatialIndex / params.outputWidth;
        let outputX = inputSpatialIndex % params.outputWidth;
        let inputBlock = kIndex % ${i}u;
        let kernelIndex = kIndex / ${i}u;
        let kernelY = kernelIndex / 3u;
        let kernelX = kernelIndex % 3u;
        let inputY = i32(outputY) + i32(kernelY) - 1;
        let inputX = i32(outputX) + i32(kernelX) - 1;
        if (
          inputY >= 0 && inputY < i32(params.inputHeight) &&
          inputX >= 0 && inputX < i32(params.inputWidth)
        ) {
          let inputIndex =
            (u32(inputY) * params.inputWidth + u32(inputX)) *
            ${i}u + inputBlock;
          value = inputData[inputIndex];
        }
      }
      inputTile[loadIndex] = value;
    }

    for (
      var loadIndex = localLinear;
      loadIndex < ${p}u;
      loadIndex += ${l}u
    ) {
      let tileK = loadIndex / ${En*4}u;
      let outputRemainder = loadIndex % ${En*4}u;
      let tileOutputBlock = outputRemainder / 4u;
      let outputLane = outputRemainder % 4u;
      let loadedOutputBlock =
        workgroupId.y * ${En}u + tileOutputBlock;
      let kIndex = kBase + tileK;
      var value = ${o}(0.0);
      if (loadedOutputBlock < ${r}u && kIndex < totalK) {
        let inputBlock = kIndex % ${i}u;
        let kernelIndex = kIndex / ${i}u;
        let kernelY = kernelIndex / 3u;
        let kernelX = kernelIndex % 3u;
        let weightIndex =
          ((((loadedOutputBlock * 3u + kernelY) * 3u + kernelX) *
            ${i}u + inputBlock) * 4u + outputLane);
        value = weights[weightIndex];
      }
      weightTile[loadIndex] = value;
    }

    workgroupBarrier();
    ${km(t)}
    workgroupBarrier();
  }

  if (outputBlock < ${r}u) {
    for (var row = 0u; row < ${en}u; row++) {
      let spatialIndex = spatialBase + row;
      if (spatialIndex < spatialCount) {
        let outputIndex = spatialIndex * ${r}u + outputBlock;
        outputData[outputIndex] = ${c.replaceAll("acc","acc[row]")};
      }
    }
  }
}
`}function ET(t,e,n,i){let r=nn(t),o=gi("acc",e);return`${Wn(t)}
struct Params {
  inputWidth: u32,
  inputHeight: u32,
  outputWidth: u32,
  outputHeight: u32,
  inputBlocks: u32,
  outputBlocks: u32,
}
@group(0) @binding(0) var<storage, read> inputData: array<${r}>;
@group(0) @binding(1) var<storage, read> weights: array<${r}>;
@group(0) @binding(2) var<storage, read> bias: array<vec4<f32>>;
@group(0) @binding(3) var<storage, read_write> outputData: array<${r}>;
@group(0) @binding(4) var<uniform> params: Params;

@compute @workgroup_size(${tn}, ${tn}, 1)
fn main(@builtin(global_invocation_id) gid: vec3<u32>) {
  if (gid.x >= params.outputWidth || gid.y >= params.outputHeight || gid.z >= ${i}u) {
    return;
  }
  var pooled = vec4<f32>(-3.402823466e+38);
  for (var py = 0u; py < 2u; py++) {
    let centerY = gid.y * 2u + py;
    if (centerY >= params.inputHeight) { continue; }
    for (var px = 0u; px < 2u; px++) {
      let centerX = gid.x * 2u + px;
      if (centerX >= params.inputWidth) { continue; }
      var acc = bias[gid.z];
      for (var ky = 0u; ky < 3u; ky++) {
        let inputY = i32(centerY) + i32(ky) - 1;
        if (inputY < 0 || inputY >= i32(params.inputHeight)) { continue; }
        for (var kx = 0u; kx < 3u; kx++) {
          let inputX = i32(centerX) + i32(kx) - 1;
          if (inputX < 0 || inputX >= i32(params.inputWidth)) { continue; }
          let pixelBase = (u32(inputY) * params.inputWidth + u32(inputX)) * ${n}u;
          for (var inputBlock = 0u; inputBlock < ${n}u; inputBlock++) {
            ${Ao("inputData[pixelBase + inputBlock]",`((((gid.z * 3u + ky) * 3u + kx) * ${n}u + inputBlock) * 4u)`,t)}
          }
        }
      }
      pooled = max(pooled, ${o});
    }
  }
  let outputIndex = (gid.y * params.outputWidth + gid.x) * ${i}u + gid.z;
  outputData[outputIndex] = ${$n("pooled",t)};
}
`}function yT(t,e){let n=nn(t);return`${Wn(t)}
struct Params {
  inputWidth: u32,
  inputHeight: u32,
  outputWidth: u32,
  outputHeight: u32,
  outputBlocks: u32,
}
@group(0) @binding(0) var<storage, read> inputData: array<${n}>;
@group(0) @binding(1) var<storage, read_write> outputData: array<${n}>;
@group(0) @binding(2) var<uniform> params: Params;

@compute @workgroup_size(${tn}, ${tn}, 1)
fn main(@builtin(global_invocation_id) gid: vec3<u32>) {
  if (
    gid.x >= params.outputWidth ||
    gid.y >= params.outputHeight ||
    gid.z >= ${e}u
  ) {
    return;
  }
  var pooled = vec4<f32>(-3.402823466e+38);
  for (var py = 0u; py < 2u; py++) {
    let inputY = gid.y * 2u + py;
    if (inputY >= params.inputHeight) { continue; }
    for (var px = 0u; px < 2u; px++) {
      let inputX = gid.x * 2u + px;
      if (inputX >= params.inputWidth) { continue; }
      let inputIndex =
        (inputY * params.inputWidth + inputX) * ${e}u + gid.z;
      pooled = max(pooled, vec4<f32>(inputData[inputIndex]));
    }
  }
  let outputIndex =
    (gid.y * params.outputWidth + gid.x) * ${e}u + gid.z;
  outputData[outputIndex] = ${$n("pooled",t)};
}
`}function MT(t,e,n,i,r){let o=nn(t),a=n[0]+n[1],c=$n(gi("acc[row]",e),t),l=wn*wn,f=zi*gn,p=gn*En*4,u=(s,h)=>`
          {
            let sourceBlock = ${h};
            let sourceX = ${s===i?"u32(inputX) / 2u":"u32(inputX)"};
            let sourceY = ${s===i?"u32(inputY) / 2u":"u32(inputY)"};
            let sourceIndex =
              (sourceY * params.source${s}Width + sourceX) *
              ${n[s]}u + sourceBlock;
            value = input${s}[sourceIndex];
          }`;return`${Wn(t)}
struct Params {
  outputWidth: u32,
  outputHeight: u32,
  outputBlocks: u32,
  inputBlocks: u32,
  source0Width: u32,
  source0Height: u32,
  source1Width: u32,
  source1Height: u32,
}
@group(0) @binding(0) var<storage, read> input0: array<${o}>;
@group(0) @binding(1) var<storage, read> input1: array<${o}>;
@group(0) @binding(2) var<storage, read> weights: array<${o}>;
@group(0) @binding(3) var<storage, read> bias: array<vec4<f32>>;
@group(0) @binding(4) var<storage, read_write> outputData: array<${o}>;
@group(0) @binding(5) var<uniform> params: Params;

var<workgroup> inputTile: array<${o}, ${f}>;
var<workgroup> weightTile: array<${o}, ${p}>;

@compute @workgroup_size(${wn}, ${wn}, 1)
fn main(
  @builtin(local_invocation_id) localId: vec3<u32>,
  @builtin(workgroup_id) workgroupId: vec3<u32>
) {
  let spatialBase =
    workgroupId.x * ${zi}u +
    localId.y * ${en}u;
  let outputBlock =
    workgroupId.y * ${En}u + localId.x;
  let spatialCount = params.outputWidth * params.outputHeight;
  var acc: array<vec4<f32>, ${en}>;
  if (outputBlock < ${r}u) {
    for (var row = 0u; row < ${en}u; row++) {
      acc[row] = bias[outputBlock];
    }
  }

  let localLinear =
    localId.y * ${wn}u + localId.x;
  let totalK = ${a*9}u;
  for (var kBase = 0u; kBase < totalK; kBase += ${gn}u) {
    for (
      var loadIndex = localLinear;
      loadIndex < ${f}u;
      loadIndex += ${l}u
    ) {
      let tileSpatial = loadIndex / ${gn}u;
      let tileK = loadIndex % ${gn}u;
      let outputSpatialIndex =
        workgroupId.x * ${zi}u + tileSpatial;
      let kIndex = kBase + tileK;
      var value = ${o}(0.0);
      if (outputSpatialIndex < spatialCount && kIndex < totalK) {
        let outputY = outputSpatialIndex / params.outputWidth;
        let outputX = outputSpatialIndex % params.outputWidth;
        let inputBlock = kIndex % ${a}u;
        let kernelIndex = kIndex / ${a}u;
        let kernelY = kernelIndex / 3u;
        let kernelX = kernelIndex % 3u;
        let inputY = i32(outputY) + i32(kernelY) - 1;
        let inputX = i32(outputX) + i32(kernelX) - 1;
        if (
          inputY >= 0 && inputY < i32(params.outputHeight) &&
          inputX >= 0 && inputX < i32(params.outputWidth)
        ) {
          if (inputBlock < ${n[0]}u) {
            ${u(0,"inputBlock")}
          } else {
            ${u(1,`inputBlock - ${n[0]}u`)}
          }
        }
      }
      inputTile[loadIndex] = value;
    }

    for (
      var loadIndex = localLinear;
      loadIndex < ${p}u;
      loadIndex += ${l}u
    ) {
      let tileK = loadIndex / ${En*4}u;
      let outputRemainder = loadIndex % ${En*4}u;
      let tileOutputBlock = outputRemainder / 4u;
      let outputLane = outputRemainder % 4u;
      let loadedOutputBlock =
        workgroupId.y * ${En}u + tileOutputBlock;
      let kIndex = kBase + tileK;
      var value = ${o}(0.0);
      if (loadedOutputBlock < ${r}u && kIndex < totalK) {
        let inputBlock = kIndex % ${a}u;
        let kernelIndex = kIndex / ${a}u;
        let kernelY = kernelIndex / 3u;
        let kernelX = kernelIndex % 3u;
        let weightIndex =
          ((((loadedOutputBlock * 3u + kernelY) * 3u + kernelX) *
            ${a}u + inputBlock) * 4u + outputLane);
        value = weights[weightIndex];
      }
      weightTile[loadIndex] = value;
    }

    workgroupBarrier();
    ${km(t)}
    workgroupBarrier();
  }

  if (outputBlock < ${r}u) {
    for (var row = 0u; row < ${en}u; row++) {
      let spatialIndex = spatialBase + row;
      if (spatialIndex < spatialCount) {
        let outputIndex = spatialIndex * ${r}u + outputBlock;
        outputData[outputIndex] = ${c};
      }
    }
  }
}
`}function AT(t,e,n,i,r){let o=nn(t),a=n[0]+n[1],c=(f,p)=>{let u=f===i;return`
      {
        let sourceX = ${u?"u32(inputX) / 2u":"u32(inputX)"};
        let sourceY = ${u?"u32(inputY) / 2u":"u32(inputY)"};
        let sourcePixelBase = (sourceY * params.source${f}Width + sourceX) * ${n[f]}u;
        for (var sourceBlock = 0u; sourceBlock < ${n[f]}u; sourceBlock++) {
          let inputBlock = ${p}u + sourceBlock;
          ${Ao(`input${f}[sourcePixelBase + sourceBlock]`,`((((gid.z * 3u + ky) * 3u + kx) * ${a}u + inputBlock) * 4u)`,t)}
        }
      }
`},l=$n(gi("acc",e),t);return`${Wn(t)}
struct Params {
  outputWidth: u32,
  outputHeight: u32,
  outputBlocks: u32,
  inputBlocks: u32,
  source0Width: u32,
  source0Height: u32,
  source1Width: u32,
  source1Height: u32,
}
@group(0) @binding(0) var<storage, read> input0: array<${o}>;
@group(0) @binding(1) var<storage, read> input1: array<${o}>;
@group(0) @binding(2) var<storage, read> weights: array<${o}>;
@group(0) @binding(3) var<storage, read> bias: array<vec4<f32>>;
@group(0) @binding(4) var<storage, read_write> outputData: array<${o}>;
@group(0) @binding(5) var<uniform> params: Params;

@compute @workgroup_size(${tn}, ${tn}, 1)
fn main(@builtin(global_invocation_id) gid: vec3<u32>) {
  if (gid.x >= params.outputWidth || gid.y >= params.outputHeight || gid.z >= ${r}u) {
    return;
  }
  var acc = bias[gid.z];
  for (var ky = 0u; ky < 3u; ky++) {
    let inputY = i32(gid.y) + i32(ky) - 1;
    if (inputY < 0 || inputY >= i32(params.outputHeight)) { continue; }
    for (var kx = 0u; kx < 3u; kx++) {
      let inputX = i32(gid.x) + i32(kx) - 1;
      if (inputX < 0 || inputX >= i32(params.outputWidth)) { continue; }
      ${c(0,0)}
      ${c(1,n[0])}
    }
  }
  let outputIndex = (gid.y * params.outputWidth + gid.x) * ${r}u + gid.z;
  outputData[outputIndex] = ${l};
}
`}function wT(t,e,n,i,r){let o=nn(t),a=n[0]+n[1],c=Rn*Rn*a,l=Rt*Rt,f=$n(gi("acc",e),t),p=(u,s)=>`
      let sourceBlock = ${s};
      let sourceIndex =
        (${u===i?"u32(inputY) / 2u":"u32(inputY)"} * params.source${u}Width + ${u===i?"u32(inputX) / 2u":"u32(inputX)"}) *
        ${n[u]}u + sourceBlock;
      value = input${u}[sourceIndex];`;return`${Wn(t)}
struct Params {
  outputWidth: u32,
  outputHeight: u32,
  outputBlocks: u32,
  inputBlocks: u32,
  source0Width: u32,
  source0Height: u32,
  source1Width: u32,
  source1Height: u32,
}
@group(0) @binding(0) var<storage, read> input0: array<${o}>;
@group(0) @binding(1) var<storage, read> input1: array<${o}>;
@group(0) @binding(2) var<storage, read> weights: array<${o}>;
@group(0) @binding(3) var<storage, read> bias: array<vec4<f32>>;
@group(0) @binding(4) var<storage, read_write> outputData: array<${o}>;
@group(0) @binding(5) var<uniform> params: Params;

var<workgroup> inputPatch: array<${o}, ${c}>;

@compute @workgroup_size(${Rt}, ${Rt}, 1)
fn main(
  @builtin(local_invocation_id) localId: vec3<u32>,
  @builtin(workgroup_id) workgroupId: vec3<u32>
) {
  let localLinear =
    localId.y * ${Rt}u + localId.x;
  for (
    var loadIndex = localLinear;
    loadIndex < ${c}u;
    loadIndex += ${l}u
  ) {
    let patchPixel = loadIndex / ${a}u;
    let inputBlock = loadIndex % ${a}u;
    let patchX = patchPixel % ${Rn}u;
    let patchY = patchPixel / ${Rn}u;
    let inputX =
      i32(workgroupId.x * ${Rt}u + patchX) - 1;
    let inputY =
      i32(workgroupId.y * ${Rt}u + patchY) - 1;
    var value = ${o}(0.0);
    if (
      inputX >= 0 && inputX < i32(params.outputWidth) &&
      inputY >= 0 && inputY < i32(params.outputHeight)
    ) {
      if (inputBlock < ${n[0]}u) {
        ${p(0,"inputBlock")}
      } else {
        ${p(1,`inputBlock - ${n[0]}u`)}
      }
    }
    inputPatch[loadIndex] = value;
  }
  workgroupBarrier();

  let outputX =
    workgroupId.x * ${Rt}u + localId.x;
  let outputY =
    workgroupId.y * ${Rt}u + localId.y;
  let outputBlock = workgroupId.z;
  if (
    outputX >= params.outputWidth || outputY >= params.outputHeight ||
    outputBlock >= ${r}u
  ) {
    return;
  }

  var acc = bias[outputBlock];
  for (var ky = 0u; ky < 3u; ky++) {
    for (var kx = 0u; kx < 3u; kx++) {
      let patchBase =
        ((localId.y + ky) * ${Rn}u + localId.x + kx) *
        ${a}u;
      for (var inputBlock = 0u; inputBlock < ${a}u; inputBlock++) {
        ${Ao("inputPatch[patchBase + inputBlock]",`((((outputBlock * 3u + ky) * 3u + kx) * ${a}u + inputBlock) * 4u)`,t)}
      }
    }
  }
  let outputIndex =
    (outputY * params.outputWidth + outputX) * ${r}u + outputBlock;
  outputData[outputIndex] = ${f};
}
`}function Gm(t,e){let n=nn(t),i=Array.from({length:e},(c,l)=>`@group(0) @binding(${l}) var<storage, read> input${l}: array<vec4<f32>>;`).join(`
`),r=Array.from({length:e},(c,l)=>{let f=l*3;return`if (channel < ${f+3}u) { return input${l}[pixel][channel - ${f}u]; }`}).join(`
  `),o=e,a=e+1;return`${Wn(t)}
struct Params {
  width: u32,
  height: u32,
  outputBlocks: u32,
  inputChannels: u32,
}
${i}
@group(0) @binding(${o}) var<storage, read_write> outputData: array<${n}>;
@group(0) @binding(${a}) var<uniform> params: Params;

fn readChannel(pixel: u32, channel: u32) -> f32 {
  ${r}
  return 0.0;
}

@compute @workgroup_size(${tn}, ${tn}, 1)
fn main(@builtin(global_invocation_id) gid: vec3<u32>) {
  if (gid.x >= params.width || gid.y >= params.height || gid.z >= params.outputBlocks) {
    return;
  }
  let pixel = gid.y * params.width + gid.x;
  let firstChannel = gid.z * 4u;
  let value = vec4<f32>(
    readChannel(pixel, firstChannel),
    readChannel(pixel, firstChannel + 1u),
    readChannel(pixel, firstChannel + 2u),
    readChannel(pixel, firstChannel + 3u)
  );
  outputData[pixel * params.outputBlocks + gid.z] = ${$n("value",t)};
}
`}function RT(t){return t.op==="concat"?t.inputs:t.op==="fusedUpsampleConcatConv2d"?t.inputs.map(e=>e.value):[t.input]}function Vm(t,e="auto"){let n=t.features.has("shader-f16");if(e==="fp16"&&!n)throw new Error("OIDN FP16 was requested but the GPUDevice does not have shader-f16 enabled");return e==="auto"?n?"fp16":"fp32":e}var Mo=class{_device;precision;kernelSetting;maxSpatialInputBlocks;subgroupsAvailable;_model;_packedConvs=new Map;_pipelineCache;_pipelinePromises;_executionCache=new Map;_retiredExecutions=new Set;_clock=0;_shapeCacheSize;_profileNextExecution=!1;_lastExecutionProfile;_profileOperations=0;_resources=new Nr;_disposed=!1;constructor(e,n,i={}){this._device=e;let r=hT(e);if(this._pipelineCache=r.ready,this._pipelinePromises=r.pending,this.precision=Vm(e,i.precision??"auto"),this.kernelSetting=i.kernel??"auto",this.subgroupsAvailable=e.features.has("subgroups"),this.maxSpatialInputBlocks=this.precision==="fp16"&&e.limits.maxComputeInvocationsPerWorkgroup>=Rt*Rt&&e.limits.maxComputeWorkgroupSizeX>=Rt&&e.limits.maxComputeWorkgroupSizeY>=Rt?Math.floor(e.limits.maxComputeWorkgroupStorageSize/(Rn*Rn*4*2)):0,this._shapeCacheSize=Math.max(1,i.shapeCacheSize??2),n.inputChannels%3!==0||n.inputChannels<3||n.inputChannels>9)throw new Error(`Native OIDN expects 3, 6, or 9 input channels, got ${n.inputChannels}`);this._model={spec:n.spec,inputChannels:n.inputChannels,outputChannels:n.outputChannels,channelsByValue:new Map(n.channelsByValue),convChannels:new Map(n.convChannels)};for(let o of Eo(this._model,{fuseConvPool:!1}).nodes)if(o.op!=="conv2d"&&o.op!=="maxPool2d"&&o.op!=="fusedConvReluMaxPool2d"&&o.op!=="fusedUpsampleConcatConv2d")throw new Error(`Native OIDN descriptor ${n.spec.id} leaves unsupported ${o.op} node ${o.id} after graph optimization`);try{for(let[o,a]of n.convTensors){let c=_T(e,o,a,this.precision);this._resources.track("gpu-buffer",c.weights),this._resources.track("gpu-buffer",c.bias),this._packedConvs.set(o,c)}}catch(o){for(let a of this._packedConvs.values())this._releaseBuffer(a.weights),this._releaseBuffer(a.bias);throw this._packedConvs.clear(),o}}_pipeline(e,n){let i=this._pipelineCache.get(e);return i||(i=this._device.createComputePipeline({label:`oidn/${e}`,layout:"auto",compute:{module:this._device.createShaderModule({label:`oidn/${e}`,code:n}),entryPoint:"main"}}),this._pipelineCache.set(e,i)),i}_pipelineAsync(e,n){let i=this._pipelineCache.get(e);if(i)return Promise.resolve(i);let r=this._pipelinePromises.get(e);if(r)return r;let o=this._device.createComputePipelineAsync({label:`oidn/${e}`,layout:"auto",compute:{module:this._device.createShaderModule({label:`oidn/${e}`,code:n}),entryPoint:"main"}}).then(a=>(this._pipelineCache.set(e,a),this._pipelinePromises.delete(e),a),a=>{throw this._pipelinePromises.delete(e),a});return this._pipelinePromises.set(e,o),o}_nodePipelineSpec(e,n){if(e.op==="conv2d"){let i=n?"fp32":this.precision,r=Lt(this._model.convChannels.get(e.id).inputChannels),o=Lt(this._model.convChannels.get(e.id).outputChannels),a=this._selectConvKernel(r,n);return{key:`conv-${a}/${this.precision}/${i}/${e.activation}/in${r}/out${o}`,kernel:a,code:a==="implicit-gemm"?bT(this.precision,i,e.activation,r,o):a==="spatial"?TT(this.precision,i,e.activation,r,o):a==="subgroup"?ST(this.precision,i,e.activation,r,o):xT(this.precision,i,e.activation,r,o)}}if(e.op==="maxPool2d"){let i=Lt(this._model.channelsByValue.get(e.id));return{key:`max-pool/${this.precision}/out${i}`,kernel:"direct",code:yT(this.precision,i)}}if(e.op==="fusedConvReluMaxPool2d"){let i=Lt(this._model.convChannels.get(e.conv.id).inputChannels),r=Lt(this._model.convChannels.get(e.conv.id).outputChannels);return{key:`conv-pool/${this.precision}/${e.conv.activation}/in${i}/out${r}`,kernel:"direct",code:ET(this.precision,e.conv.activation,i,r)}}if(e.op==="fusedUpsampleConcatConv2d"){if(e.inputs.length!==2)throw new Error(`Native fused decoder ${e.id} requires two inputs`);let i=e.inputs.map(p=>Lt(this._model.channelsByValue.get(p.value))),r=e.inputs.findIndex(p=>p.upsample);if(r!==0&&r!==1)throw new Error(`Native fused decoder ${e.id} has no upsample input`);let o=i[0]+i[1],a=this._selectConvKernel(o,!1),c=a==="subgroup"?"direct":a,l=Lt(this._model.convChannels.get(e.conv.id).outputChannels);return{key:`decoder-${c}/${this.precision}/${e.conv.activation}/${i.join("+")}/out${l}/up${r}`,kernel:c,code:c==="implicit-gemm"?MT(this.precision,e.conv.activation,i,r,l):c==="spatial"?wT(this.precision,e.conv.activation,i,r,l):AT(this.precision,e.conv.activation,i,r,l)}}throw new Error(`Native OIDN does not implement unfused ${e.op} node ${e.id}`)}_selectConvKernel(e,n){let i=this.precision==="fp16"&&e<=this.maxSpatialInputBlocks;return this.kernelSetting==="direct"?"direct":this.kernelSetting==="spatial"?i?"spatial":"direct":this.kernelSetting==="implicit-gemm"?n?"direct":"implicit-gemm":this.kernelSetting==="subgroup"?this.subgroupsAvailable?"subgroup":"direct":this.precision==="fp32"&&!n?"implicit-gemm":"direct"}_nodePipeline(e,n){let{key:i,code:r}=this._nodePipelineSpec(e,n);return this._pipeline(i,r)}async prepare(){if(this._disposed)throw new Error("Native OIDN executor is disposed");let e=Eo(this._model,{fuseConvPool:!1}),n=this._model.inputChannels/3,i=[{key:`pack/${this.precision}/${n}`,code:Gm(this.precision,n)},...e.nodes.map(r=>this._nodePipelineSpec(r,r.id===e.spec.output))];await Promise.all(i.map(({key:r,code:o})=>this._pipelineAsync(r,o)))}_createExecution(e,n){let i=Eu(this._model,e,n,{fuseConvPool:!1}),r=new Map,o=[],a=new Map;i.nodes.forEach((f,p)=>{for(let u of RT(f))a.set(u,p)}),a.set(i.spec.output,i.nodes.length);let c=[],l=f=>(c.push(f),this._resources.track("gpu-buffer",f));try{let f=(_,E,v,T)=>{for(let x of o)x.activeValue&&(a.get(x.activeValue)??-1)<T&&(x.activeValue=void 0);let M=mT(E,v),R=o.filter(x=>!x.activeValue&&x.capacity>=M).sort((x,A)=>x.capacity-A.capacity)[0];R||(R={buffer:l(this._device.createBuffer({label:`oidn/activation/${e}x${n}/${o.length}`,size:Mu(M,4),usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_SRC|GPUBufferUsage.COPY_DST})),capacity:M},o.push(R)),R.activeValue=_,r.set(_,R.buffer)};f(i.spec.input,i.inputShape,this.precision==="fp16"?2:4,-1),i.plannedNodes.forEach(({node:_,outputShape:E},v)=>{let T=_.id===i.spec.output;f(_.id,E,T||this.precision==="fp32"?4:2,v)});let p=this._model.inputChannels/3,u=`pack/${this.precision}/${p}`,s=this._pipeline(u,Gm(this.precision,p)),h=[],g=[],b=[],d=[];i.plannedNodes.forEach(({node:_,outputShape:E},v)=>{let T=_.id===i.spec.output,M=this._nodePipelineSpec(_,T),R=this._pipeline(M.key,M.code);h.push(R),g.push(M.kernel??"direct");let x=r.get(_.id),A,w,D;if(_.op==="conv2d"){let L=i.valueShapes.get(_.input);D=_.id,w=[L.width,L.height,E.width,E.height,Lt(L.channels),Lt(E.channels)];let I=this._packedConvs.get(D);A=[{binding:0,resource:{buffer:r.get(_.input)}},{binding:1,resource:{buffer:I.weights}},{binding:2,resource:{buffer:I.bias}},{binding:3,resource:{buffer:x}}]}else if(_.op==="maxPool2d"){let L=i.valueShapes.get(_.input);w=[L.width,L.height,E.width,E.height,Lt(E.channels)],A=[{binding:0,resource:{buffer:r.get(_.input)}},{binding:1,resource:{buffer:x}}]}else if(_.op==="fusedConvReluMaxPool2d"){let L=i.valueShapes.get(_.input);D=_.conv.id,w=[L.width,L.height,E.width,E.height,Lt(L.channels),Lt(E.channels)];let I=this._packedConvs.get(D);A=[{binding:0,resource:{buffer:r.get(_.input)}},{binding:1,resource:{buffer:I.weights}},{binding:2,resource:{buffer:I.bias}},{binding:3,resource:{buffer:x}}]}else if(_.op==="fusedUpsampleConcatConv2d"){D=_.conv.id;let L=i.valueShapes.get(_.inputs[0].value),I=i.valueShapes.get(_.inputs[1].value);w=[E.width,E.height,Lt(E.channels),Lt(this._model.convChannels.get(D).inputChannels),L.width,L.height,I.width,I.height];let B=this._packedConvs.get(D);A=[{binding:0,resource:{buffer:r.get(_.inputs[0].value)}},{binding:1,resource:{buffer:r.get(_.inputs[1].value)}},{binding:2,resource:{buffer:B.weights}},{binding:3,resource:{buffer:B.bias}},{binding:4,resource:{buffer:x}}]}else throw new Error(`Unexpected native node ${_.op}`);let C=l(Om(this._device,`oidn/${_.id}/params/${e}x${n}`,w));d.push(C),A.push({binding:A.length,resource:{buffer:C}}),b.push(this._device.createBindGroup({label:`oidn/${_.id}/bindings`,layout:R.getBindGroupLayout(0),entries:A}))});let m=l(Om(this._device,`oidn/input/params/${e}x${n}`,[e,n,Lt(this._model.inputChannels),this._model.inputChannels]));return d.push(m),{plan:i,valueBuffers:r,slots:o,nodeBindings:b,nodePipelines:h,nodeKernels:g,inputPipeline:s,inputUniform:m,ownedBuffers:d,lastUsed:++this._clock}}catch(f){for(let p of c)this._releaseBuffer(p);throw f}}_execution(e,n){if(this._disposed)throw new Error("Native OIDN executor is disposed");let i=`${e}x${n}`,r=this._executionCache.get(i);if(!r&&(r=this._createExecution(e,n),this._executionCache.set(i,r),this._executionCache.size>this._shapeCacheSize)){let o=[...this._executionCache.entries()].filter(([a])=>a!==i).sort((a,c)=>a[1].lastUsed-c[1].lastUsed)[0];o&&(this._executionCache.delete(o[0]),this._retiredExecutions.add(o[1]),this._device.queue.onSubmittedWorkDone().catch(()=>{}).then(()=>{this._retiredExecutions.delete(o[1]),this._destroyExecution(o[1])}))}return r.lastUsed=++this._clock,r}profileNextExecution(){return this._device.features.has("timestamp-query")?(this._profileNextExecution=!0,!0):!1}getLastExecutionProfile(){return this._lastExecutionProfile}execute(e,n,i){let r=this._model.inputChannels/3;if(e.length!==r)throw new Error(`Native OIDN expected ${r} input buffers, got ${e.length}`);let o=this._execution(n,i),a=["input-pack",...o.plan.nodes.map(g=>g.id)],c=this._profileNextExecution&&this._device.features.has("timestamp-query");this._profileNextExecution=!1;let l=a.length*2,f=c?this._resources.track("gpu-query-set",this._device.createQuerySet({type:"timestamp",count:l})):void 0,p=l*8,u,s;try{u=c?this._resources.track("gpu-buffer",this._device.createBuffer({label:`oidn/profile/resolve/${n}x${i}`,size:p,usage:GPUBufferUsage.QUERY_RESOLVE|GPUBufferUsage.COPY_SRC})):void 0,s=c?this._resources.track("gpu-buffer",this._device.createBuffer({label:`oidn/profile/readback/${n}x${i}`,size:p,usage:GPUBufferUsage.COPY_DST|GPUBufferUsage.MAP_READ})):void 0}catch(g){throw this._releaseBuffer(s),this._releaseBuffer(u),this._releaseQuerySet(f),g}let h=(g,b)=>({label:g,...f?{timestampWrites:{querySet:f,beginningOfPassWriteIndex:b*2,endOfPassWriteIndex:b*2+1}}:{}});try{let g=this._device.createCommandEncoder({label:`oidn/native/${n}x${i}`}),b=e.map((m,_)=>({binding:_,resource:{buffer:m}}));b.push({binding:r,resource:{buffer:o.valueBuffers.get(o.plan.spec.input)}}),b.push({binding:r+1,resource:{buffer:o.inputUniform}});let d=this._device.createBindGroup({label:"oidn/input/bindings",layout:o.inputPipeline.getBindGroupLayout(0),entries:b});{let m=g.beginComputePass(h("oidn/input-pack",0));m.setPipeline(o.inputPipeline),m.setBindGroup(0,d),m.dispatchWorkgroups(Math.ceil(n/tn),Math.ceil(i/tn),Lt(this._model.inputChannels)),m.end()}o.plan.plannedNodes.forEach(({node:m,outputShape:_},E)=>{let v=g.beginComputePass(h(`oidn/${o.plan.nodes[E].id}`,E+1));v.setPipeline(o.nodePipelines[E]),v.setBindGroup(0,o.nodeBindings[E]),o.nodeKernels[E]==="implicit-gemm"?v.dispatchWorkgroups(Math.ceil(_.width*_.height/zi),Math.ceil(Lt(_.channels)/En),1):v.dispatchWorkgroups(Math.ceil(_.width/tn),Math.ceil(_.height/tn),Lt(_.channels)),v.end()}),f&&(g.resolveQuerySet(f,0,l,u,0),g.copyBufferToBuffer(u,0,s,0,p)),this._device.queue.submit([g.finish()])}catch(g){throw this._releaseBuffer(s),this._releaseBuffer(u),this._releaseQuerySet(f),g}return f&&(this._profileOperations++,this._lastExecutionProfile=(async()=>{try{await s.mapAsync(GPUMapMode.READ);let g=new BigUint64Array(s.getMappedRange()),b=a.map((d,m)=>({id:d,durationMs:Number(g[m*2+1]-g[m*2])/1e6}));return{totalMs:b.reduce((d,m)=>d+m.durationMs,0),layers:b}}finally{s.mapState==="mapped"&&s.unmap(),this._releaseQuerySet(f),this._releaseBuffer(u),this._releaseBuffer(s),this._profileOperations--}})()),o.valueBuffers.get(o.plan.spec.output)}async executeCPU(e,n,i){let r=n*i*this._model.inputChannels;if(e.length!==r)throw new Error(`Native OIDN CPU input has ${e.length} values, expected ${r}`);let o=this._execution(n,i),a=this._model.inputChannels/3,c=n*i;o.cpuInputBuffers||(o.cpuInputBuffers=Array.from({length:a},(s,h)=>{let g=this._device.createBuffer({label:`oidn/cpu-input/${n}x${i}/${h}`,size:c*16,usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_DST});return this._resources.track("gpu-buffer",g),o.ownedBuffers.push(g),g}),o.cpuReadbackBuffer=this._device.createBuffer({label:`oidn/cpu-readback/${n}x${i}`,size:c*16,usage:GPUBufferUsage.COPY_DST|GPUBufferUsage.MAP_READ}),this._resources.track("gpu-buffer",o.cpuReadbackBuffer),o.ownedBuffers.push(o.cpuReadbackBuffer));for(let s=0;s<a;s++){let h=new Float32Array(c*4);for(let g=0;g<c;g++){let b=g*this._model.inputChannels+s*3,d=g*4;h[d]=e[b],h[d+1]=e[b+1],h[d+2]=e[b+2]}this._device.queue.writeBuffer(o.cpuInputBuffers[s],0,h)}let l=this.execute(o.cpuInputBuffers,n,i),f=this._device.createCommandEncoder({label:`oidn/cpu-readback/${n}x${i}`});f.copyBufferToBuffer(l,0,o.cpuReadbackBuffer,0,c*16),this._device.queue.submit([f.finish()]),await o.cpuReadbackBuffer.mapAsync(GPUMapMode.READ);let p=new Float32Array(o.cpuReadbackBuffer.getMappedRange()),u=new Float32Array(c*3);for(let s=0;s<c;s++)u[s*3]=p[s*4],u[s*3+1]=p[s*4+1],u[s*3+2]=p[s*4+2];return o.cpuReadbackBuffer.unmap(),u}_releaseBuffer(e){this._resources.release("gpu-buffer",e,()=>e.destroy())}_releaseQuerySet(e){this._resources.release("gpu-query-set",e,()=>e.destroy())}_destroyExecution(e){e.slots.forEach(n=>this._releaseBuffer(n.buffer)),e.ownedBuffers.forEach(n=>this._releaseBuffer(n))}getResourceInfo(){return this._resources.snapshot(this._retiredExecutions.size+this._profileOperations)}dispose(){if(!this._disposed){this._disposed=!0;for(let e of this._packedConvs.values())this._releaseBuffer(e.weights),this._releaseBuffer(e.bias);this._packedConvs.clear();for(let e of this._executionCache.values())this._destroyExecution(e);this._executionCache.clear();for(let e of this._retiredExecutions)this._destroyExecution(e);this._retiredExecutions.clear()}}};var zm=new WeakMap;function PT(t,e){let n=zm.get(t);n||(n=new Map,zm.set(t,n));let i=n.get(e);if(!i){let r=t.createShaderModule({label:`oidn/webnn/input-pack/${e}`,code:DT(e)}),o=t.createShaderModule({label:"oidn/webnn/output-unpack",code:LT()});i={input:t.createComputePipeline({label:`oidn/webnn/input-pack/${e}`,layout:"auto",compute:{module:r,entryPoint:"main"}}),output:t.createComputePipeline({label:"oidn/webnn/output-unpack",layout:"auto",compute:{module:o,entryPoint:"main"}})},n.set(e,i)}return i}var _i=8;function $m(t,e){return Math.ceil(t/e)*e}function CT(t,e,n,i){let r=t.createBuffer({label:e,size:$m(n.byteLength,4),usage:i,mappedAtCreation:!0});return new Uint8Array(r.getMappedRange()).set(new Uint8Array(n.buffer,n.byteOffset,n.byteLength)),r.unmap(),r}function Wm(t,e,n){let i=new Uint32Array($m(n.length,4));return i.set(n),CT(t,e,i,GPUBufferUsage.UNIFORM)}function Au(t,e,n,i){return!!t?.[e]?.[n]?.dataTypes?.includes?.(i)}function IT(t,e){if(e==="fp16"&&t.desc.dataType==="Float16")return new Uint8Array(t.data.buffer,t.data.byteOffset,t.data.byteLength);if(e==="fp32"&&t.desc.dataType==="Float32")return new Uint8Array(t.data.buffer,t.data.byteOffset,t.data.byteLength);let n=t.desc.dataType==="Float32"?new Float32Array(t.data.buffer,t.data.byteOffset,t.data.byteLength/4):new un(t.data.buffer,t.data.byteOffset,t.data.byteLength/2),i=e==="fp16"?new un(n):new Float32Array(n);return new Uint8Array(i.buffer,i.byteOffset,i.byteLength)}function DT(t){let e=Array.from({length:t},(i,r)=>`@group(0) @binding(${r}) var<storage, read> input${r}: array<vec4<f32>>;`).join(`
`),n=Array.from({length:t},(i,r)=>{let o=r*3;return`if (channel < ${o+3}u) {
      return input${r}[pixel][channel - ${o}u];
    }`}).join(`
  `);return`enable f16;
struct Params { width: u32, height: u32, channels: u32, padding: u32 }
${e}
@group(0) @binding(${t}) var<storage, read_write> outputData: array<f16>;
@group(0) @binding(${t+1}) var<uniform> params: Params;

fn readChannel(pixel: u32, channel: u32) -> f32 {
  ${n}
  return 0.0;
}

@compute @workgroup_size(${_i}, ${_i}, 1)
fn main(@builtin(global_invocation_id) gid: vec3<u32>) {
  if (gid.x >= params.width || gid.y >= params.height || gid.z >= params.channels) {
    return;
  }
  let pixel = gid.y * params.width + gid.x;
  let outputIndex = (gid.z * params.height + gid.y) * params.width + gid.x;
  outputData[outputIndex] = f16(readChannel(pixel, gid.z));
}
`}function LT(){return`enable f16;
struct Params { width: u32, height: u32, padding0: u32, padding1: u32 }
@group(0) @binding(0) var<storage, read> inputData: array<f16>;
@group(0) @binding(1) var<storage, read_write> outputData: array<vec4<f32>>;
@group(0) @binding(2) var<uniform> params: Params;

@compute @workgroup_size(${_i}, ${_i}, 1)
fn main(@builtin(global_invocation_id) gid: vec3<u32>) {
  if (gid.x >= params.width || gid.y >= params.height) { return; }
  let pixel = gid.y * params.width + gid.x;
  let plane = params.width * params.height;
  outputData[pixel] = vec4<f32>(
    f32(inputData[pixel]),
    f32(inputData[plane + pixel]),
    f32(inputData[plane * 2u + pixel]),
    0.0
  );
}
`}function NT(t,e){if(e==="fp32")throw new Error("OIDN WebNN GPU interop currently requires FP16 exportable tensors");if(!t.features.has("shader-f16"))throw new Error("OIDN WebNN requires shader-f16 on the shared GPUDevice");return"fp16"}function UT(t,e,n){return n==="relu"?t.relu(e):e}var wo=class{_device;_model;precision;support;_context;_builderConstructor;_shapeCache=new Map;_shapePromises=new Map;_retiredExecutions=new Set;_pendingCreationCount=0;_shapeCacheSize;_clock=0;_inputPipeline;_outputPipeline;_resources=new Nr;_disposed=!1;constructor(e,n,i={}){this._device=e,this._model=n,this.precision=NT(e,i.precision??"auto"),this._shapeCacheSize=Math.max(1,i.shapeCacheSize??2),this.support={available:!1,fp16Conv:!1,gpuInterop:!1};let r=PT(e,n.inputChannels/3);this._inputPipeline=r.input,this._outputPipeline=r.output}async prepare(){if(this._disposed)throw new Error("OIDN WebNN executor is disposed");let e=globalThis.navigator?.ml,n=globalThis.MLGraphBuilder;if(!e?.createContext||typeof n!="function")throw this.support.reason="WebNN is not exposed by this browser",new Error(this.support.reason);this._builderConstructor=n;try{try{this._context=await e.createContext({deviceType:"gpu",powerPreference:"high-performance"})}catch{this._context=await e.createContext({deviceType:"gpu"})}if(this._resources.track("ml-context",this._context),this._disposed)throw new Error("OIDN WebNN executor is disposed");if(typeof this._context.createExportableTensor!="function"||typeof this._context.exportToGPU!="function")throw this.support.reason="WebNN WebGPU tensor interop is unavailable",new Error(this.support.reason);let i=this._context.opSupportLimits?.()??{};if(this.support.fp16Conv=Au(i,"conv2d","input","float16")&&Au(i,"conv2d","filter","float16")&&Au(i,"conv2d","output","float16"),!this.support.fp16Conv)throw this.support.reason="WebNN does not support FP16 conv2d",new Error(this.support.reason);let r,o;try{r=this._resources.track("ml-tensor",await this._context.createExportableTensor({dataType:"float16",shape:[4]},this._device)),o=this._resources.track("gpu-buffer",await this._context.exportToGPU(r)),this.support.gpuInterop=!0}catch(a){throw this.support.reason=`WebNN FP16 WebGPU interop failed: ${String(a)}`,new Error(this.support.reason)}finally{this._releaseBuffer(o),this._releaseTensor(r)}this.support.available=!0}catch(i){throw this._releaseContext(),i}}_constant(e,n){return e.constant({dataType:"float16",shape:[...n.desc.dims]},IT(n,this.precision))}async _createExecution(e,n){if(this._disposed)throw new Error("OIDN WebNN executor is disposed");let i=new this._builderConstructor(this._context),r=new Map,o=new Map;r.set(this._model.spec.input,i.input("input",{dataType:"float16",shape:[1,this._model.inputChannels,n,e]})),o.set(this._model.spec.input,[this._model.inputChannels,n,e]);for(let s of this._model.spec.nodes){let h,g;if(s.op==="conv2d"){let b=o.get(s.input),d=this._model.convTensors.get(s.id),m=i.conv2d(r.get(s.input),this._constant(i,d.weight),{bias:this._constant(i,d.bias),padding:[1,1,1,1],inputLayout:"nchw",filterLayout:"oihw"});h=UT(i,m,s.activation),g=[d.outputChannels,b[1],b[2]]}else if(s.op==="maxPool2d"){let b=o.get(s.input);h=i.maxPool2d(r.get(s.input),{windowDimensions:[2,2],strides:[2,2],padding:[0,b[1]%2,0,b[2]%2],layout:"nchw"}),g=[b[0],Math.ceil(b[1]/2),Math.ceil(b[2]/2)]}else if(s.op==="upsample2d"){let b=o.get(s.input);h=i.resample2d(r.get(s.input),{mode:"nearest-neighbor",axes:[2,3],scales:[2,2]}),g=[b[0],b[1]*2,b[2]*2]}else{let b=s.inputs.map(d=>o.get(d));if(b.some(d=>d[1]!==b[0][1]||d[2]!==b[0][2]))throw new Error(`WebNN concat ${s.id} has mismatched spatial shapes`);h=i.concat(s.inputs.map(d=>r.get(d)),1),g=[b.reduce((d,m)=>d+m[0],0),b[0][1],b[0][2]]}r.set(s.id,h),o.set(s.id,g)}let a,c,l,f,p,u;try{return a=this._resources.track("ml-graph",await i.build({output:r.get(this._model.spec.output)})),c=this._resources.track("ml-tensor",await this._context.createExportableTensor({dataType:"float16",shape:[1,this._model.inputChannels,n,e],writable:!0},this._device)),l=this._resources.track("ml-tensor",await this._context.createExportableTensor({dataType:"float16",shape:[1,this._model.outputChannels,n,e],readable:!0},this._device)),f=this._resources.track("gpu-buffer",this._device.createBuffer({label:`oidn/webnn/output/${e}x${n}`,size:e*n*4*4,usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_SRC|GPUBufferUsage.COPY_DST})),p=this._resources.track("gpu-buffer",Wm(this._device,`oidn/webnn/input/${e}x${n}`,[e,n,this._model.inputChannels])),u=this._resources.track("gpu-buffer",Wm(this._device,`oidn/webnn/output/${e}x${n}`,[e,n])),{graph:a,inputTensor:c,outputTensor:l,outputBuffer:f,inputUniform:p,outputUniform:u,width:e,height:n,lastUsed:++this._clock}}catch(s){throw this._releaseBuffer(u),this._releaseBuffer(p),this._releaseBuffer(f),this._releaseTensor(l),this._releaseTensor(c),this._releaseGraph(a),s}}async _execution(e,n){let i=`${e}x${n}`,r=this._shapeCache.get(i);if(!r){let o=this._shapePromises.get(i);o||(o=(async()=>{this._pendingCreationCount++;try{return await this._createExecution(e,n)}finally{this._pendingCreationCount--}})(),this._shapePromises.set(i,o));try{if(r=await o,this._disposed)throw this._destroyExecution(r),new Error("OIDN WebNN executor is disposed");this._shapeCache.set(i,r)}finally{this._shapePromises.get(i)===o&&this._shapePromises.delete(i)}if(this._shapeCache.size>this._shapeCacheSize){let a=[...this._shapeCache.entries()].filter(([c])=>c!==i).sort((c,l)=>c[1].lastUsed-l[1].lastUsed)[0];a&&(this._shapeCache.delete(a[0]),this._retireExecution(a[1]))}}return r.lastUsed=++this._clock,r}async prewarm(e){for(let n of e)await this._execution(n.width,n.height)}async execute(e,n,i){let r=this._model.inputChannels/3;if(e.length!==r)throw new Error(`OIDN WebNN expected ${r} input buffers, got ${e.length}`);let o=await this._execution(n,i),a=this._resources.track("gpu-buffer",await this._context.exportToGPU(o.inputTensor));try{let l=e.map((s,h)=>({binding:h,resource:{buffer:s}}));l.push({binding:r,resource:{buffer:a}}),l.push({binding:r+1,resource:{buffer:o.inputUniform}});let f=this._device.createBindGroup({label:"oidn/webnn/input-bindings",layout:this._inputPipeline.getBindGroupLayout(0),entries:l}),p=this._device.createCommandEncoder({label:"oidn/webnn/input-pack"}),u=p.beginComputePass();u.setPipeline(this._inputPipeline),u.setBindGroup(0,f),u.dispatchWorkgroups(Math.ceil(n/_i),Math.ceil(i/_i),this._model.inputChannels),u.end(),this._device.queue.submit([p.finish()])}finally{this._releaseBuffer(a)}this._context.dispatch(o.graph,{input:o.inputTensor},{output:o.outputTensor});let c=this._resources.track("gpu-buffer",await this._context.exportToGPU(o.outputTensor));try{let l=this._device.createBindGroup({label:"oidn/webnn/output-bindings",layout:this._outputPipeline.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:c}},{binding:1,resource:{buffer:o.outputBuffer}},{binding:2,resource:{buffer:o.outputUniform}}]}),f=this._device.createCommandEncoder({label:"oidn/webnn/output-unpack"}),p=f.beginComputePass();p.setPipeline(this._outputPipeline),p.setBindGroup(0,l),p.dispatchWorkgroups(Math.ceil(n/_i),Math.ceil(i/_i)),p.end(),this._device.queue.submit([f.finish()])}finally{this._releaseBuffer(c)}return o.outputBuffer}async executeCPU(e,n,i){let r=await this._execution(n,i),o=n*i,a=new un(o*this._model.inputChannels);for(let f=0;f<o;f++)for(let p=0;p<this._model.inputChannels;p++)a[p*o+f]=e[f*this._model.inputChannels+p];this._context.writeTensor(r.inputTensor,a),this._context.dispatch(r.graph,{input:r.inputTensor},{output:r.outputTensor});let c=new un(await this._context.readTensor(r.outputTensor)),l=new Float32Array(o*this._model.outputChannels);for(let f=0;f<o;f++)for(let p=0;p<this._model.outputChannels;p++)l[f*this._model.outputChannels+p]=c[p*o+f];return l}_destroyExecution(e){this._releaseGraph(e.graph),this._releaseTensor(e.inputTensor),this._releaseTensor(e.outputTensor),this._releaseBuffer(e.outputBuffer),this._releaseBuffer(e.inputUniform),this._releaseBuffer(e.outputUniform)}_retireExecution(e){this._retiredExecutions.add(e),this._device.queue.onSubmittedWorkDone().catch(()=>{}).then(()=>{this._retiredExecutions.delete(e),this._destroyExecution(e)})}_releaseBuffer(e){this._resources.release("gpu-buffer",e,()=>e.destroy())}_releaseTensor(e){this._resources.release("ml-tensor",e,()=>e.destroy())}_releaseGraph(e){this._resources.release("ml-graph",e,()=>e.destroy?.())}_releaseContext(){this._resources.release("ml-context",this._context,()=>this._context.destroy?.())}getResourceInfo(){return this._resources.snapshot(this._pendingCreationCount+this._retiredExecutions.size)}dispose(){if(!this._disposed){this._disposed=!0;for(let e of this._shapeCache.values())this._destroyExecution(e);this._shapeCache.clear();for(let e of this._retiredExecutions)this._destroyExecution(e);this._retiredExecutions.clear(),this._shapePromises.clear(),this._releaseContext()}}};function qm(t,e){return Math.ceil(t/e)*e}function Ms(t){return t.data instanceof GPUBuffer||t.data instanceof GPUTexture}var wu=class{_device;_tileWidth=0;_tileHeight=0;_tileOverlapX=0;_tileOverlapY=0;_aux;_hdr;_dataProcessGPU;_nativeExecutor;_webNNExecutor;_modelSpec;_inputChannels;_engine;_dynamicTileController;_lastExecution;constructor(e,n,i={}){this._aux=i.aux||!1,this._hdr=i.hdr||!1,this._engine=i.engine??"auto";let r=i.modelSpec??as(e),o=jl(e,r);this._modelSpec=o.spec,this._inputChannels=o.inputChannels;let a=this._aux?9:3;if(o.inputChannels!==a)throw new Error(`OIDN model expects ${o.inputChannels} input channels, but aux=${this._aux} provides ${a}`);this._dynamicTileController=new os(i.maxTileSize??512,i.dynamicTile),this._device=n.device,this._engine==="webnn"?this._webNNExecutor=new wo(this._device,o,{precision:i.precision}):this._nativeExecutor=new Mo(this._device,o,{precision:i.precision,kernel:i.kernel})}getDevice(){return this._device}async prepare(){if(this._webNNExecutor){await this._webNNExecutor.prepare();let e=qm(this._modelSpec.receptiveField/2,16),n=[this._dynamicTileController.tileSize,this._dynamicTileController.minTileSize];await this._webNNExecutor.prewarm([...new Set(n)].map(i=>({width:i+2*e,height:i+2*e})));return}await this._nativeExecutor.prepare()}getRuntimeInfo(){return{configuredEngine:this._engine,gpuEngine:this._webNNExecutor?"webnn":"wgsl",precision:(this._webNNExecutor??this._nativeExecutor).precision,kernel:this._nativeExecutor?{configured:this._nativeExecutor.kernelSetting,maxSpatialInputBlocks:this._nativeExecutor.maxSpatialInputBlocks,subgroupsAvailable:this._nativeExecutor.subgroupsAvailable}:void 0,webnn:this._webNNExecutor?.support,resources:(this._webNNExecutor??this._nativeExecutor).getResourceInfo(),model:this._modelSpec.id,modelFamily:this._modelSpec.family,inputChannels:this._inputChannels,dynamicTile:{enabled:this._dynamicTileController.enabled,currentTileSize:this._dynamicTileController.tileSize,minTileSize:this._dynamicTileController.minTileSize,maxTileSize:this._dynamicTileController.maxTileSize,targetTileTimeMs:this._dynamicTileController.targetTileTimeMs},lastExecution:this._lastExecution}}profileNextExecution(){return this._nativeExecutor?.profileNextExecution()??!1}getLastExecutionProfile(){return this._nativeExecutor?.getLastExecutionProfile()}_updateModel(e,n){let i=this._dynamicTileController.tileSize,r=Zl(e,i),o=Zl(n,i),a=qm(this._modelSpec.receptiveField/2,16),c=a,l=a;e<=i&&(c=0),n<=i&&(l=0);let f=Math.max(r,o),p=Math.max(c,l);r=f,o=f,c=p,l=p,(r!==this._tileWidth||o!==this._tileHeight||c!==this._tileOverlapX||l!==this._tileOverlapY)&&(this._tileWidth=r,this._tileHeight=o,this._tileOverlapX=c,this._tileOverlapY=l)}_getTileSizeWithOverlap(){return{width:this._tileWidth+2*this._tileOverlapX,height:this._tileHeight+2*this._tileOverlapY}}_processImageData(e,n,i,r){let o=e.data,a=o.length/4,c=this._aux?9:3,l=new Float32Array(a*c);if(n&&!i||i&&!n)throw new Error("Normal map and albedo map are both required");if(n&&i&&(n.width!==i.width||n.height!==i.height||e.width!==n.width||e.height!==n.height))throw new Error("Image size mismatch");let f=n?.data,p=i?.data;for(let u=0;u<o.length;u+=4){let s=u/4*c;for(let h=0;h<3;h++)r?l[s+h]=o[u+h]:l[s+h]=o[u+h]/255,f&&(l[s+h+3]=f[u+h]/255),p&&(l[s+h+6]=p[u+h]/255)}return l}_readTile(e,n,i,r){let o=new Float32Array(i.width*i.height*n);for(let a=0;a<i.height;a++)for(let c=0;c<i.width;c++){let l=((a+i.y)*r+(c+i.x))*n,f=(a*i.width+c)*n;for(let p=0;p<n;p++)o[f+p]=e[l+p]}return o}_writeTile(e,n,i,r,o,a){let{data:c,width:l}=e,f=i.x-n.x,p=i.y-n.y;for(let u=0;u<i.height;u++)for(let s=0;s<i.width;s++){let h=((u+p)*o+s+f)*3,g=((u+i.y)*l+(s+i.x))*4;for(let b=0;b<3;b++)a?c[g+b]=r[h+b]:c[g+b]=Math.min(Math.max(r[h+b]*255,0),255);e.data[g+3]=a?1:255}}async _executeTile(e,n,i,r,o,a,c,l,f){let p=this._aux?9:3,u=this._tileOverlapX,s=this._tileOverlapY,h=this._getTileSizeWithOverlap(),g={width:this._tileWidth,height:this._tileHeight},b=r>0?r*g.width-u:0,d=Math.min(b+h.width,a);b=Math.max(d-h.width,0);let m=o>0?o*g.height-s:0,_=Math.min(m+h.height,c);m=Math.max(_-h.height,0);let E=h.width,v=h.height,T=new br(b,m,E,v),M,R,x=1,A=this._device,w=this._dataProcessGPU;if(e instanceof Float32Array){let B=this._readTile(e,p,T,a);l&&(x=Mh({data:B,channels:p}),B=Ah({data:B,channels:p,inputScale:x})),R=await(this._webNNExecutor??this._nativeExecutor).executeCPU(B,E,v)}else{w||(w=this._dataProcessGPU=new rs(A,l)),w.setImageSize(a,c),w.setInputTile(T),r===0&&o===0&&w.copyInputDataToOutput(e.color);let{color:B,albedo:z,normal:W}=w.forward(e.color,this._aux?e.albedo:void 0,this._aux?e.normal:void 0,f);M=await(this._webNNExecutor??this._nativeExecutor).execute(this._aux?[B,z,W]:[B],E,v)}let D,C=Math.min(g.width,a),L=Math.min(g.height,c),I=new br(r*C,o*L,C,L);if(I.width=Math.min(I.width,a-I.x),I.height=Math.min(I.height,c-I.y),e instanceof Float32Array){l&&(R=wh({data:R,channels:3,inputScale:x})),this._writeTile(i,T,I,R,h.width,l);for(let B=0;B<L;B++)for(let z=0;z<C;z++){let W=(B*C+z)*4,ne=((B+I.y)*a+(z+I.x))*4;for(let K=0;K<4;K++)n.data[W+K]=i.data[ne+K]}}else w.setOutputTile(I,T),D=w.inverse(M,e.color);return D}tileExecute({color:e,albedo:n,normal:i,done:r,progress:o,denoiseAlpha:a}){if(this._aux&&(!n||!i))throw new Error("Normal map and albedo map are both required");if(!this._aux&&(n||i))throw new Error("Normal map and albedo map are not required");let c=e.width,l=e.height,f=this._dynamicTileController.tileSize,p=c>f||l>f;this._updateModel(c,l);let u=this._hdr||!1,s;Ms(e)||(s=this._processImageData(e,n,i,u));let h=this._tileWidth,g=this._tileHeight,b=Math.ceil(l/g),d=Math.ceil(c/h);function m(w,D){return u?{data:new Float32Array(w*D*4),width:w,height:D}:new ImageData(w,D)}let _=Ms(e)?void 0:m(c,l),E=Ms(e)?void 0:m(Math.min(h,c),Math.min(g,l)),v=!1,T=()=>typeof performance>"u"?Date.now():performance.now(),M=T(),R=[],x=w=>{typeof requestAnimationFrame>"u"?setTimeout(w,0):requestAnimationFrame(w)},A=async(w,D)=>{if(v)return;let C=T(),L=await this._executeTile(Ms(e)?{color:e.data,albedo:n?.data,normal:i?.data}:s,E,_,w,D,c,l,u,a);if(v)return;let I=_||{data:L,width:c,height:l};o?.(I,E,new br(w*h,D*g,h,g),w+D*d,d*b);let B=w+1<d||D+1<b,z=()=>{if(R.push(T()-C),!v)if(B)x(()=>{v||(w+1<d?A(w+1,D):D+1<b&&A(0,D+1))});else{let W=[...R].sort((ee,te)=>ee-te),ne=Math.floor(W.length/2),K=W.length%2?W[ne]:(W[ne-1]+W[ne])/2;this._lastExecution={width:c,height:l,tileWidth:h,tileHeight:g,tileCount:d*b,durationMs:T()-M,tileTimeMs:{min:W[0],median:K,mean:W.reduce((ee,te)=>ee+te,0)/W.length,max:W[W.length-1]}},p&&this._dynamicTileController.observe(R),r(I)}};Rh(this._device.queue).then(z)};return A(0,0),()=>{v=!0}}dispose(){this._dataProcessGPU?.dispose(),this._nativeExecutor?.dispose(),this._webNNExecutor?.dispose()}},Ym=wu;async function Km(){if(!navigator.gpu)throw new Error("WebGPU is not available");let t={powerPreference:"high-performance"},e=await navigator.gpu.requestAdapter(t);if(!e)throw new Error("No WebGPU adapter is available");let n={},i=[];e.features.has("timestamp-query")&&i.push("timestamp-query"),e.features.has("bgra8unorm-storage")&&i.push("bgra8unorm-storage"),e.features.has("shader-f16")&&i.push("shader-f16"),n.requiredFeatures=i;let r=e.limits;n.requiredLimits={maxComputeWorkgroupStorageSize:r.maxComputeWorkgroupStorageSize,maxComputeWorkgroupsPerDimension:r.maxComputeWorkgroupsPerDimension,maxStorageBufferBindingSize:r.maxStorageBufferBindingSize,maxBufferSize:r.maxBufferSize,maxComputeWorkgroupSizeX:r.maxComputeWorkgroupSizeX,maxComputeInvocationsPerWorkgroup:r.maxComputeInvocationsPerWorkgroup};let o=await e.requestDevice(n),a=e.info??await e.requestAdapterInfo?.();return Ru(o,a)}async function Ru(t,e){return{device:t,adapterInfo:e}}async function FT(t,e,n){let i=await(e?Ru(e.device,e.adapterInfo):Km()),r=mh(t),o=new Ym(r,i,n);return await o.prepare(),o}async function BT(t,e,n){return fetch(t).then(i=>i.arrayBuffer()).then(i=>FT(i,e,n))}export{Ol as GenerateMeshBVHWorker,ao as PhysicalCamera,Bl as WebGLPathTracer,Dt as WebGLRenderTarget,Qc as WebGLRenderer,BT as initUNetFromURL};
/*! Bundled license information:

three/build/three.module.js:
  (**
   * @license
   * Copyright 2010-2026 Three.js Authors
   * SPDX-License-Identifier: MIT
   *)
*/
