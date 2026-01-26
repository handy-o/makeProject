import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

// 데이터 테스트

// 1. 유저생성
async function createUser() {
    const user  = await db.user.create({
        data: {
            username: "ghi",
            password: "1357"
        }
    })
}
// createUser();


// 2. 처음에 like와 tweet 같이 생성 (like에 tweetId가 필요해서 ㅠ)
async function createTweetLike() {
    try {
        const newTweet = await db.tweet.create({
            data: {
            token: `tweet-${Date.now()}`, 
            user: {
                connect: {
                id: 1,
                },
            },
            },
        });

        const likeToken = await db.like.create({
            data: {
              token: `like-${Date.now()}`, 
              user: {
                connect: {
                  id: 1, 
                },
              },
              tweet: {
                connect: {
                  id: newTweet.id, // 방금 생성한 Tweet의 ID 연결
                },
              },
            },
          });
    } catch (error) {
        console.error("Error creating Like:", error);
  }
}
// createTweetLike()


// 3.like만 추가해보기 (user 하나 더 생성 후)
async function doLike() {
    try {
      // Step 1: Tweet 생성
      const newTweet = await db.like.create({
        data: {
          token: "123124",
          user: {
            connect: {
              id: 2, 
            },
          },
          tweet: {
            connect: {
              id: 2  
            },
          },
        },
      });
      console.log("New Tweet created:", newTweet); 
    } catch (error) {
      console.error("Error creating Like:", error);
    }
  }
// doLike();


// 4. 찾아지는지 확인
async function findUserAndLikes() {
    // Step 1: 특정 User 찾기 (id가 1인 사용자)
    const user = await db.user.findUnique({
      where: {
        id: 1, 
      },
      include: {
        LikeToken: true,  // like만 포함해보기
      },
    });
  
    console.log("User with Likes:", user);
  }
//findUserAndLikes() ;


export default db;