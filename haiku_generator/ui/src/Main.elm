module Main exposing (main)

import Browser
import Browser.Navigation as Nav
import Html exposing (..)
import Html.Attributes exposing (alt, class, href, src, target)
import Html.Events exposing (onClick)
import Url exposing (Url)
import Html.Attributes exposing (placeholder)
import Html.Attributes as Attr 
import Html.Events exposing (onSubmit)
import Html.Events exposing (onInput)
import RemoteData exposing (WebData, RemoteData(..))
import Json.Decode as D exposing (Decoder) 
import Http 
import Html.Attributes exposing (wrap)

type alias Model =
    { haiku : WebData Haiku, topic: Maybe String, key : Nav.Key }

type alias Haiku = { topic: String, haiku: String} 

type Msg
    = WriteHaiku
    | HaikuResponse (WebData Haiku)
    | UpdateTopic String
    | ChangedUrl Url
    | ClickedLink Browser.UrlRequest

decodeHaiku : Decoder Haiku 
decodeHaiku = D.map2 Haiku (D.field "topic" D.string) (D.field "haiku" D.string)

get_haiku : Maybe String -> Cmd Msg 
get_haiku topic = 
    let 
        query_param = case topic of 
                        Just t -> "?topic="++t 
                        Nothing -> "" 
    in 
    Http.get 
        { url="http://localhost:8000/haiku" ++ query_param
        , expect = Http.expectJson (RemoteData.fromResult >> HaikuResponse) decodeHaiku
        }

floating_input : Maybe String -> Html Msg 
floating_input topic = div
        [ Attr.class "relative"
        ]
        [ input
            [ Attr.type_ "text"
            , Attr.id "floating_outlined"
            , Attr.class "border border-white block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            , Attr.placeholder " "
            , onInput UpdateTopic
            ]
            []
        , label
            [ Attr.for "floating_outlined"
            , Attr.class "absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
            ]
            [ text "Haiku Topic" ]
        ]
view : Model -> Browser.Document Msg
view model =
    { title = "Haiku Generator"
    , body =
        [ div 
            [ class "fixed inset-0 v-screen bg-gray-800 flex items-center justify-center"
            ]
            [ div 
                [ class "flex flex-col max-w-xl px-10 space-y-10" ] 
                [ form [onSubmit WriteHaiku] [floating_input model.topic]
                , case model.haiku of 
                        NotAsked -> div [] []
                        Loading -> div [] [text "loading..."]
                        Failure _ -> div [] [ text "failure fetching haiku."]
                        Success haiku -> 
                                div [class "text-gray-100"]
                                    [ div 
                                        [class "text-lg font-semibold tracking-widest"
                                        ] 
                                        [ span [] [text ""]
                                        , span [] [text haiku.topic
                                    ]]
                                    , div 
                                        [class "mt-5 text-xl font-normal space-y-1"]
                                        (List.map (\h -> p [] [text h]) (String.split "\n" haiku.haiku))
                                    ]

                ]
                
            ]
        ]
    }


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        HaikuResponse webdata -> 
            ({model | haiku = webdata}, Cmd.none)

        UpdateTopic topic -> 
            ({model | topic = Just topic}, Cmd.none)
        
        WriteHaiku -> 
          (model, get_haiku model.topic)

        ChangedUrl _ ->
            ( model, Cmd.none )

        ClickedLink urlRequest ->
            case urlRequest of
                Browser.External href ->
                    ( model, Nav.load href )

                Browser.Internal url ->
                    ( model, Nav.pushUrl model.key (Url.toString url) )


subscriptions : Model -> Sub Msg
subscriptions _ =
    Sub.none


init : flags -> Url -> Nav.Key -> ( Model, Cmd Msg )
init _ _ key =
    ( { haiku=RemoteData.NotAsked, topic = Nothing, key = key }, Cmd.none )


main : Program () Model Msg
main =
    Browser.application
        { init = init
        , view = view
        , update = update
        , subscriptions = subscriptions
        , onUrlChange = ChangedUrl
        , onUrlRequest = ClickedLink
        }
