export type Attachment = {
  content_type: string;
  filename: string;
  height: number;
  id: string;
  proxy_url: string;
  size: number;
  url: string;
  width: number;
};

export type Video = { height: number; url: string; width: number };

export type Author = {
  avatar: string;
  bot: boolean;
  discriminator: string;
  id: string;
  public_flags: number;
  username: string;
};

export type EmbedAuthor = { icon_url: string; name: string; proxy_icon_url: string; url: string };

export type EmbedField = {
  name: string;
  value: string;
  inline: boolean;
};

export type Embed = {
  author: EmbedAuthor;
  color: number;
  description?: string;
  footer?: { icon_url: string; proxy_icon_url: string; text: string } | undefined;
  provider?: { name: string; url: string } | undefined;
  reference_id: string;
  thumbnail?: { height: number; proxy_url: string; url: string; width: number } | undefined;
  timestamp: string;
  type: string;
  url: string;
  video: Video;
  title?: string;
  id?: string;
  fields?: EmbedField[] | undefined;
};

export type Mention = {
  avatar: string;
  discriminator: string;
  id: string;
  public_flags: number;
  username: string;
};

export type MessageReference = { channel_id: string; guild_id: string; message_id: string };

export type Reaction = {
  burst_count: number;
  burst_me: boolean;
  count: number;
  count_details: { burst: number; normal: number };
  emoji: { id: string; name: string };
  me: boolean;
  me_burst: boolean;
};

export type Post = {
  _id: string;
  attachments: Attachment[];
  author: Author;
  channel_id: string;
  content: string;
  edited_timestamp: string;
  embeds: Embed[];
  flags: number;
  id: string;
  mention_everyone: boolean;
  mentions: Mention[];
  message_reference: MessageReference;
  pinned: boolean;
  reactions: Reaction[] | undefined;
  referenced_message: Omit<Post, 'referenced_message'>;
  timestamp: Date | string;
  tts: boolean;
  type: number;
};
