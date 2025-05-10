precision mediump float;

varying vec2 vTextureCoord;
uniform sampler2D uSampler;
uniform vec3 bottomColor;
uniform vec3 upperColor;
uniform vec3 newBottomColor;
uniform vec3 newUpperColor;

vec4 changeColor(vec3 originalColor, vec3 newColor){
	vec4 currentColor = texture2D(uSampler, vTextureCoord);
	vec3 colorDiff = originalColor - (currentColor.rgb / max(currentColor.a, 0.0000000001));
	float colorDistance = length(colorDiff);
	float doReplace = step(colorDistance, 0.65); // Tolerance
	return vec4(mix(currentColor.rgb, (newColor - colorDiff) * currentColor.a, doReplace), currentColor.a);
}

void main(void) {
	vec4 currentColor = texture2D(uSampler, vTextureCoord);
	vec3 mixed_color = mix(newUpperColor, newBottomColor, vTextureCoord.y * 1.8);
	vec4 newGradient = changeColor(upperColor, mixed_color);
	gl_FragColor = newGradient;
}