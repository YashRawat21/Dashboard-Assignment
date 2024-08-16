import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    "categories": [
      {
        "id": 1,
        "name": "CSPM Executive Dashboard",
        "widgets": [
          {
            "id": 101,
            "name": "Cloud Account",
            "text": "Random text for Widget 1"
          },
          {
            "id": 102,
            "name": "Cloud Account Risk Assessment",
            "text": "Random text for Widget 2"
          },
          
        ]
      },
      {
        "id": 2,
        "name": "CWPP Dashboard",
        "widgets": [
          {
            "id": 201,
            "name": "Top 5 Namespace Specific Alert",
            "text": "Random text for Widget 1"
          },
          {
            "id": 202,
            "name": "WorkLoad Alerts",
            "text": "Random text for Widget 1"
          }
        ]
      },
      {
        "id": 3,
        "name": "Registry Scan",
        "widgets": [
          {
            "id": 301,
            "name": "Image Risk Assessment",
            "text": "Random text for Widget 1"
          },
          {
            "id": 302,
            "name": "Image Security Issues",
            "text": "Random text for Widget 1"
          }
        ]
      }
    ]
  }
  
const dashboardSlice = createSlice({
    name:'dashboard',
    initialState,
    reducers:{
        addWidget:(state,action) => {
        const {categoryId,widget} = action.payload;
        const category = state.categories.find((category) => category.id === categoryId);
        category.widgets.push(widget)
        },
        removeWidget:(state,action) => {
            const {categoryId,widgetId} = action.payload;
            const category = state.categories.find((cat) => cat.id === categoryId)
            category.widgets = category.widgets.filter((w) => w.id !== widgetId);
        }
    }
})

export const {addWidget,removeWidget} = dashboardSlice.actions;
export default dashboardSlice.reducer;