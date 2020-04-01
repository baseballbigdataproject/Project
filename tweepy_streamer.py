import tweepy
import twittercredential
#from twittercredential import auth
from tweepy.streaming import StreamListener
from tweepy import OAuthHandler
from tweepy import Stream


class TwitterStreamer():
    # class for straming and processing live tweets
    def stream_tweets(self, fetched_tweets_filename, hash_tag_list):
        # this handles twitter authentication and connection to the twitter streaming api
        pass


class StdOutListener(StreamListener):
    def on_data(self, data):
        try:
            with open('python.json', 'a') as f:
                f.write(data)
                return True
        except BaseException as e:
            print("Error on_data: %s" % str(e))
        return True

    def on_error(self, status):
        print(status)
        return True


if __name__ == "__main__":
    print('hi')
    listener = StdOutListener()
    #auth = OAuthHandler(CONUMER_KEY, CONSUMER_SECRET)
    print('hello')
    auth = OAuthHandler(twittercredential.CONUMER_KEY,
                        twittercredential.CONSUMER_SECRET)
    # auth.set_access_token(ACCESS_TOKEN, #ACCESS_TOKEN_SECRET)
    print('whatsup')
    auth.set_access_token(twittercredential.ACCESS_TOKEN,
                          twittercredential.ACCESS_TOKEN_SECRET)

    print('boiyuh')
    twitter_stream = Stream(auth, StdOutListener())
    print('filter')
    twitter_stream.filter(
        track=['bernie sanders', 'Donald Trump', 'Joe Biden'])
    print('this is it')
