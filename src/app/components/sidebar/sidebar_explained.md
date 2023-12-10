# Application Layout Documentation

## Overview

Your application's layout is managed by `SidebarWithHeader`, which includes a sidebar (`SidebarContent`), a mobile navigation bar (`MobileNav`), and a main content area. It uses Chakra UI for styling and responsiveness.

## Components and Their Functionality

### `SidebarContent`

- **Purpose**: Displays the sidebar with navigation links.
- **Responsiveness**:
  - `display={{ base: "full", md: 60 }}`: On small screens (`base`), it takes the full width. On medium (`md`) screens and larger, it has a fixed width.
  - `pos="fixed"`: The sidebar is fixed in position.
- **Visibility**:
  - Always visible on medium (`md`) screens and larger.
  - Hidden on smaller screens (`base`) due to `display={{ base: "none", md: "block" }}` in `SidebarWithHeader`.

### `NavItem`

- **Purpose**: Represents individual navigation items in the sidebar.
- **Functionality**: Renders a box with an icon and text, styled as a clickable item.

### `MobileNav`

- **Purpose**: Provides navigation controls for mobile screens.
- **Responsiveness**:
  - The menu icon (`IconButton` with `<FiMenu />`) is only visible on small screens (`base`) due to `display={{ base: "flex", md: "none" }}`.
- **Functionality**:
  - Contains a button to open the sidebar drawer on small screens.
  - Triggers `onOpen` from `useDisclosure` when the menu icon is clicked.

### `SidebarWithHeader`

- **Purpose**: Main layout component that combines the sidebar, mobile navigation, and main content area.
- **State Management (`useDisclosure`)**:
  - `isOpen`: Boolean state indicating if the sidebar drawer is open or closed.
  - `onOpen`: Function to set `isOpen` to true.
  - `onClose`: Function to set `isOpen` to false.
- **Functionality**:
  - Renders `SidebarContent` as a fixed sidebar on medium (`md`) screens and larger.
  - Uses the `Drawer` component to render the sidebar content on smaller screens. The drawer's visibility is controlled by `isOpen`.
  - Includes `MobileNav`, which provides a menu button to open the drawer on small screens.

## Behavior Based on Screen Size

- **Medium (`md`) Screens and Larger**:
  - `SidebarContent` is always visible as a fixed sidebar.
  - `MobileNav`'s menu icon is hidden.
- **Small Screens (`base`)**:
  - `SidebarContent` is hidden.
  - `MobileNav` displays a menu icon.
  - Clicking the menu icon opens the `Drawer`, which contains the `SidebarContent`.
  - Drawer's visibility is controlled by `isOpen` (managed by `useDisclosure`).

## Use of `useDisclosure`

- **Purpose**: Manages the open/close state of the sidebar drawer on small screens.
- **`onOpen`**: Called by the menu button in `MobileNav` to open the drawer.
- **`onClose`**: Used in two places:
  - In `SidebarContent`, likely tied to a close button within the drawer for closing it.
  - In the `Drawer` component, to close the drawer when the user clicks outside of it or on the overlay.

### Additional Notes on `useDisclosure`

- **Purpose**: `useDisclosure` is a custom hook provided by Chakra UI designed to simplify the management of open/close states for components such as modals, drawers, and tooltips.
- **Returns**: The hook returns an object with the following properties:
  - `isOpen`: A boolean state that indicates if the component is currently open (`true`) or closed (`false`).
  - `onOpen`: A function that sets `isOpen` to true, used to open the component.
  - `onClose`: A function that sets `isOpen` to false, used to close the component.
  - `onToggle`: A function that toggles the `isOpen` state between `true` and `false`.

#### Usage

- **Importing the Hook**:
  ```jsx
  import { useDisclosure } from "@chakra-ui/react";


#### Using the Hook in a Component

```jsx
const MyComponent = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button onClick={onOpen}>Open</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        {/* Modal Content */}
      </Modal>
    </>
  );
};

#### Handling Open/Close Events

- Use `onOpen` in buttons or other triggers to open the component.
- Use `onClose` in close buttons or overlay clicks to close the component.

#### Example

const MyDrawerComponent = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button onClick={onOpen}>Open Drawer</Button>
      <Drawer isOpen={isOpen} onClose={onClose} placement="left">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          {/* Rest of the drawer content */}
        </DrawerContent>
      </Drawer>
    </>
  );
};

In this example, clicking the "Open Drawer" button sets isOpen to true, displaying the drawer. The drawer can be closed by either clicking the DrawerCloseButton or the overlay outside the drawer, both of which call onClose, setting isOpen to false.
