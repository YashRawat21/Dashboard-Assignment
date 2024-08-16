import React, { useState } from 'react';
import { Chart } from "react-google-charts";
import { VscGraph } from "react-icons/vsc";
import LinearChart from './ui/LinearChart';
import LinearChart2 from './ui/LinearChart2';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import { IoMdClose } from "react-icons/io";
import { TiDelete } from "react-icons/ti";
import { useDispatch, useSelector } from 'react-redux';
import { addWidget, removeWidget } from '../utils.js/dashboardSlice';

export const chartData = [
  ["Task", "Hours per Day"],
  ["Connected", 50],
  ["Not Connected", 50]
];

export const chartOptions = {
  title: "Cloud Accounts",
};

export const chartData2 = [
  ["Task", "Hours per Day"],
  ["failed", 20],
  ["Warning", 10],
  ["Not Available", 2],
  ["passed", 80],
];

export const chartOptions2 = {
  title: "Cloud Account Risk Assessment",
};

const Dashboard = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(1); // Default to CSPM category
    const [widgetName, setWidgetName] = useState(''); // State for new widget name
    const [widgetText, setWidgetText] = useState(''); // State for new widget text
    const [searchTerm, setSearchTerm] = useState(''); // State for search input
    const dispatch = useDispatch();
    const categories = useSelector((state) => state.dashboard.categories);

    const handleCheckboxChange = (categoryId, widgetId, isChecked) => { 
        if (!isChecked) {
            dispatch(removeWidget({ categoryId, widgetId })); 
        }
    };
    
    const toggleDrawer = (open) => (event) => {
      if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
        return;
      }
      setDrawerOpen(open);
    };

    const handleCategoryChange = (categoryId) => {
      setSelectedCategory(categoryId);
    };

    const handleRemoveWidget = (categoryId, widgetId) => {
        dispatch(removeWidget({ categoryId, widgetId }));
    };

    const handleAddWidget = () => {
        if (widgetName && widgetText) {
            const newWidget = {
                id: Date.now(), // Temporary ID or use a more robust method to generate unique IDs
                name: widgetName,
                text: widgetText,
            };
            dispatch(addWidget({ categoryId: selectedCategory, widget: newWidget }));
            setWidgetName(''); // Clear input fields after adding
            setWidgetText('');
            setDrawerOpen(false); // Close drawer after adding
        }
    };

    const drawerList = () => {
      const category = categories.find(cat => cat.id === selectedCategory);
      return (
        <div>
          <div className='flex justify-between items-center p-2 bg-blue-800 text-white'>
            <h2>Add Widget</h2> 
            <IoMdClose onClick={toggleDrawer(false)} />
          </div>
          <div className='pt-4 pl-3'>
            <h3>Personalize your dashboard by adding the following widgets:</h3>
            <div>
              <ul className='flex gap-8 mt-3'>
                {categories.map(cat => (
                  <li 
                    key={cat.id}
                    className={`font-bold cursor-pointer ${cat.id === selectedCategory ? 'text-blue-600' : ''}`}
                    onClick={() => handleCategoryChange(cat.id)}
                  >
                    {cat.name.split(' ')[0]}
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-4">
              <input 
                type="text" 
                placeholder="Search Widgets..." 
                value={searchTerm} 
                onChange={(e) => setSearchTerm(e.target.value)} 
                className="block w-full p-2 border mb-4"
              />
            </div>
            <div className="mt-4">
              {category.widgets
                .filter(widget => widget.name.toLowerCase().includes(searchTerm.toLowerCase())) // Filter based on search term
                .map(widget => (
                  <div key={widget.id} className="flex items-center mb-2">
                    <input 
                      type="checkbox" 
                      id={`widget-${widget.id}`} 
                      className="mr-2"   
                      checked={true} 
                      onChange={(e) => handleCheckboxChange(category.id, widget.id, e.target.checked)}
                    />
                    <label htmlFor={`widget-${widget.id}`} className="flex-grow">{widget.name}</label>
                    <TiDelete 
                      onClick={() => handleRemoveWidget(category.id, widget.id)} 
                      className="text-red-600 cursor-pointer"
                      title="Remove Widget"
                    />
                  </div>
              ))}
            </div>
            <div className="mt-4">
              <input 
                type="text" 
                placeholder="Widget Name" 
                value={widgetName} 
                onChange={(e) => setWidgetName(e.target.value)} 
                className="block w-full p-2 border mb-4"
              />
              <input 
                type="text" 
                placeholder="Widget Text" 
                value={widgetText} 
                onChange={(e) => setWidgetText(e.target.value)} 
                className="block w-full p-2 border mb-4"
              />
              <button 
                onClick={handleAddWidget} 
                className="bg-blue-600 text-white p-2 rounded"
              >
                Add Widget
              </button>
            </div>
          </div>
        </div>
      );
    };

    return (
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6">CNAPP Dashboard</h1>
        {categories.map(category => (
          <div key={category.id} className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">{category.name}</h2>
            <div className="flex flex-wrap gap-6">
              {category.widgets.map((widget) => (
                <div 
                  key={widget.id} 
                  className="flex-1 w-64 h-60 p-4 bg-white shadow-lg rounded-lg border border-gray-200 relative"
                >
                  <TiDelete 
                    onClick={() => handleRemoveWidget(category.id, widget.id)} 
                    className="absolute top-2 right-2 text-red-600 cursor-pointer"
                    title="Remove Widget"
                  />
                  <h3 className="text-xl font-medium mb-2">{widget.name}</h3>
                  <p className="text-gray-700 mb-4">{widget.text}</p> {/* Display widget text here */}
                  {(widget.name === "Top 5 Namespace Specific Alert" || widget.name === "WorkLoad Alerts") && (
                    <>
                      <VscGraph className="m-auto mt-14 text-3xl text-gray-600" />
                      <p className='ml-24 mt-0'>No graph data available!</p>
                    </>
                  )}
                  {widget.name === "Cloud Account" && (
                    <Chart
                      chartType="PieChart"
                      data={chartData}
                      options={chartOptions}
                      width={"100%"}
                      height={"100px"}
                    />
                  )}
                  {widget.name === "Cloud Account Risk Assessment" && (
                    <Chart
                      chartType="PieChart"
                      data={chartData2}
                      options={chartOptions2}
                      width={"100%"}
                      height={"120px"}
                    />
                  )}
                  {widget.name === 'Image Risk Assessment' && (
                    <LinearChart className="overflow-hidden"/>
                  )}
                  {widget.name === 'Image Security Issues' && (
                    <LinearChart2  className="overflow-hidden"/>
                  )}
                </div>
              ))}
              <button
                onClick={toggleDrawer(true)}
                className="flex-1 w-64 p-4 bg-gray-100 shadow-lg rounded-lg border border-dashed border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-200"
              >
                + Add Widget
              </button>
            </div>
          </div>
        ))}
        <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)} sx={{ '& .MuiDrawer-paper': { width: '450px' } }}>
          {drawerList()}
        </Drawer>
      </div>
    );
}

export default Dashboard;
