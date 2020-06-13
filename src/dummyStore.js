// make categories and recipes data

const recipes = [
    {
        id: 2,
        title: `Lorraine's Club Sandwich`,
        description: `An easy, quick, and delicious sandwich to eat anytime.`,
        ingredients: `2 slices bacon
 
        3 slices bread, toasted
         
        3 tablespoons mayonnaise
         
        2 leaves lettuce
         
        2 (1 ounce) slices cooked deli turkey breast
         
        2 slices tomato`,
        directions: `Step 1
        Place bacon in a heavy skillet. Cook over medium high heat until evenly brown. Drain on paper towels.
        
         Step 2
        Spread each slice of bread with mayonnaise. On one slice of toast, place the turkey and lettuce. Cover with a slice of toast, then the bacon and tomato. Top with last slice of toast.`,
        date_created: '2020-01-22 16:28:32',
        date_modified: '2020-03-23 16:28:32',
        author_id: null,
        category_id: 2
    },

    {
        id: 3,
        title: `Virgina's Tuna Salad`,
        description: `This was always a summer Saturday favorite for my grandparents and I. Great served on a large lettuce leaf. You may also add grapes or chopped apples if you wish.`,
        ingredients: `1 egg
 
        1 (5 ounce) can tuna, drained and flaked
         
        3 tablespoons mayonnaise
         
        2 stalks celery, chopped
         
        2 tablespoons sweet pickle relish
         
        1 pinch ground black pepper`,
        directions: `Step 1
        Place egg in a saucepan and cover with cold water. Bring water to a boil and immediately remove from heat. Cover and let egg stand in hot water for 10 to 12 minutes. Remove from hot water; cool for 5 minutes. Peel and chop into bite-sized pieces.
        
         Step 2
        In a medium bowl, mix together tuna and mayonnaise. Mix in egg, celery, relish, and black pepper.`,
        date_created: '2020-01-30 16:28:32',
        date_modified: '2020-03-23 16:28:32',
        author_id: null,
        category_id: 2
    },
    {
        id:4 ,
        title: 'The Best Chicken and Rice',
        description: `Could classic chicken and rice be one of the most beloved comfort dinners to ever hit the plate? We think so. And to blow your mind even more, this version is made in just one skillet. Here we use bone-in, skin on chicken thighs which cook up in exactly the same time as the rice to guarantee juicy chicken. A quick broil at the end creates the perfect crispy skin and gives a little crunch to the rice and vegetables. `,
        ingredients: `2 tablespoons canola oil

        4 to 6 bone-in, skin on chicken thighs (about 6 ounces each)  
        
        1/2 teaspoon paprika 
        
        Kosher salt and freshly ground black pepper 
        
        4 medium carrots (about 12 ounces), sliced into 1/4-inch rounds 
        
        3 stalks celery (about 9 ounces), sliced 1/4-inch thick 
        
        2 large shallots (about 4 ounces), finely diced 
        
        2 cloves garlic, minced 
        
        1 tablespoon fresh thyme leaves, chopped 
        
        1 tablespoon fresh oregano leaves, chopped 
        
        2 teaspoons finely grated lemon zest plus 1 tablespoon lemon juice 
        
        1 cup long-grain rice 
        
        4 cups low-sodium chicken stock 
        
        1 tablespoon chopped fresh chives `,
        directions: `1 Preheat the broiler. Heat 1 tablespoon of the oil in a large skillet over medium-high heat. Toss the chicken with the paprika, 1 teaspoon salt and a few grinds of pepper in a large bowl. Place the chicken skin-side down in the skillet and cook undisturbed until the skin is golden but not too dark, 4 to 5 minutes. Remove the chicken to a plate using a metal spatula and add the remaining 1 tablespoon oil to the skillet.
        
        2 Add the carrots, celery and shallots to the skillet and cook, stirring occasionally, until softened but not yet turning golden, 4 to 5 minutes. Stir in the garlic, thyme, oregano, lemon zest, lemon juice, 1/2 teaspoon salt and a few grinds of pepper and cook just until you begin to smell the garlic, about 1 minute. Stir in the rice and cook undisturbed until lightly toasted, about 2 minutes. Pour in the broth, add 1/2 teaspoon salt and stir to combine, then add the chicken thighs back to the pan, skin-side up. Bring the liquid to a boil then cover, reduce the heat to a simmer and cook until the rice is tender and the chicken is cooked through, 15 to 20 minutes.  
        
        3 Remove the lid from the pan and broil until the chicken skin is crispy and golden, 2 to 3 minutes. Sprinkle with the chives.  `,
        date_created: '2020-01-30 16:28:32',
        date_modified: '2020-03-23 16:28:32',
        author_id: null,
        category_id: 3
    },
    {
        id: 5,
        title: `Grilled Marinated Shrimp`,
        description: `This makes the best shrimp! Remove from skewers and serve on a bed of pasta with sauce for a great meal.`,
        ingredients:`1 cup olive oil
 
        ¼ cup chopped fresh parsley
         
        1 lemon, juiced
         
        2 tablespoons hot pepper sauce
         
        3 cloves garlic, minced
         
        1 tablespoon tomato paste
         
        2 teaspoons dried oregano
         
        1 teaspoon salt
         
        1 teaspoon ground black pepper
         
        2 pounds large shrimp, peeled and deveined with tails attached
         
        6 eaches skewers`,
        directions: `Step 1
        In a mixing bowl, mix together olive oil, parsley, lemon juice, hot sauce, garlic, tomato paste, oregano, salt, and black pepper. Reserve a small amount for basting later. Pour remaining marinade into a large resealable plastic bag with shrimp. Seal, and marinate in the refrigerator for 2 hours.
        
         Step 2
        Preheat grill for medium-low heat. Thread shrimp onto skewers, piercing once near the tail and once near the head. Discard marinade.
        
         Step 3
        Lightly oil grill grate. Cook shrimp for 5 minutes per side, or until opaque, basting frequently with reserved marinade.`,
        date_created: '2019-03-22 16:28:32',
        date_modified: '2020-03-22 16:28:32',
        author_id: null,
        category_id: 3
    },
    {
        id: 6,
        title: `Chicago-Inspired Italian Beef Sandwich`,
        description: `I tried to combine the traditional Italian beef sandwich with the French dip sandwich with a little nod to the pulled pork sandwich. Instead of using thinly sliced roast beef, I used stew beef, with apologies to my friends from Chicago.`,
        ingredients:`1 ½ pounds boneless beef chuck, cut into 2-inch pieces
 
        salt and ground black pepper to taste
         
        1 tablespoon vegetable oil
         
        6 cloves garlic, sliced
         
        2 tablespoons white vinegar
         
        1 tablespoon dried oregano
         
        1 ½ teaspoons salt, or to taste
         
        1 teaspoon dried thyme
         
        1 teaspoon dried rosemary
         
        1 teaspoon freshly ground black pepper
         
        1 bay leaf
         
        ¼ teaspoon red pepper flakes, or to taste
         
        3 cups chicken broth, or as needed
         
        4 ciabatta rolls, sliced in half
         
        1 cup chopped giardiniera (pickled Italian vegetables)
         
        2 teaspoons chopped fresh flat-leaf parsley`,
        directions: `Step 1
        Season beef with a pinch of salt and black pepper. Heat vegetable oil in a heavy pot over high heat. Cook and stir beef in hot oil until browned, 5 to 8 minutes.
        
         Step 2
        Stir garlic, vinegar, oregano, 1 1/2 teaspoons salt, thyme, rosemary, 1 teaspoon black pepper, bay leaf, and red pepper flakes into beef. Pour enough chicken broth into beef mixture to cover the meat by 1 inch and bring to a simmer.
        
         Step 3
        Cover pot with a lid, reduce heat to low, and simmer until meat is fork-tender, 1 to 1 1/2 hours.
        
         Step 4
        Transfer meat with a strainer or slotted spoon to a separate pot; pour about 1/4 cup of meat broth into pot. Use a wooden spoon to gently break meat into smaller chunks. Cover pot with a lid or aluminum foil and keep warm.
        
         Step 5
        Skim excess grease from top of broth remaining in the first pot; season with salt and pepper to taste. Cover pot with a lid or aluminum foil and keep broth warm.
        
         Step 6
        Lay halves of a roll out on a work surface and spoon 2 to 3 tablespoons meat broth over each half. Top bottom half of roll with a generous portion of meat and a spoonful of pickled vegetables. Place tops on sandwich. Repeat with remaining buns, broth, meat, and pickled vegetables to make 3 more sandwiches.
        
         Step 7
        Spoon hot meat broth into ramekins and top each ramekin with 1/2 teaspoon parsley. Serve sandwiches with hot broth for dipping.`,
        date_created: '2019-03-22 16:28:32',
        date_modified: '2020-03-22 16:28:32',
        author_id: null,
        category_id: 2
    },
    {
        id: 7,
        title: `Yogurt Parfait`,
        description: `This is delicious for breakfast, snack, even for a dessert! It looks great in a glass, but can also be made in a bowl. Use your favorite fruit, or whatever is in season.`,
        ingredients:`2 cups vanilla yogurt
 
        1 cup granola
         
        8 blackberries`,
        directions: `Step 1
        In a large glass, layer 1 cup yogurt, 1/2 cup granola and 4 blackberries. Repeat layers.`,
        date_created: '2019-03-22 16:28:32',
        date_modified: '2020-03-22 16:28:32',
        author_id: null,
        category_id: 1
    },
    {
        id: 8,
        title: `Fudge`,
        description: `I double the recipe and put in a glass baking dish (9x13 inches). Nice for holidays . . . Keep it for a secret and family and friends will think you worked forever on it . . . (smiles). You can also use peanut butter chips and make peanut butter fudge.`,
        ingredients:`3 cups semisweet chocolate chips
 
        1 (14 ounce) can sweetened condensed milk
         
        ¼ cup butter
         
        1 cup chopped walnuts (optional)`,
        directions: `Step 1
        Place chocolate chips, sweetened condensed milk, and butter or margarine in large microwaveable bowl. Zap in microwave on medium until chips are melted, about 3-5 minute, stirring once or twice during cooking. Stir in nuts, if desired.
        
         Step 2
        Pour into well-greased 8x8-inch glass baking dish. Refrigerate until set.`,
        date_created: '2019-03-22 16:28:32',
        date_modified: '2020-03-22 16:28:32',
        author_id: null,
        category_id: 4
    },
]

export const categories = [
    {
        id: 1,
        title: 'Breakfast',
        author_id: null
    },
    {
        id: 2,
        title: 'Lunch',
        author_id: null
    },
    {
        id: 3,
        title: 'Dinner',
        author_id: null
    },
    {
        id: 4,
        title: 'Desserts',
        author_id: null
    },
]

export default recipes
