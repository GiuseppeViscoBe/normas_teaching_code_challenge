import {
  prop,
  getModelForClass,
  modelOptions,
  index,
} from "@typegoose/typegoose";

@modelOptions({
  schemaOptions: {
    timestamps: true, 
    collection: "favourites", 
  },
})

class UrlList {
  @prop({ required: true })
  public raw!: string;

  @prop({ required: true })
  public full!: string;

  @prop({ required: true })
  public regular!: string;

  @prop({ required: true })
  public small!: string;

  @prop({ required: true })
  public thumb!: string;

  @prop({ required: true })
  public small_s3!: string;
}

@index({ imageId: 1, userId: 1 }, { unique: true })
export class Favourites {
  @prop({ required: true})
  public imageId!: string;

  @prop({ required: true })
  userId!: string;

  @prop({ required: true })
  public width!: number;

  @prop({ required: true })
  public height!: number;

  @prop({ required: true, _id: false, type: () => UrlList })
  public urls!: UrlList;

  @prop({ required: true })
  public description!: string;

  @prop()
  public createdAt?: Date;

  @prop()
  public updatedAt?: Date;
  
}

export const FavouritesModel = getModelForClass(
    Favourites
);
