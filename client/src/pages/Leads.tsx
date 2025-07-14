import React from 'react';
import { UserPlus, Plus } from 'lucide-react';

const Leads: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Leads</h1>
          <p className="text-gray-600">Track and nurture potential customers</p>
        </div>
        <button className="btn-primary">
          <Plus className="h-4 w-4 mr-2" />
          Add Lead
        </button>
      </div>
      
      <div className="card">
        <div className="text-center py-12">
          <UserPlus className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No leads yet</h3>
          <p className="text-gray-600">Start by adding your first lead to the CRM.</p>
        </div>
      </div>
    </div>
  );
};

export default Leads;