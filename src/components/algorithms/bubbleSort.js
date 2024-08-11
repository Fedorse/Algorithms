import { sleep } from '../../utils/sleep';
import { pause } from '../../utils/pause';

export const bubbleSort = async (
    array,
    updateArray,
    setActiveIndex,
    setCompareIndex,
    evalStateRef,
    speedRef,
    playerStateRef,
    trackRef
) => {
    let arr = [...array];
    let count = 0;
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length - i - 1; j++) {
            await pause(evalStateRef, playerStateRef, trackRef, speedRef);

            if (evalStateRef.current === 'notStarted') {
                throw new Error('cancelSort');
            }

            if (arr[j + 1] < arr[j]) {
                setActiveIndex(j);
                setCompareIndex(j + 1);

                let tmp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = tmp;
                updateArray([...arr]);
                await sleep(100, speedRef.current);
            }
        }
    }
    setActiveIndex(null);
    setCompareIndex(null);
};
