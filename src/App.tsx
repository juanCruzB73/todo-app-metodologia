import './App.css'
import { CreateUpdateTask } from './components/ui/modals/create-update-backlog/CreateUpdateTask';
import { CreateUpdate } from './components/ui/modals/create-update-sprint/CreateUpdate';
import { AppRouter } from './routes/AppRouter';
import { popUpStore } from './store/PopUpsStore';

export const App = ()=> {
  
  const popUps = popUpStore((state)=>(state.popUps));
  
  return (
    <>
      <AppRouter/>
      <CreateUpdate modalStatus={popUps[1].popUpState} />
      <CreateUpdateTask modalStatus={popUps[2].popUpState}/>
    </>
  )
}