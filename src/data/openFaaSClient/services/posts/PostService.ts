import { SocialError } from 'core/domain/common/socialError';
import { Post } from 'core/domain/posts/post';
import { PostType } from 'core/domain/posts/postType';
import { IPostService } from 'core/services/posts/IPostService';
import { IHttpService } from 'core/services/webAPI/IHttpService';
import { SocialProviderTypes } from 'core/socialProviderTypes';
import { inject, injectable } from 'inversify';
import { Map, fromJS } from 'immutable';

/**
 * Firbase post service
 */
@injectable()
export class PostService implements IPostService {
    @inject(SocialProviderTypes.Httpervice) private _httpService: IHttpService;
    constructor() {
        this.getSearchKey = this.getSearchKey.bind(this);
        this.searchPosts = this.searchPosts.bind(this);
        this.getAlbumPosts = this.getAlbumPosts.bind(this);
        this.getPostsByUserId = this.getPostsByUserId.bind(this);
    }

    /**
     * Add post on server
     */
    public addPost = async (post: Post) => {
        try {
            const result = await this._httpService.post('posts', { ...post, objectId: post.id });
            return result.objectId;
        } catch (error) {
            throw new SocialError(error.code, error.message);
        }
    };

    /**
     * Updare post
     */
    public updatePost = async (post: Post) => {
        try {
            if (!post.votes) {
                delete post.votes;
            }
            if (!post.comments) {
                delete post.comments;
            }
            await this._httpService.put('posts', post);
        } catch (error) {
            throw new SocialError(error.code, error.message);
        }
    };

    /**
     * Delete post
     */
    public deletePost = async (postId: string) => {
        try {
            await this._httpService.delete(`posts/${postId}`);
        } catch (error) {
            throw new SocialError(error.code, error.message);
        }
    };

    /**
     * Get list of post by user identifier
     */
    public async getPostsByUserId(userId: string, lastPostId?: string, page?: number, limit?: number) {
        try {
            const result = await this._httpService.get(`posts?owner=${userId}&page=${(page || 0) + 1}&limit=${limit}`);
            const postCount = result ? result.length : 0;
            let parsedData: Map<string, any> = Map({});
            let postIds: Map<string, boolean> = Map({});
            if (result) {
                result.forEach((post: any) => {
                    let score = 0;
                    if (post.votes) {
                        Object.keys(post.votes).forEach((key: any) => {
                            if (post.votes[key]) {
                                score++;
                            }
                        });
                    }
                    parsedData = parsedData.set(
                        post.objectId,
                        fromJS({ ...post, id: post.objectId, creationDate: post['created_date'], score }),
                    );
                    postIds = postIds.set(post.objectId, true);
                });
            }

            return {
                posts: parsedData,
                ids: postIds,
                newLastPostId: postCount > 0 ? result[0].objectId : '',
                hasMore: !(postCount < (limit || 10)),
            };
        } catch (error) {
            throw new SocialError(error.code, error.message);
        }
    }

    /**
     * Get list of album post
     */
    public async getAlbumPosts(userId: string, lastPostId?: string, page?: number, limit?: number) {
        try {
            const resultSearch = await this._httpService.get(
                `posts?type=${PostType.Album}&page=${(page || 0) + 1}&limit=${limit}`,
            );

            const postCount = resultSearch ? resultSearch.length : 0;
            let parsedData: Map<string, any> = Map({});
            let postIds: Map<string, boolean> = Map({});
            if (resultSearch) {
                resultSearch.forEach((post: any) => {
                    let score = 0;
                    if (post.votes) {
                        Object.keys(post.votes).forEach((key: any) => {
                            if (post.votes[key]) {
                                score++;
                            }
                        });
                    }
                    parsedData = parsedData.set(
                        post.objectId,
                        fromJS({ ...post, id: post.objectId, creationDate: post['created_date'], score }),
                    );
                    postIds = postIds.set(post.objectId, true);
                });
            }

            return {
                posts: parsedData,
                ids: postIds,
                newLastPostId: postCount > 0 ? resultSearch[0].objectId : '',
                hasMore: !(postCount < (limit || 10)),
            };
        } catch (error) {
            throw new SocialError(error.code, error.message);
        }
    }

    /**
     * Search in posts
     */
    public async searchPosts(query: string, filters: string, lastPostId?: string, page?: number, limit?: number) {
        try {
            const resultSearch = await this._httpService.get(
                `posts?search=${query}&page=${(page || 0) + 1}&limit=${limit}&owner=${filters}`,
            );

            const postCount = resultSearch ? resultSearch.length : 0;
            let parsedData: Map<string, any> = Map({});
            let postIds: Map<string, boolean> = Map({});
            if (resultSearch) {
                resultSearch.forEach((post: any) => {
                    let score = 0;
                    if (post.votes) {
                        Object.keys(post.votes).forEach((key: any) => {
                            if (post.votes[key]) {
                                score++;
                            }
                        });
                    }
                    parsedData = parsedData.set(
                        post.objectId,
                        fromJS({ ...post, id: post.objectId, creationDate: post['created_date'], score }),
                    );
                    postIds = postIds.set(post.objectId, true);
                });
            }

            return {
                posts: parsedData,
                ids: postIds,
                newLastPostId: postCount > 0 ? resultSearch[0].objectId : '',
                hasMore: !(postCount < (limit || 10)),
            };
        } catch (error) {
            throw new SocialError(error.code, error.message);
        }
    }

    /**
     * Get search key
     */
    public async getSearchKey() {
        return '';
    }

    /**
     * Get post by the post identifier
     */
    public getPostById = async (postId: string) => {
        try {
            const result = await this._httpService.get(`posts/${postId}`);
            return { ...result, id: result.objectId, creationDate: result['created_date'] };
        } catch (error) {
            throw new SocialError(error.code, error.message);
        }
    };

    /**
     * Get post by the post URL key
     */
    public getPostByURLKey = async (urlKey: string) => {
        try {
            const result = await this._httpService.get(`posts/urlkey/${urlKey}`);
            return { ...result, id: result.objectId, creationDate: result['created_date'] };
        } catch (error) {
            throw new SocialError(error.code, error.message);
        }
    };

    /**
     * Disable comment
     */
    public disableComment = async (postId: string, status: boolean) => {
        try {
            await this._httpService.put(`posts/comment/disable`, { postId, status });
        } catch (error) {
            throw new SocialError(error.code, error.message);
        }
    };

    /**
     * Disable sharing
     */
    public disableSharing = async (postId: string, status: boolean) => {
        try {
            await this._httpService.put(`posts/share/disable`, { postId, status });
        } catch (error) {
            throw new SocialError(error.code, error.message);
        }
    };
}
