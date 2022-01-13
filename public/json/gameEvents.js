export const gameEvents = [
    {
        "text": "After living alone for many years, you feel lonely. Your child/children have not been contacting you in a while, do you call your son/daughter or not?",
        "options": [{
            "option": "Yes",
            "text": "You chat on the phone for a long while, making up for all the lost time.",
            "results": {}
        },
        {
            "option": "No",
            "text": "You don’t want to bother your child/children. Many elderly in sg feel lonely as they have no one to contact.",
            "results": {
                "eh": -1
            }
        }]
    },
    {
        "text": "As you feel ill, do you go for cheaper traditional Chinese medicine (TCM), or more expensive Western medicine?",
        "options": [{
            "option": "Chinese Medicine",
            "text": "You go to the nearest TCM store and bought some herbs. After consuming them, you question their effectiveness.",
            "results": {
                "ph": -1
            }
        },
        {
            "option": "Western Medicine",
            "text": "You go to the nearest polyclinic. After consuming your prescribed and expensive drugs, you feel much better.",
            "results": {
                "money": -50
            }
        }]
    },
    {
        "text": "The booster shot/vaccine is now available, do you take them, knowing the side effects and potential risks?",
        "options": [{
            "option": "Take it",
            "text": "You went to the community club and got your jab. However, due to the aching side effects you couldn’t go out with friends.",
            "results": {
                "sh": -1
            }
        },
        {
            "option": "Don't take it",
            "text": "You do not believe in the effectiveness of the vaccine; instead, you went out with friends for the whole day.",
            "results": {
                "ph": -1
            }
        }]
    },
    {
        "payday": 1
    }
]
