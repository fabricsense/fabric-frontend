# Measurement Sheet - Lead Creation Form Changes

## TLDR

Modified the Lead creation form to display only specific measurement-related fields instead of the default dynamic form. Created a new modal component (`LeadModalNew.vue`) with a custom form layout while preserving the original `LeadModal.vue` component.

## Changes Summary

### 1. Created New Lead Modal Component
- **File**: `frontend/src/components/Modals/LeadModalNew.vue`
- **Purpose**: Custom lead creation form with measurement-specific fields

### 2. Form Fields Implemented

The new form displays only the following fields in a two-column layout:

**Left Column:**
- **Series** (required) - Select dropdown with option: `MS-.YYYY.-.####`
- **Customer** (required) - Link field to Customer doctype
- **Services Required** - Select dropdown with options: "Delivery" and "Fitting"

**Right Column:**
- **Status** - Select dropdown (uses existing lead statuses)
- **Measurement Date** (required) - DatePicker that defaults to current date
- **Measurement Method** (required) - Select dropdown with options: "Customer Provided" and "Contractor Assigned"
- **Sales Person** - Link field to User doctype, defaults to signed-in user

### 3. Field Defaults & Behavior
- **Measurement Date**: Automatically set to current date when form opens
- **Sales Person**: Automatically populated with the signed-in user's username
- **Series**: Pre-configured select field with single option `MS-.YYYY.-.####`
- **Status**: Uses existing lead status options from the system

### 4. Validation
The form validates the following required fields:
- Series
- Customer
- Measurement Date
- Measurement Method

### 5. Component Structure
- **Original Component**: `LeadModal.vue` - Reverted to original state using dynamic `FieldLayout`
- **New Component**: `LeadModalNew.vue` - Custom form with static fields
- **Integration**: Updated `Leads.vue` to use `LeadModalNew` when Create button is clicked

### 6. Files Modified
1. `frontend/src/components/Modals/LeadModalNew.vue` - Created (new file)
2. `frontend/src/components/Modals/LeadModal.vue` - Reverted to original
3. `frontend/src/pages/Leads.vue` - Updated to import and use `LeadModalNew`

## Technical Details

- Uses Vue 3 Composition API
- Form controls from `frappe-ui` (FormControl, DatePicker, Link, etc.)
- Two-column grid layout for field organization
- Maintains existing validation and error handling patterns
- Preserves original LeadModal for potential future use

