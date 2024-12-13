import { css } from "lit";

export const buttonStyles = css`
  vaadin-form-layout{
    width:100%;
    margin-left: 15px;
    margin-top:30px;  
    background-color: white;
    padding-left:10px;
    padding-top:20px;
    padding-bottom:20px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  }
  vaadin-text-field{
    width:200%;
   
  }
  vaadin-password-field{
    width:200%;
   
  }
  vaadin-email-field{
    width:200%;

  }
  vaadin-date-picker{
    width:200%;

  }
  vaadin-select{
    width:200%;

  }

   h2 {
   text-align:center;
    margin-bottom: 20px;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  }
  vaadin-multi-select-combo-box {
  width: 200%; /* Default width for smaller screens */
}

@media (max-width: 1100px) {
  vaadin-multi-select-combo-box,vaadin-select,vaadin-date-picker, vaadin-text-field, vaadin-password-field,vaadin-email-field, .register{
    width: 100% 
  }
}
@media (min-width: 1101px) {
  .register{
width:200%;
  }
}

  vaadin-button{
    text-align:center;
    background-color: #4caf50;
    color: white;
    border: none;
    padding: 10px 10px;
    border-radius: 4px;
    cursor: pointer; 
  }
  vaadin-button:hover{
    background-color: #45a049;
  }

  .row {
    margin-top: 30px;
    display: flex;
    //justify-content: space-between; /* Ensures space between the two columns */
    gap: 20px;
    flex-wrap: nowrap; /* Prevent wrapping of columns */
  }
  .col-1 {
    width: 48%; /* Adjusted width to fit side by side */
  }
  .col-2{
    width: 48%;
    margin-top:77px;
    margin-left:25px;

  }
  vaadin-grid{
    overflow: auto;
  }
 
  `;