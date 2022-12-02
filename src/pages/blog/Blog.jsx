import React from 'react'
import QuestionCard from '../../components/question-card/QuestionCard'

const data = [
  {
      id: 1,
      q: 'What are the different ways to manage a state in a React application?',
      a: `With React, you won’t modify the UI from code directly. For example, you won’t write commands like “disable the button”, “enable the button”, “show the success message”, etc. Instead, you will describe the UI you want to see for the different visual states of your component (“initial state”, “typing state”, “success state”), and then trigger the state changes in response to user input. This is similar to how designers think about UI.
      Here is a quiz form built using React. Note how it uses the status state variable to determine whether to enable or disable the submit button, and whether to show the success message instead.`
  },
  {
      id: 2,
      q: 'How does prototypical inheritance work?',
      a: `For instance, we have a user object with its properties and methods, and want to make admin and guest as slightly modified variants of it. We’d like to reuse what we have in user, not copy/reimplement its methods, just build a new object on top of it.
      Prototypal inheritance is a language feature that helps in that.`
  },
  {
      id: 3,
      q: 'What is a unit test? Why should we write unit tests?',
      a: `The main objective of unit testing is to isolate written code to test and determine if it works as intended. Unit testing is an important step in the development process, because if done correctly, it can help detect early flaws in code which may be more difficult to find in later testing stages.`
  },
  {
      id: 4,
      q: 'React vs. Angular vs. Vue?',
      a: `Vue provides higher customizability and hence is easier to learn than Angular or React. Further, Vue has an overlap with Angular and React with respect to their functionality like the use of components. Hence, the transition to Vue from either of the two is an easy option`
  },
]


const Blog = () => {
  return (
    <div className='bg-white text-black dark:bg-gray-800 dark:text-gray-100'>
        <div className='w-11/12 mx-auto py-8'>
            <p className='text-3xl font-bold text-center pb-8'>Blog Post</p>
            <div className='flex flex-col gap-4'>
                {
                    data.map(el => <QuestionCard key={el.id} data={el} />)
                }
            </div>
        </div>
    </div>
  )
}

export default Blog