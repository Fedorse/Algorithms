import { useCallback } from 'react';

import { usePlayer, useHistory, useAlgorithm } from './hooks';

import { disableScroll } from './utils/disableScroll';

import BarContainer from './components/BarContainer/BarContainer';
import Player from './components/Player/Player';

const App = () => {
  const history = useHistory();

  const player = usePlayer();
  const {
    array,
    algorithmState,
    selectedAlgorithm,
    selectAlgorithm,
    resetAll,
    runAlgorithm,
    getCurrentStep,
  } = useAlgorithm({ history, player });

  // Handles Play button
  const handleAlgorithmRun = useCallback(async () => {
    if (algorithmState === 'notStarted') {
      await runAlgorithm();
    } else if (algorithmState === 'finished') {
      return resetAll();
    }

    if (player.playerState === 'play') {
      player.setPlayerState('pause');
    } else if (player.playerState === 'pause') {
      player.setPlayerState('play');
    }
  }, [player, runAlgorithm, resetAll, algorithmState]);

  // refactor - use CSS instead of JS logic  (hint: media queries, dvh units)
  disableScroll();

  const step = getCurrentStep();
  console.log(step);

  return (
    <section>
      <span className="title-algorithm">{selectedAlgorithm} Sort</span>
      <BarContainer {...step} />
      <Player
        selectAlgorithm={selectAlgorithm}
        goToNextStep={() => player.setPlayerState('forward')}
        goToPreviousStep={() => player.setPlayerState('backward')}
        speed={player.speed}
        resetAlgorithm={resetAll}
        setSpeed={(speed) => player.setSpeed(speed)}
        handleAlgorithmRun={handleAlgorithmRun}
        selectedAlgorithm={selectedAlgorithm}
        currentTrack={history.currentTrack}
        algorithmState={algorithmState}
        playerState={player.playerState}
      />
    </section>
  );
};

export default App;
