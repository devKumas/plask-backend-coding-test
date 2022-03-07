import { BeforeInsert, Column, Entity, OneToMany } from 'typeorm';
import bcrypt from 'bcrypt';
import { Shop } from '../shop/shop.entity';
import { ApiProperty } from '@nestjs/swagger';
import { CoreEntityAndDelete } from 'src/core.entity';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
  Matches,
} from 'class-validator';

@Entity({ name: 'users' })
export class User extends CoreEntityAndDelete {
  @ApiProperty({
    example: 'user@domain.com',
    description: '이메일',
  })
  @Length(1, 30)
  @IsEmail()
  @Column('varchar', { name: 'email', unique: true, length: 30 })
  email: string;

  @ApiProperty({
    example: '$2b$12$hXpTBhOI.4nLGbJFvr1le.LFVBIyXUvm2g6.JLn.E.D/gUzNsLy4G',
    description: '암호화된 비밀번호',
  })
  @IsNotEmpty()
  @Column('varchar', { name: 'password', length: 100, select: false })
  password: string;

  @ApiProperty({
    example: '홍길동',
    description: '이름',
  })
  @Length(2, 10)
  @IsString()
  @Column('varchar', { name: 'name', length: 10 })
  name: string;

  @ApiProperty({
    example: '010-0000-0000',
    description: '전화번호',
  })
  @Matches(/^\d{3}-\d{3,4}-\d{4}$/, {
    message: "It doesn't fit the phone number format.",
  })
  @Column('varchar', { name: 'phone', length: 14 })
  phone: string;

  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjQ2NDI5NTc0LCJleHAiOjE2NDY1MTU5NzR9.y0laz-HyxDPkV8LXxeGitO6bddcBt_vhBA8RekEIozk',
    description: '재발급 토큰',
  })
  @IsNotEmpty()
  @Column('varchar', {
    name: 'refresh_token',
    length: 500,
    nullable: true,
    select: false,
  })
  refreshToken: string | null;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  @OneToMany(() => Shop, (shop) => shop.User)
  Shops: Shop[];
}
