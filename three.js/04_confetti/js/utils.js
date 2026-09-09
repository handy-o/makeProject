export const randomNumBetween = (min, max) => {
    // min과 max를 받아서 최대/최소 값을 반환
    return Math.random() * (max - min) + min
}