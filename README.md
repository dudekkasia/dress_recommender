# Dress Recommender - Soft Feminine Style

An application recommending dresses in Soft Feminine style based on user preferences.

<img width="1464" alt="image" src="https://github.com/user-attachments/assets/5342c1f2-1ba3-4ecb-a0ca-d32e68b97a2c" />
<img width="1448" alt="image" src="https://github.com/user-attachments/assets/84ac16c2-a949-463d-9bfe-64efd73fec98" />





## Application Purpose

The purpose of the application is to recommend dresses in Soft Feminine style based on the user's preferences. The Soft Feminine style is characterized by delicacy and elegance, with flowing silhouettes, pastel colors, floral patterns, and light fabrics, emphasizing grace and charm, often with details such as ruffles, lace, and soft textures.

The MVP aims to test the strategy of collecting information about the user's preferences and extracting the best-matching dresses from the database.

## Features

- Displaying dresses in batches of 8
- Ability to like dresses that the user finds appealing
- Generating dress recommendations based on liked items
- Learning user preferences over time (using Naive Bayes)

## Technologies

- React + TypeScript
- Vite (as bundler)
- CSS for styling

## Running the Project

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

4. Open the application in browser (default: `http://localhost:5173`)

## Preference Learning Model

The application uses a Naive Bayes model with Laplace smoothing to learn user preferences. For each parameter value (e.g., fit: Loose, skirt: A-Line, neckline: Halter):

- `shown_v`: Number of times a dress with value v was displayed.
- `liked_v`: Number of times a dress with value v was liked.

The probability of liking a given parameter value is calculated as:
```
P(like | p=v) = (liked_v + 1) / (shown_v + 2)
```

Laplace smoothing ensures non-zero probabilities for all values, even if they haven't been liked yet.

## Application Flow

1. The user sees 8 randomly selected dresses
2. They can like any number of dresses by clicking the heart icon
3. After clicking "Next Dresses":
   - The system updates the user's preferences
   - Displays 3 recommended dresses
   - Shows a new batch of 8 dresses (4 similar to liked ones, 4 random)
4. The process repeats, and recommendations become increasingly better matched

This project was created as an MVP for a dress recommendation application.
