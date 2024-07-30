
import { useEffect, useRef, useState } from "react"
import { generateRandomArray } from "./utils/generateRandomArray"
import { selectionSort } from "./components/algorithms/selectionSort"
import { quickSort } from "./components/algorithms/quickSort"
import Button from "./components/Button/Button"
import Array from "./components/Array/Array"
import { bubbleSort } from './components/algorithms/bubbleSort'
import Select from "./components/Select/Select"
import { insertionSort } from "./components/algorithms/insertionSort"

// type AlgState = 'started' | 'notStarted' | 'paused' | 'finished'

const useAlgorithmState = () => {
    const [array, setArray] = useState(generateRandomArray(10, 100, 700))
    const [selectedAlgorithm, setSelectedAlgorithm] = useState('selection')
    const [activeIndex, setActiveIndex] = useState(null)
    const [compareIndex, setCompareIndex] = useState(null)
    const [pivotIndex, setPivotIndex] = useState(null)


    const resetArray = () => {
        setArray(generateRandomArray(10, 100, 700));
        setActiveIndex(null);
        setCompareIndex(null)
        setPivotIndex(null)
    }

    const resetTracking = () => {
        setActiveIndex(null);
        setCompareIndex(null)
        setPivotIndex(null)
    }

    return {
        array,
        selectedAlgorithm,
        activeIndex,
        compareIndex,
        pivotIndex,
        resetArray,
        resetTracking,
        setArray,
        setSelectedAlgorithm,
        setActiveIndex,
        setCompareIndex,
        setPivotIndex
    }
}

const useEvaluationState = () => {
    const [evalState, setEvalState] = useState('notStarted')
    const [speed, setSpeed] = useState(100)

    const evalStateRef = useRef(evalState)

    useEffect(() => {
        evalStateRef.current = evalState
    }, [evalState])

    return {
        speed,
        evalState,
        evalStateRef,
        setSpeed,
        setEvalState
    }
}

const App = () => {
    const {
        array,
        selectedAlgorithm,
        activeIndex,
        compareIndex,
        pivotIndex,
        setArray,
        resetArray,
        resetTracking,
        setSelectedAlgorithm,
        setActiveIndex,
        setCompareIndex
    } = useAlgorithmState()
    const { speed, evalState, evalStateRef, setSpeed, setEvalState } = useEvaluationState()

    const handleAlgorithmRun = async () => {
        if (evalState === 'notStarted') {
            await handleSort()
        } else if (evalState === 'started') {
            setEvalState('paused')
        } else if (evalState === 'paused') {
            setEvalState('started')
        } else {
            resetArray()
            await handleSort()
        }
    }

    const handleSort = async () => {

        try {
            setEvalState('started')

            if (selectedAlgorithm === 'selection') {
                await selectionSort(array, setArray, setActiveIndex, setCompareIndex, speed, evalStateRef)
            } else if (selectedAlgorithm === 'bubble') {
                // await bubbleSort(array, setArray, setActiveIndex, setCompareIndex, cancelSort, speed)
            }
            // else if (selectedAlgorithm === 'quick') {
            //     await quickSort(array, setActiveIndex, setArray, setPivotIndex, setCompareIndex, cancelSort, speed);
            // } else if (selectedAlgorithm === 'insertion') {
            //     await insertionSort(array, setArray, setActiveIndex, setCompareIndex, cancelSort, speed)
            // }

            setEvalState('finished')
            resetTracking()
        } catch (e) {
            resetTracking()
        }
    }

    const barWidth = window.screen.width / array.length;

    const getButtonText = () => {
        if (evalState === 'notStarted') {
            return 'start'
        } else if (evalState === 'started') {
            return 'pause'
        } else if (evalState === 'paused') {
            return 'resume'
        } else {
            return 'reset and start'
        }
    }

    const resetAlgorithm = () => {
        setEvalState('notStarted')
        resetArray()
        resetTracking()
    }

    const selectAlogirthm = (newAlgorithm) => {
        resetTracking()
        setEvalState('notStarted')
        setSelectedAlgorithm(newAlgorithm)
    }

    return (
        <section>
            <Select selectedAlgorithm={selectedAlgorithm} onChange={selectAlogirthm} />
            <Button onClick={resetAlgorithm}>
                Update array
            </Button>
            <Button onClick={handleAlgorithmRun}>
                {getButtonText()}
            </Button>
            <input type="range" id="speed" min={0.10} max={10} step={0.10} onChange={e => setSpeed(e.target.value)} />
            <label htmlFor="speed">Speed</label>
            <h3>Speed: {speed}</h3>

            <Array
                array={array}
                activeIndex={activeIndex}
                barWidth={barWidth}
                compareIndex={compareIndex}
                pivotIndex={pivotIndex} />
        </section>
    )
}

export default App