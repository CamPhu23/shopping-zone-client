import _ from 'lodash';
import React, { useState } from 'react';
import { ADMIN_AVT, CLIENT_AVT } from '../../constants/avatar-url';
import { dateFomatter } from '../../utils/date-formatter';

export default function Comments({ commentsList }) {
  let replies = commentsList?.filter(c => !_.isEmpty(c.replyTo));

  const renderComment = (comment) => {
    return (
      <div>
        <div className="mt-5 antialiased w-full">
          <div className="space-y-4">
            <div className="flex">
              <div className="flex-shrink-0 mr-3">
                <img className="mt-2 rounded-full w-8 h-8 sm:w-10 sm:h-10" src={_.isEmpty(comment.replyTo) ? CLIENT_AVT : ADMIN_AVT} alt="" />
              </div>
              <div className="flex-1 border rounded-lg px-4 py-2 sm:px-6 sm:py-4 leading-relaxed">
                <strong>{comment.name}</strong> <span className="text-xs text-gray-400">{dateFomatter(comment.updatedAt)}</span>
                <p className="text-sm md:text-base">{comment.content}</p>
              </div>
            </div>
          </div>
        </div>

        {replies.map(c => {
          return (
            <div key={c.id} className="ml-10">
              {c.replyTo === comment.id && renderComment(c)}
            </div>
          )
        })}
      </div>
    )
  }

  return (
    <div className='w-full max-w-5xl mx-auto lg:px-6 my-10'>
      {commentsList && commentsList.map(comment => {
        if (_.isEmpty(comment.replyTo)) {
          return (
            <div key={comment.id}>
              {(renderComment(comment))}
            </div>
          )
        }
      })}
    </div>
  )
}