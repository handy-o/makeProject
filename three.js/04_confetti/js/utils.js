export const randomNumBetween = (min, max) => {
    // min과 max를 받아서 최대/최소 값을 반환
    return Math.random() * (max - min) + min
}

// hex값을 rgb로 전환해주는 함수
export function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null
}