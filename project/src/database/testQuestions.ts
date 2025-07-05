// src/database/testQuestions.ts

import db from './index';
import { v4 as uuidv4 } from 'uuid';

export interface TestQuestionRow {
  id: string;
  lesson_id: string;
  text: Record<string,string>;
  type: string;
  options?: Record<string,string>[];
  order_no: number;
}

const toJson = (o: any) => JSON.stringify(o || {});
const fromJson = (s: string) => { try { return JSON.parse(s) } catch { return undefined } };

export function getTestQuestions(lessonId: string): Promise<TestQuestionRow[]> {
  return new Promise((res, rej) => {
    db.transaction(tx =>
      tx.executeSql(
        `SELECT * FROM test_questions WHERE lesson_id=?;`,
        [lessonId],
        (_, { rows }) => {
          const out: TestQuestionRow[] = [];
          for (let i=0;i<rows.length;i++){
            const r = rows.item(i);
            out.push({
              id: r.id,
              lesson_id: r.lesson_id,
              text: fromJson(r.text),
              type: r.type,
              options: fromJson(r.options),
              order_no: r.order_no
            });
          }
          res(out);
        },
        (_, e) => { rej(e); return false;}
      )
    );
  });
}

export function insertTestQuestion(data: Omit<TestQuestionRow,'id'>): Promise<string> {
  const id = uuidv4();
  return new Promise((res, rej) => {
    db.transaction(tx =>
      tx.executeSql(
        `INSERT INTO test_questions (id,lesson_id,text,type,options,order_no)
         VALUES (?,?,?,?,?,?);`,
        [id,data.lesson_id,toJson(data.text),data.type,toJson(data.options),data.order_no],
        () => res(id),
        (_, e) => { rej(e); return false;}
      )
    );
  });
}

export function updateTestQuestion(id: string, data: Partial<Omit<TestQuestionRow,'id'>>): Promise<void> {
  return new Promise((res, rej) => {
    db.transaction(tx =>
      tx.executeSql(
        `UPDATE test_questions SET text=?,type=?,options=?,order_no=? WHERE id=?;`,
        [toJson(data.text),data.type,toJson(data.options),data.order_no,id],
        () => res(),
        (_, e) => { rej(e); return false;}
      )
    );
  });
}

export function deleteTestQuestion(id: string): Promise<void> {
  return new Promise((res, rej) => {
    db.transaction(tx =>
      tx.executeSql(`DELETE FROM test_questions WHERE id=?;`,[id],
        () => res(), (_, e) => { rej(e); return false;}
      )
    );
  });
}
