#!/bin/bash
npm run build

cp -r "public" "dist"
# 服务器地址
SERVER="120.79.133.28"
# 服务器上的目标目录
TARGET_DIR="/data/vote_frontend_new"
# 本地 dist 目录的路径
LOCAL_DIST_DIR="dist"

echo "开始压缩本地 dist 目录..."
# 在本地压缩 dist 目录
tar -czvf dist.tar.gz -C $LOCAL_DIST_DIR .

echo "上传压缩文件到服务器..."
# 使用 scp 将压缩文件上传到服务器的目标目录
scp dist.tar.gz root@$SERVER:$TARGET_DIR

echo "在服务器上处理文件..."
# SSH 到服务器，执行删除旧目录、解压新压缩包等操作
ssh root@$SERVER "
echo '检查并删除旧的 _dist 目录...'
if [ -d $TARGET_DIR/_dist ]; then
    rm -rf $TARGET_DIR/_dist;
fi;
echo '如果存在，将当前 dist 目录重命名为 _dist...'
if [ -d $TARGET_DIR/dist ]; then
    mv $TARGET_DIR/dist $TARGET_DIR/_dist;
fi;
echo '解压新的 dist.tar.gz...'
mkdir -p $TARGET_DIR/dist
tar -xzvf $TARGET_DIR/dist.tar.gz -C $TARGET_DIR/dist
echo '删除上传的 dist.tar.gz...'
rm $TARGET_DIR/dist.tar.gz
echo '部署完成。'
"

echo "部署脚本执行完毕。"