attribute vec2 a_pos;
uniform vec2 u_resolution;

void main() {
    vec2 clipSpace = (a_pos / u_resolution) * 2.0 - 1.0;
    gl_Position = vec4(clipSpace, 0.0, 1.0);
    // gl_Position = vec4(a_pos, 0, 1);
}