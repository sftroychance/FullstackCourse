# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh


# PEDAC
Enter a country name into a search field.
if more than 10 countries match the entry, indicate too many matches
if between 2 and 10 countries match the entry, show their names
if 1 country matches the entry, show a subset of the country data

Components
Search field with label
  - onChange event handler
Result component
  - conditional rendering for:
    - too many matches
    - country list component
    - country details component
Country list component
  - child component; country list item
Country list item
Country details component

Page load:
useEffect to retrieve all country data; save country names as state
render search component
render result component (empty)

App component:
state: searchField
state: countryList
state: searchResult
state: selectedCountry
event handler: handleSearchResult
useEffect: load countryList, initial render only

countriesAPI module:
get all countries
get one country
