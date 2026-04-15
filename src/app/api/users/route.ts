// import { NextRequest, NextResponse } from 'next/server';
import { NextResponse } from 'next/server';

import { getAllUsers } from '@/lib/services/user-service';

const GET = async (): Promise<NextResponse> => {
  try {
    const users = await getAllUsers();

    return NextResponse.json(users);
  } catch (error) {
    console.error('GET /api/users ошибка:', error);
    return NextResponse.json({ error: 'Не удалось получить пользователей' }, { status: 500 });
  }
};

// const POST = async (request: NextRequest): Promise<NextResponse> => {
//   try {
//     const body = await request.json();
//     const { name, email, phone } = body;

//     if (!name || !email || !phone) {
//       return NextResponse.json({ error: 'Поля name, email и phone обязательны' }, { status: 400 });
//     }

//     await connectToDatabase();

//     const newUser = await User.create({ name, email, phone });
//     const redis = await getRedisClient();

//     await redis.del(USERS_CACHE_KEY);

//     return NextResponse.json(newUser, { status: 201 });
//   } catch (error) {
//     console.error('POST /api/users ошибка:', error);

//     return NextResponse.json({ error: 'Не удалось создать пользователя' }, { status: 500 });
//   }
// };

// const DELETE = async (request: NextRequest): Promise<NextResponse> => {
//   try {
//     const { searchParams } = new URL(request.url); // ?????????????
//     const id = searchParams.get('id'); // ????????????????????????

//     if (!id) {
//       return NextResponse.json({ error: 'Параметр id обязателен' }, { status: 400 });
//     }

//     await connectToDatabase();

//     const deletedUser = await User.findByIdAndDelete(id);

//     if (!deletedUser) {
//       return NextResponse.json({ error: 'Пользователь не найден' }, { status: 404 });
//     }

//     const redis = await getRedisClient();
//     await redis.del(USERS_CACHE_KEY);

//     return NextResponse.json({ message: 'Пользователь удалён' });
//   } catch (error) {
//     console.error('DELETE /api/users ошибка:', error);
//     return NextResponse.json({ error: 'Не удалось удалить пользователя' }, { status: 500 });
//   }
// };

// export { GET, POST, DELETE };

export { GET };
