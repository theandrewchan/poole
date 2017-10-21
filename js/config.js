var chartInfo = {
  "types": [
    {
      "id": 1,
      "chart_pref_x": 0.5,
      "chart_pref_y": 0,
      "color": "#E57373",
      "name": "core"
    },
    {
      "id": 2,
      "chart_pref_x": 1,
      "chart_pref_y": -0.2,
      "color": "#FFF176",
      "name": "hardware"
    },
    {
      "id": 3,
      "chart_pref_x": 0.5,
      "chart_pref_y": 0,
      "color": "#90CAF9",
      "name": "software"
    },
    {
      "id": 4,
      "chart_pref_x": 0.8,
      "chart_pref_y": 0,
      "color": "#80CBC4",
      "name": "theory"
    },
    {
      "id": 5,
      "chart_pref_x": 0,
      "chart_pref_y": 0,
      "color": "#CE93D8",
      "name": "applications"
    },
    {
      "id": 6,
      "chart_pref_x": 0.5,
      "chart_pref_y": 0,
      "color": "#E57373",
      "name": "core"
    },
    {
      "id": 9,
      "chart_pref_x": 0.6,
      "chart_pref_y": 0,
      "color": "#80CBC4",
      "name": "optics"
    },
    {
      "id": 10,
      "chart_pref_x": 0.5,
      "chart_pref_y": 0,
      "color": "#CE93D8",
      "name": "bioelectronics"
    },
    {
      "id": 14,
      "chart_pref_x": 0.5,
      "chart_pref_y": 0,
      "color": "#E0E0E0",
      "name": "required"
    },
    {
      "id": 8,
      "chart_pref_x": 1,
      "chart_pref_y": 0,
      "color": "#90CAF9",
      "name": "devices"
    },
    {
      "id": 12,
      "chart_pref_x": 0.3,
      "chart_pref_y": 0,
      "color": "#80DEEA",
      "name": "signals"
    },
    {
      "id": 13,
      "chart_pref_x": 0,
      "chart_pref_y": 0,
      "color": "#FFCC80",
      "name": "robotics"
    },
    {
      "id": 11,
      "chart_pref_x": 0.5,
      "chart_pref_y": 0,
      "color": "#9FA8DA",
      "name": "power"
    },
    {
      "id": 7,
      "chart_pref_x": 0.8,
      "chart_pref_y": 0,
      "color": "#FFF176",
      "name": "circuits"
    }
  ],
  "cs_courses": [
    {
      "id": 74,
      "department_id": 2,
      "name": "61A",
      "link": "\/courseguides\/CS\/61A",
      "image": "/assets/wizard.gif",
      "prereqs": [

      ],
      "type_id": 1,
      "bias_x": 0,
      "bias_y": 0,
      "depth": 1
    },
    {
      "id": 75,
      "department_id": 2,
      "name": "61B",
      "link": "\/courseguides\/CS\/61B",
      "prereqs": [
        {
          "id": 1,
          "course_id": 75,
          "prereq_id": 74,
          "is_recommended": false
        }
      ],
      "type_id": 1,
      "bias_x": -50,
      "bias_y": 0,
      "depth": 2
    },
    {
      "id": 76,
      "department_id": 2,
      "name": "61C",
      "link": "\/courseguides\/CS\/61C",
      "prereqs": [
        {
          "id": 2,
          "course_id": 76,
          "prereq_id": 74,
          "is_recommended": false
        },
        {
          "id": 60,
          "course_id": 76,
          "prereq_id": 75,
          "is_recommended": true
        }
      ],
      "type_id": 1,
      "bias_x": 50,
      "bias_y": 0,
      "depth": 2
    },
    {
      "id": 77,
      "department_id": 2,
      "name": "70",
      "link": "\/courseguides\/CS\/70",
      "prereqs": [

      ],
      "type_id": 1,
      "bias_x": 0,
      "bias_y": 0,
      "depth": 5
    },
    {
      "id": 3,
      "department_id": 2,
      "name": "160",
      "link": "\/courseguides\/CS\/160",
      "prereqs": [
        {
          "id": 5,
          "course_id": 3,
          "prereq_id": 75,
          "is_recommended": false
        }
      ],
      "type_id": 3,
      "bias_x": 0,
      "bias_y": 0,
      "depth": 3
    },
    {
      "id": 287,
      "department_id": 2,
      "name": "161",
      "link": "\/courseguides\/CS\/161",
      "prereqs": [
        {
          "id": 6,
          "course_id": 287,
          "prereq_id": 76,
          "is_recommended": false
        },
        {
          "id": 7,
          "course_id": 287,
          "prereq_id": 77,
          "is_recommended": false
        }
      ],
      "type_id": 3,
      "bias_x": 0,
      "bias_y": 0,
      "depth": 3
    },
    {
      "id": 4,
      "department_id": 2,
      "name": "162",
      "link": "\/courseguides\/CS\/162",
      "prereqs": [
        {
          "id": 8,
          "course_id": 4,
          "prereq_id": 75,
          "is_recommended": false
        },
        {
          "id": 9,
          "course_id": 4,
          "prereq_id": 76,
          "is_recommended": false
        },
        {
          "id": 10,
          "course_id": 4,
          "prereq_id": 77,
          "is_recommended": false
        }
      ],
      "type_id": 3,
      "bias_x": 0,
      "bias_y": 0,
      "depth": 3
    },
    {
      "id": 5,
      "department_id": 2,
      "name": "164",
      "link": "\/courseguides\/CS\/164",
      "prereqs": [
        {
          "id": 11,
          "course_id": 5,
          "prereq_id": 75,
          "is_recommended": false
        },
        {
          "id": 12,
          "course_id": 5,
          "prereq_id": 76,
          "is_recommended": false
        }
      ],
      "type_id": 3,
      "bias_x": 0,
      "bias_y": 0,
      "depth": 3
    },
    {
      "id": 6,
      "department_id": 2,
      "name": "169",
      "link": "\/courseguides\/CS\/169",
      "prereqs": [
        {
          "id": 13,
          "course_id": 6,
          "prereq_id": 75,
          "is_recommended": false
        },
        {
          "id": 14,
          "course_id": 6,
          "prereq_id": 76,
          "is_recommended": false
        }
      ],
      "type_id": 3,
      "bias_x": 0,
      "bias_y": 0,
      "depth": 3
    },
    {
      "id": 7,
      "department_id": 2,
      "name": "170",
      "link": "\/courseguides\/CS\/170",
      "prereqs": [
        {
          "id": 16,
          "course_id": 7,
          "prereq_id": 75,
          "is_recommended": false
        },
        {
          "id": 17,
          "course_id": 7,
          "prereq_id": 77,
          "is_recommended": false
        }
      ],
      "type_id": 4,
      "bias_x": 0,
      "bias_y": 0,
      "depth": 3
    },
    {
      "id": 8,
      "department_id": 2,
      "name": "172",
      "link": "\/courseguides\/CS\/172",
      "prereqs": [
        {
          "id": 18,
          "course_id": 8,
          "prereq_id": 7,
          "is_recommended": false
        }
      ],
      "type_id": 4,
      "bias_x": 0,
      "bias_y": 0,
      "depth": 4
    },
    {
      "id": 9,
      "department_id": 2,
      "name": "174",
      "link": "\/courseguides\/CS\/174",
      "prereqs": [
        {
          "id": 19,
          "course_id": 9,
          "prereq_id": 7,
          "is_recommended": false
        }
      ],
      "type_id": 4,
      "bias_x": 0,
      "bias_y": 0,
      "depth": 4
    },
    {
      "id": 394,
      "department_id": 2,
      "name": "176",
      "link": "\/courseguides\/CS\/176",
      "prereqs": [
        {
          "id": 20,
          "course_id": 394,
          "prereq_id": 7,
          "is_recommended": false
        }
      ],
      "type_id": 4,
      "bias_x": 0,
      "bias_y": 0,
      "depth": 4
    },
    {
      "id": 10,
      "department_id": 2,
      "name": "184",
      "link": "\/courseguides\/CS\/184",
      "prereqs": [
        {
          "id": 21,
          "course_id": 10,
          "prereq_id": 75,
          "is_recommended": false
        }
      ],
      "type_id": 5,
      "bias_x": 0,
      "bias_y": 0,
      "depth": 3
    },
    {
      "id": 11,
      "department_id": 2,
      "name": "186",
      "link": "\/courseguides\/CS\/186",
      "prereqs": [
        {
          "id": 22,
          "course_id": 11,
          "prereq_id": 75,
          "is_recommended": false
        },
        {
          "id": 23,
          "course_id": 11,
          "prereq_id": 76,
          "is_recommended": false
        }
      ],
      "type_id": 5,
      "bias_x": 0,
      "bias_y": 0,
      "depth": 3
    },
    {
      "id": 12,
      "department_id": 2,
      "name": "188",
      "link": "\/courseguides\/CS\/188",
      "prereqs": [
        {
          "id": 24,
          "course_id": 12,
          "prereq_id": 75,
          "is_recommended": false
        },
        {
          "id": 25,
          "course_id": 12,
          "prereq_id": 77,
          "is_recommended": false
        },
        {
          "id": 26,
          "course_id": 12,
          "prereq_id": 7,
          "is_recommended": true
        }
      ],
      "type_id": 5,
      "bias_x": 0,
      "bias_y": 0,
      "depth": 3
    },
    {
      "id": 13,
      "department_id": 2,
      "name": "189",
      "link": "\/courseguides\/CS\/189",
      "prereqs": [
        {
          "id": 27,
          "course_id": 13,
          "prereq_id": 12,
          "is_recommended": false
        }
      ],
      "type_id": 5,
      "bias_x": 0,
      "bias_y": 0,
      "depth": 4
    },
    {
      "id": 2,
      "department_id": 2,
      "name": "152",
      "link": "\/courseguides\/CS\/152",
      "prereqs": [
        {
          "id": 4,
          "course_id": 2,
          "prereq_id": 76,
          "is_recommended": false
        }
      ],
      "type_id": 2,
      "bias_x": 0,
      "bias_y": 0,
      "depth": 4
    },
    {
      "id": 418,
      "department_id": 2,
      "name": "168",
      "link": "\/courseguides\/CS\/168",
      "prereqs": [
        {
          "id": 63,
          "course_id": 418,
          "prereq_id": 75,
          "is_recommended": false
        }
      ],
      "type_id": 3,
      "bias_x": 0,
      "bias_y": 0,
      "depth": 3
    },
    {
      "id": 260,
      "department_id": 2,
      "name": "191",
      "link": "\/courseguides\/CS\/191",
      "prereqs": [
        {
          "id": 59,
          "course_id": 260,
          "prereq_id": 7,
          "is_recommended": false
        }
      ],
      "type_id": 4,
      "bias_x": 60,
      "bias_y": 0,
      "depth": 4
    }
  ],
}
