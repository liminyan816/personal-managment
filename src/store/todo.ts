import { defineStore } from 'pinia'
import handleDate from '../util/handleDate'
import { nanoid } from 'nanoid'

export const useTodoStore = defineStore('todo', {
  state: () => ({
    finishTodo:[
      {
        date:'2023-09-11',
        id: '0',
        child:[
          {
              id: '0',
              time:'09:00',
              event:'写bug'
          },
          {
              id: '1',
              time:'10:00',
              event:'写bug'
          },
        ]
      },
      {
        date:'2022-09-02',
        id: '1',
        child:[
          {
              id: '0',
              time:'09:00',
              event:'不写bug了'
          },
          {
              id: '1',
              time:'10:00',
              event:'写屎山代码'
          },
          {
              id: '2',
              time:'11:00',
              event:'又写bug'
          },
          {
              id: '2',
              time:'11:00',
              event:'又写bug'
          },
          {
              id: '2',
              time:'11:00',
              event:'又写bug'
          },
          {
              id: '2',
              time:'11:00',
              event:'又写bug'
          },
          {
              id: '2',
              time:'11:00',
              event:'又写bug'
          },
          {
              id: '2',
              time:'11:00',
              event:'又写bug'
          },
          {
              id: '2',
              time:'11:00',
              event:'又写bug'
          },
          {
              id: '2',
              time:'11:00',
              event:'又写bug'
          },
          
        ]
      }
    ],
    todo:[
      {
        date:'2023-09-12',
        id: '0',
        child:[
          {
              id: '0',
              time:'09:00',
              event:'写bug',
              checked: false
          },
          {
              id: '1',
              time:'10:00',
              event:'写bug',
              checked: false
          },
        ]
      },
      {
        date:'2022-09-02',
        id: '1',
        child:[
          {
              id: '0',
              time:'09:00',
              event:'不写bug了',
              checked: false
          },
          {
              id: '1',
              time:'10:00',
              event:'写屎山代码',
              checked: false
          },
          {
              id: '2',
              time:'11:00',
              event:'又写bug',
              checked: false
          },
        ]
      }
    ],
  }),
  actions: {
    addTodoEvent(todoEvent: string) {
      const year = handleDate().formatDate().year
      const month = handleDate().formatDate().month.toString().padStart(2,'0')
      const day = handleDate().formatDate().day.toString().padStart(2,'0')
      const nowMonthDay = `${year}-${month}-${day}`
      // console.log(nowMonthDay);
      const isInclude = this.todo.some(item => item.date.indexOf(nowMonthDay) > -1)
      // console.log(isInclude);
      this.todo.forEach(item => {
        if(item.date == nowMonthDay) {
          // console.log('包含了');
          item.child.push({
            id: nanoid(),
            time: `${handleDate().formatDate().hours}:${handleDate().formatDate().minutes}`, 
            event: todoEvent,
            checked: false
          })
        }
      })
      if(!isInclude) {
        this.todo.push({
          date: nowMonthDay,
          id: nanoid(),
          child:[
            {
                id: nanoid() ,
                time: `${handleDate().formatDate().hours}:${handleDate().formatDate().minutes}`,
                event: todoEvent,
                checked: false
            }
          ]
        })
      }
      // console.log(this.todo);
    },
    comTodoEvent(value: any,child: any) {
      // console.log('comTodoEvent执行');
      let flag = 1
      this.finishTodo.forEach((item,index) => {
        if(item.date == value.date) {
          console.log(value.id);
          flag = 0
          // console.log('添加finish');
          item.child.push(child)
        }
      })
      if(flag) {
        // console.log(child);
        let value2 = { ...value }
        value2.child = []
        value2.child.push(child)
        this.finishTodo.push(value2)
      }
      this.delTodoEvent(value.id, child.id)
    },
    delTodoEvent(id1: string, id2: string) {
      this.todo.forEach((item,index) => {
        if(item.id == id1) {
          item.child.forEach((i ,index) => {
            if(i.id == id2) {
              item.child.splice(index, 1)
            }
          })
        }
        if(item.child.length == 0) {
          this.todo.splice(index,1)
        }
      })
    }
  }
})