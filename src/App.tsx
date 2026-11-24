import { Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useAppStore } from './context/store';
import { initTouchSoundListener } from './utils/sound';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import FoodProduction from './pages/FoodProduction';
import FoodModuleDetail from './pages/FoodModuleDetail';
import Labs from './pages/Labs';
import FoodLab from './pages/FoodLab';
import Assessments from './pages/Assessments';
import Progress from './pages/Progress';
import Missions from './pages/Missions';
import Glossary from './pages/Glossary';

function App() {
  const theme = useAppStore((s) => s.theme);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  useEffect(() => {
    return initTouchSoundListener();
  }, []);

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/modules" element={<FoodProduction />} />
        <Route path="/modules/:id" element={<FoodModuleDetail />} />
        <Route path="/labs" element={<Labs />} />
        <Route path="/labs/:simId" element={<FoodLab />} />
        <Route path="/assessments" element={<Assessments />} />
        <Route path="/progress" element={<Progress />} />
        <Route path="/missions" element={<Missions />} />
        <Route path="/glossary" element={<Glossary />} />
        {/* legacy redirects */}
        <Route path="/food" element={<Navigate to="/modules" replace />} />
        <Route path="/food/:id" element={<FoodModuleDetail />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  );
}

export default App;
