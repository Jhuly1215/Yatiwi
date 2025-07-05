// backend/src/scripts/seed.ts
import { getDB } from '../src/utils/db';

async function runSeed() {
  try {
    const db = await getDB();

    await db.exec(`
      -- USERS
      INSERT INTO users (id, email, hashed_password, type, name, selected_language, profile_image_url, settings, created_at, last_login)
      VALUES 
        ('u1', 'maria@example.com', 'hash123', 'student', 'María', 'es', NULL, '{}', datetime('now'), datetime('now'));

      -- SUBJECTS
      INSERT INTO subjects (id, name, translations, icon_url)
      VALUES 
        ('math', 'Matemáticas', '{"es":"Matemáticas","ay":"Jakhuña","qu":"Yupay"}', 'https://images.pexels.com/photos/6256065/pexels-photo-6256065.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop'),
        ('science', 'Ciencias', '{"es":"Ciencias","ay":"Yatiqawi","qu":"Yachay"}', 'https://images.pexels.com/photos/1072824/pexels-photo-1072824.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop');

      -- LESSONS
      INSERT INTO lessons (id, title, description, subject_id, tags, level, author_id, created_at, updated_at)
      VALUES 
        ('l1', '{"es":"Números básicos","ay":"Jakhunak qallta","qu":"Yupaykuna qallariy"}',
               '{"es":"Aprende a contar hasta 10.","ay":"10kama jakhuña yatiñani.","qu":"Huk chunka kaman yupay yachay"}',
               'math', '["conteo"]', 1, 'u1', datetime('now'), datetime('now')),
        ('l2', '{"es":"Partes de una planta","ay":"Chhijmanta apnaqawi","qu":"Mallki churanakuna"}',
               '{"es":"Reconoce las partes de una planta.","ay":"Chhijmanta apnaqawinaka uñt’añani.","qu":"Mallkipa churanakuna riqsichiy"}',
               'science', '["plantas"]', 1, 'u1', datetime('now'), datetime('now'));

      -- MATERIALS
      INSERT INTO materials (id, lesson_id, type, language, url, format, size, version, "order", checksum, created_at)
      VALUES 
        ('m1', 'l1', 'video', 'es', 'https://youtu.be/hd5qnZfGO1c?si=jT4JXr8LwMof_rmD', 'mp4', 10485760, 1, 1, 'abc123', datetime('now')),
        ('m2', 'l2', 'text', 'es', 'https://youtu.be/wBjaQuyMr18?si=hTzYi_hvSyybfMC_', 'mp4', 524288, 1, 1, 'def456', datetime('now'));

      -- FAVORITES
      INSERT INTO favorites (id, user_id, lesson_id, added_at)
      VALUES 
        ('f1', 'u1', 'l1', datetime('now'));

      -- DOWNLOADS
      INSERT INTO downloads (id, user_id, material_id, version, local_path, downloaded_at)
      VALUES 
        ('d1', 'u1', 'm1', 1, '/local/path/l1.mp4', datetime('now'));

      -- LESSON PROGRESS
      INSERT INTO lesson_progress (id, user_id, lesson_id, status, progress_percent, last_accessed, score)
      VALUES 
        ('p1', 'u1', 'l1', 'in_progress', 75, datetime('now'), 12);

      -- DAILY PROGRESS
      INSERT INTO progress (id, user_id, date, time_spent, lessons_completed, points_earned, current_streak)
      VALUES 
        ('prog1', 'u1', date('now'), 1800, 2, 40, 3);

      -- ACHIEVEMENTS
      INSERT INTO achievements (id, code, title, description, icon_url, points, created_at, updated_at)
      VALUES 
        ('a1', 'first_lesson', '{"es":"Primera Lección","ay":"Nayra Yatiqawi","qu":"Qallariyniy yachay"}',
                  '{"es":"Completaste tu primera lección","ay":"Nayra yatiqawinak tukuyta","qu":"Ñawpaq yachaykita tukurunki"}',
                  'https://images.emojiterra.com/google/android-12l/512px/1f3af.png', 10, datetime('now'), datetime('now'));

      -- USER ACHIEVEMENTS
      INSERT INTO user_achievements (id, user_id, achievement_id, earned_at)
      VALUES 
        ('ua1', 'u1', 'a1', datetime('now'));
    `);

    console.log('✅ Base de datos poblada correctamente.');
  } catch (error) {
    console.error('❌ Error al poblar la base de datos:', error);
  }
}

runSeed();
