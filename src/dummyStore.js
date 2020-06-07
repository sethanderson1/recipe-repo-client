// make categories and recipes data

const recipes = [
    {
        id: 1,
        title: 'bacon cheesecake',
        description: 'like bacon? and cheesecake? try this!',
        ingredients: 'bacon, cheese, cake',
        steps: 'eat bacon and take a nap',
        date_created: '2019-03-22 16:28:32',
        date_modified: '2020-03-22 16:28:32',
        author_id: null,
        folder_id: 1
    },
    {
        id: 2,
        title: 'bacon pie',
        description: 'like bacon? and pie? try this!',
        ingredients: 'bacon, pie',
        steps: 'eat bacon and take a nap',
        date_created: '2020-01-22 16:28:32',
        date_modified: '2020-03-23 16:28:32',
        author_id: null,
        folder_id: 2
    },
]

export const categories = [
    {
        id: 1,
        title: 'desserts',
        author_id: null
    },
    {
        id: 2,
        title: 'lunch',
        author_id: null
    }
]

export default recipes
