import { sleep } from "../../utils/sleep";
import { pause } from "../../utils/pause";

export const selectionSort = async (array, setArray, setActiveIndex, setCompareIndex, speed, evalStateRef) => {
    let arr = [...array];
    let count = 0;

    for (let i = 0; i < arr.length; i++) {
        let indexMin = i;
        setActiveIndex(indexMin);

        for (let j = i + 1; j < arr.length; j++) {
            await pause(evalStateRef)

            if (evalStateRef.current === 'notStarted') {
                throw new Error('cancelSort')
            }

            setCompareIndex(j);
            await sleep(speed);

            if (arr[j] < arr[indexMin]) {
                indexMin = j;
                setActiveIndex(indexMin);
            }

            count += 1;
        }

        let tmp = arr[i];
        arr[i] = arr[indexMin];
        arr[indexMin] = tmp;

        setArray([...arr]);

        setCompareIndex(null);
    }
};
