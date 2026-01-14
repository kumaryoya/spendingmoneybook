# Planning Guide

A magical allowance tracker that helps users record their spending and savings with the whimsy and delight of a Disney experience.

**Experience Qualities**: 
1. **Magical** - Every interaction should feel enchanting and special, like stepping into a Disney park
2. **Playful** - The interface should be fun and lighthearted, encouraging users to engage with their finances joyfully
3. **Clear** - Despite the whimsy, information should be easy to read and understand at a glance

**Complexity Level**: Light Application (multiple features with basic state)
This is a straightforward CRUD application for tracking allowance entries with a focus on delightful presentation and smooth interactions.

## Essential Features

### Add Allowance Entry
- **Functionality**: Users can record a new transaction with date/time, amount, and optional memo
- **Purpose**: Track all income and expenses in one place
- **Trigger**: Click the "Add Entry" button with sparkle icon
- **Progression**: Click add button → Dialog opens with form → Fill in date/time, amount (positive for income, negative for expense), memo → Submit → Entry appears in list with animation
- **Success criteria**: Entry is saved to persistent storage and appears in the list immediately

### View Entry List
- **Functionality**: Display all entries in chronological order with visual distinction between income and expenses
- **Purpose**: See spending/saving history at a glance
- **Trigger**: Automatic on app load
- **Progression**: App loads → Entries fetch from storage → List renders with staggered animation
- **Success criteria**: All entries display with correct formatting and visual styling

### Edit Entry
- **Functionality**: Modify existing entries
- **Purpose**: Correct mistakes or update information
- **Trigger**: Click edit icon on an entry
- **Progression**: Click edit → Dialog opens with pre-filled form → Modify fields → Submit → Entry updates in list
- **Success criteria**: Changes persist and display immediately

### Delete Entry
- **Functionality**: Remove entries from the list
- **Purpose**: Clean up mistakes or unwanted records
- **Trigger**: Click delete icon on an entry
- **Progression**: Click delete → Confirmation dialog → Confirm → Entry fades out and removes
- **Success criteria**: Entry is removed from storage and UI

### Balance Display
- **Functionality**: Show total balance (sum of all entries)
- **Purpose**: Quick overview of current financial status
- **Trigger**: Automatic calculation
- **Progression**: Entries load → Calculate sum → Display with animation on change
- **Success criteria**: Balance updates accurately when entries change

## Edge Case Handling
- **Empty State**: Show encouraging message with sparkles when no entries exist yet
- **Invalid Amounts**: Prevent submission of non-numeric amounts with helpful validation
- **Missing Required Fields**: Disable submit button until date and amount are filled
- **Large Numbers**: Format with commas for readability (e.g., ¥1,000,000)
- **Long Memos**: Truncate with ellipsis and show full text on hover or expand

## Design Direction
The design should evoke the magical, optimistic feeling of classic Disney animation - think soft curves, gentle gradients, warm colors, and delightful micro-interactions that make every action feel special.

## Color Selection
A warm, magical palette inspired by Disney's golden age animation and theme park aesthetics.

- **Primary Color**: Royal Purple `oklch(0.55 0.18 300)` - Communicates magic and royalty, evoking Disney castle imagery
- **Secondary Colors**: 
  - Soft Sky Blue `oklch(0.75 0.12 230)` - Supporting color for backgrounds and accents, like a clear Disney sky
  - Warm Gold `oklch(0.80 0.15 85)` - For income/positive amounts, representing treasure and rewards
- **Accent Color**: Magical Pink `oklch(0.70 0.18 350)` - CTAs and important elements, vibrant and eye-catching like fireworks
- **Foreground/Background Pairings**:
  - Primary Purple (oklch(0.55 0.18 300)): White text (oklch(0.99 0 0)) - Ratio 7.2:1 ✓
  - Accent Pink (oklch(0.70 0.18 350)): White text (oklch(0.99 0 0)) - Ratio 5.1:1 ✓
  - Background Gradient (oklch(0.96 0.02 250) to oklch(0.92 0.04 280)): Dark text (oklch(0.25 0.05 280)) - Ratio 12.8:1 ✓
  - Warm Gold (oklch(0.80 0.15 85)): Dark purple text (oklch(0.30 0.10 300)) - Ratio 8.5:1 ✓

## Font Selection
Typography should feel friendly, rounded, and slightly whimsical while maintaining excellent readability.

- **Primary Font**: Nunito - A rounded sans-serif that feels approachable and fun without being childish
- **Accent Font**: Quicksand - For headings and special elements, adding extra personality

- **Typographic Hierarchy**:
  - H1 (App Title): Quicksand Bold/36px/tight letter spacing/-0.02em
  - H2 (Balance Display): Quicksand SemiBold/32px/normal
  - H3 (Section Headers): Nunito Bold/20px/normal
  - Body (Entries, Forms): Nunito Regular/16px/1.5 line height
  - Small (Dates, Labels): Nunito Medium/14px/1.4 line height
  - Emphasis (Amounts): Nunito Bold/18px/normal

## Animations
Animations should feel bouncy and organic, like classic Disney animation principles with anticipation and follow-through. Use spring physics for dialog openings, gentle fades for list items, and sparkle effects for successful actions. Balance between subtle functionality (form validation feedback, hover states) and moments of delight (adding entries with a magical sparkle burst, balance updating with a gentle bounce).

## Component Selection

- **Components**:
  - Dialog (shadcn) - For add/edit entry forms with magical backdrop blur
  - Card (shadcn) - For individual entry display with hover effects and shadow
  - Button (shadcn) - Primary actions with gradient backgrounds and icon support
  - Input (shadcn) - Form fields with soft rounded corners (radius-xl)
  - Label (shadcn) - Form labels with friendly sizing
  - Alert Dialog (shadcn) - Delete confirmations
  - Badge (shadcn) - Category or type indicators
  - Scroll Area (shadcn) - For entry list with custom scrollbar styling

- **Customizations**:
  - Custom gradient backgrounds with subtle patterns (stars/dots)
  - Sparkle particle effects on successful actions
  - Custom amount input with currency prefix
  - Floating action button with pulse animation
  - Custom empty state illustration component

- **States**:
  - Buttons: Gradient shift on hover, scale down slightly on press, subtle glow on focus
  - Inputs: Border color shifts to accent pink on focus, subtle lift with shadow
  - Cards: Lift up with shadow increase on hover, slight tilt for playfulness
  - List items: Stagger animation on load, slide-out on delete

- **Icon Selection**:
  - Sparkles (Plus) - Add new entry
  - Pencil - Edit entry
  - Trash - Delete entry
  - Coins (CurrencyCircleDollar) - Income entries
  - TrendDown - Expense entries
  - CalendarBlank - Date picker

- **Spacing**:
  - Container padding: p-6 (mobile) / p-8 (desktop)
  - Card padding: p-4
  - Form field gaps: gap-4
  - List item gaps: gap-3
  - Section spacing: space-y-6

- **Mobile**: 
  - Stack form fields vertically on mobile
  - Full-width dialog on small screens
  - Larger touch targets (min 44px) for all interactive elements
  - Simplified entry cards with essential info upfront
  - Sticky header with balance display
  - Bottom-anchored floating action button
