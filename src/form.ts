import '@vaadin/form-layout';
import '@vaadin/password-field';
import '@vaadin/text-field';
import '@vaadin/vertical-layout';
import '@vaadin/multi-select-combo-box';
import { html, LitElement, TemplateResult } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import type { FormLayoutResponsiveStep } from '@vaadin/form-layout';
import { buttonStyles } from './form-style.js';
import '@vaadin/email-field';
import '@vaadin/date-picker';
import '@vaadin/radio-group';
import '@vaadin/checkbox';
import '@vaadin/checkbox-group';
import '@vaadin/select';
import '@vaadin/combo-box';
import '@vaadin/button';
import '@vaadin/grid';
import '@vaadin/context-menu';
import '@vaadin/text-area';
import { columnBodyRenderer } from '@vaadin/grid/lit.js';
import type { ContextMenuItem } from '@vaadin/context-menu';
import '@vaadin/dialog';  // Added dialog import
import { DialogOpenedChangedEvent } from '@vaadin/dialog'; // Import type for dialog opened event
import '@vaadin/vaadin-lumo-styles/all-imports.js';
import '@vaadin/horizontal-layout';
import '@vaadin/icon';
import '@vaadin/notification';
import { dialogHeaderRenderer, dialogRenderer } from '@vaadin/dialog/lit.js';
import '@vaadin/vaadin-lumo-styles/vaadin-iconset';

@customElement('form-layout-basic')
export class Example extends LitElement {
  static styles = [buttonStyles];

  @state() fullName = '';
  @state() email = '';
  @state() password = '';
  @state() dob = '';
  @state() gender = '';
  @state() languages: string[] = [];
  @state() qualification = '';
  @state() college: string[] = [];
  @state() showAlert: boolean = false;
  @state() errorMsg: string = '';
  @state() users: User[] = [];
  @state() private currentUserId: string | null = null; // Track current user being edited
  @state()
  private actions: ContextMenuItem[] = [
    { text: 'View' },
    { text: 'Edit' },
    { text: 'Delete', className: 'text-error' },
  ];
  @state() private showUserDialog: boolean = false;
  @state() private viewUserData: User | null = null;

  @state()
  private dialogOpened = false;
  
  private responsiveSteps: FormLayoutResponsiveStep[] = [
    { minWidth: 0, columns: 1 },
    { minWidth: '500px', columns: 2 },
  ];

  @state()
  private university = ['SRM', 'SaiRam', 'Vins', 'St.joseph'];

  @state()
  private items = [
    { label: 'BE', value: 'BE' },
    { label: 'BA', value: 'BA' },
    { label: 'BTech', value: 'BTech' },
    { label: 'MBA', value: 'MBA' },
    { label: 'ME', value: 'ME' },
  ];

  protected override render() {
    return html`
      <div class="row">
        <div class="col-1">
          <h2>Registration Form</h2>

          <vaadin-form-layout .responsiveSteps="${this.responsiveSteps}">
            <vaadin-vertical-layout theme="spacing padding">
              <!-- Form Fields -->
              <vaadin-text-field
                label="Full name"
                clear-button-visible
                 .value="${this.fullName}"
                @change="${(e: Event) => {
                  this.fullName = (e.target as HTMLInputElement).value;
                }}"
              ></vaadin-text-field>

              <vaadin-email-field
                label="Email address"
                name="email"
                clear-button-visible
                .value="${this.email}"
                @change="${(e: Event) => {
                  this.email = (e.target as HTMLInputElement).value;
                }}"
              ></vaadin-email-field>

              <vaadin-password-field
                label="Password"
                placeholder="Password (min. 7 characters)"
                .value="${this.password}"
                @change="${(e: Event) => {
                  this.password = (e.target as HTMLInputElement).value;
                }}"
              ></vaadin-password-field>

              <vaadin-date-picker
                label="Date Of Birth"
                .value="${this.dob}"
                @change="${(e: Event) => {
                  this.dob = (e.target as HTMLInputElement).value;
                }}"
              ></vaadin-date-picker>

              <vaadin-radio-group
                label="Gender"
                theme="vertical"
                .value="${this.gender}"
                @value-changed="${(e: Event) => {
                  this.gender = (e.target as HTMLInputElement).value;
                }}"
              >
                <vaadin-radio-button value="Male" label="Male"></vaadin-radio-button>
                <vaadin-radio-button value="Female" label="Female"></vaadin-radio-button>
                <vaadin-radio-button value="Other" label="Other"></vaadin-radio-button>
              </vaadin-radio-group>

              <vaadin-checkbox-group
                theme="vertical"
                label="Languages Known"
                .value="${this.languages}"
                @value-changed="${(e: Event) => {
                  this.languages = (e.target as any).value;
                }}"
              >
                <vaadin-checkbox value="English" label="English"></vaadin-checkbox>
                <vaadin-checkbox value="Tamil" label="Tamil"></vaadin-checkbox>
                <vaadin-checkbox value="Hindi" label="Hindi"></vaadin-checkbox>
                <vaadin-checkbox value="Malayalam" label="Malayalam"></vaadin-checkbox>
              </vaadin-checkbox-group>

              <vaadin-select
                label="Qualification"
                .items="${this.items}"
                .value="${this.qualification}"
                @value-changed="${(e: Event) => {
                  this.qualification = (e.target as HTMLInputElement).value;
                }}"
              ></vaadin-select>

              <vaadin-multi-select-combo-box
                label="College"
                .items="${this.university}"
                .selectedItems="${this.college}"
                @selected-items-changed="${(e: any) => {
    this.college = e.detail.value || []; // Ensure selectedItems is always an array
  }}"
              ></vaadin-multi-select-combo-box>

              <vaadin-button
                @click="${(e: Event) => this.handleFormSubmit(e)}"
                class="register"
                >${this.currentUserId ? 'Update' : 'Register'}</vaadin-button
              >
            </vaadin-vertical-layout>
          </vaadin-form-layout>
        </div>

        <div class="col-2">
          <vaadin-grid .items="${this.users}" theme="row-stripes">
            <!-- Grid columns for displaying users -->
            <vaadin-grid-column path="fullname" header="Full Name"></vaadin-grid-column>
            <vaadin-grid-column path="email" header="Email"></vaadin-grid-column>
            <vaadin-grid-column path="dob" header="Date of Birth"></vaadin-grid-column>
            <vaadin-grid-column path="gender" header="Gender"></vaadin-grid-column>
            <vaadin-grid-column path="languages" header="Languages"></vaadin-grid-column>
            <vaadin-grid-column path="qualification" header="Qualification"></vaadin-grid-column>
            <vaadin-grid-column path="college" header="College"></vaadin-grid-column>

            <!-- Actions Column -->
            <vaadin-grid-column
              ${columnBodyRenderer(
                (user: User) =>
                  html`
                    <vaadin-context-menu
                      .items="${this.actions}"
                      open-on="click"
                      @item-selected="${(e: CustomEvent) => {
                        const selectedAction = e.detail.value;
                        if (selectedAction.text === 'Edit') {
                          this.editUser(user.id);
                        } else if (selectedAction.text === 'Delete') {
                          this.deleteUser(user.id);
                        } else if(selectedAction.text==='View'){
                         this.viewUser(user);
                        }
                      }}"
                    >
                      <vaadin-button>Actions</vaadin-button>
                    </vaadin-context-menu>
                  `,
                [],
              )}
            ></vaadin-grid-column>
          </vaadin-grid>
        </div>
      </div>

      <vaadin-dialog
        header-title="User details"
        .opened="${this.dialogOpened}"
        @opened-changed="${(event: DialogOpenedChangedEvent) => {
          this.dialogOpened = event.detail.value;
        }}"
        ${dialogHeaderRenderer(
          () => html`
            <vaadin-button theme="tertiary" @click="${this.close}">
              <vaadin-icon icon="lumo:cross"></vaadin-icon>
            </vaadin-button>
          `,
          []
        )}
        ${dialogRenderer(this.renderDialog, this.users)}
      ></vaadin-dialog>
      

    `;
  }

  private renderDialog = () => html`
  <vaadin-vertical-layout
    theme="spacing"
    style="width: 300px; max-width: 100%; align-items: stretch;"
  >
  <vaadin-vertical-layout style="align-items: stretch;">
      <vaadin-text-field
        label="Name"
        value="${this.viewUserData?.fullname || ''}"  <!-- Use viewUserData -->
        readonly
        style="padding-top: 0;"
      ></vaadin-text-field>
      <vaadin-email-field
        label="Email"
        value="${this.viewUserData?.email || ''}"  <!-- Use viewUserData -->
        readonly
      ></vaadin-email-field>
      <vaadin-text-area
        label="Languages Known"
        value="${this.viewUserData?.languages.join(', ') || ''}"  <!-- Join the languages into a string -->
        readonly
        style="padding-top: 0;"
      ></vaadin-text-area>
      
      <!-- Display Colleges -->
      <vaadin-text-area
        label="Colleges"
        value="${this.viewUserData?.college.join(', ') || ''}"  <!-- Join the colleges into a string -->
        readonly
        style="padding-top: 0;"
      ></vaadin-text-area>
    </vaadin-vertical-layout>
  </vaadin-vertical-layout>
`;
  
  private editUser(id: string) {
    this.currentUserId = id; // Set the current user ID for editing
    
    fetch(`http://localhost:4000/users1/${id}`)
      .then((response) => response.json())
      .then((user: any) => {
        console.log('Fetched User:', user); 

        function formatDate(date: string | number | Date) {
          const d = new Date(date);
          if (!isNaN(d.getTime())) {
            return d.toISOString().split('T')[0]; // 'yyyy-MM-dd'
          }
          return ''; 
        }
  
         // Log the user data
        // Populate the form with user data
       // this.fullName = user[0].fullname;    //We are fetching values from values from user array if the response is in array
        this.fullName = user.fullname;
        this.email = user.email;
        this.password = user.password; // You can handle password differently if needed
        this.dob = formatDate(user.dob);
        this.gender = user.gender;
        this.languages = user.languages;
        this.qualification = user.qualification;
          this.college = Array.isArray(user.college) ? user.college : [];
     this.requestUpdate();
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
      });
  }

  private handleFormSubmit(e: Event) {
    e.preventDefault();
    const formData = {
      fullname: this.fullName,
      email: this.email,
      password: this.password,
      dob: this.dob,
      gender: this.gender,
      languages: this.languages,
      qualification: this.qualification,
      college: this.college,
    };

    const requestUrl = this.currentUserId
      ? `http://localhost:4000/users/${this.currentUserId}`
      : 'http://localhost:4000/register';
    const method = this.currentUserId ? 'PUT' : 'POST';

    fetch(requestUrl, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.ok) {
          alert('User saved successfully!');
          this.loadUsers();
          this.resetForm();
          this.currentUserId = null; // Clear the currentUserId after submission
        } else {
          alert('Error saving user data');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  private resetForm() {
    this.fullName = '';
    this.email = '';
    this.password = '';
    this.dob = '';
    this.gender = '';
    this.languages = [];
    this.qualification = '';
    this.college = [];
  }

  private loadUsers() {
    fetch('http://localhost:4000/users')
      .then((response) => response.json())
      .then((users) => {
        this.users = users;
      })
      .catch((error) => {
        console.error('Error fetching users:', error);
      });
  }

  firstUpdated() {
    this.loadUsers();
  }

  private deleteUser(id: string) {
    fetch(`http://localhost:4000/users/${id}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (response.ok) {
          this.loadUsers();
        } else {
          alert('Error deleting user');
        }
      })
      .catch((error) => {
        console.error('Error deleting user:', error);
      });
  }

  private viewUser(user: User) {
    this.viewUserData = user; // Set the user data for viewing
    this.dialogOpened = true; // Open the dialog
  }

  // private open() {
  //   this.dialogOpened = true;
  // }

  private close() {
    this.dialogOpened = false;
  }
}

interface User {
  id: string;
  fullname: string;
  password: string;
  email: string;
  dob: string;
  gender: string;
  languages: string[];
  qualification: string;
  college: string[];
}
