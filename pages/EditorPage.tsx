import React from 'react';
import CvForm from '../components/CvForm';
import { CvData, PersonalInfo, CvSection } from '../types';

interface EditorPageProps {
  cvData: CvData;
  onUpdateField: (section: 'personalInfo', field: keyof PersonalInfo, value: string) => void;
  onAddEntry: (section: CvSection) => void;
  onRemoveEntry: (section: CvSection, id: string) => void;
  onMoveEntry: (section: CvSection, id: string, direction: 'up' | 'down') => void;
  onUpdateEntry: (section: CvSection, id: string, field: string, value: string) => void;
  onUpdateSummary: (value: string) => void;
  setCvData: (data: CvData | ((prev: CvData) => CvData)) => void;
}

const EditorPage: React.FC<EditorPageProps> = (props) => {
  return (
    <div className="animate-fade-in">
      <CvForm {...props} />
    </div>
  );
};

export default EditorPage;
